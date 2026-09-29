import json
import os
import secrets
import smtplib
import sqlite3
from email.message import EmailMessage
from functools import wraps
from datetime import datetime, timedelta, timezone

from flask import request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash

DB_PATH = "lifemap.db"
RESET_CODE_MINUTES = 10


def get_db():
    db = sqlite3.connect(DB_PATH)
    db.row_factory = sqlite3.Row
    return db


def init_auth_db():
    db = get_db()

    db.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            data_json TEXT NOT NULL DEFAULT '{}',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    db.execute("""
        CREATE TABLE IF NOT EXISTS password_reset_codes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            code_hash TEXT NOT NULL,
            expires_at TEXT NOT NULL,
            used INTEGER NOT NULL DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    db.commit()
    db.close()


def send_reset_email(email, code):
    smtp_host = os.environ.get("LIFEMAP_SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.environ.get("LIFEMAP_SMTP_PORT", "587"))
    smtp_username = os.environ.get("LIFEMAP_SMTP_USERNAME", "")
    smtp_password = os.environ.get("LIFEMAP_SMTP_PASSWORD", "")
    smtp_from = os.environ.get("LIFEMAP_SMTP_FROM", smtp_username)

    if not smtp_username or not smtp_password:
        raise RuntimeError(
            "Email service is not configured. Set LIFEMAP_SMTP_USERNAME and LIFEMAP_SMTP_PASSWORD."
        )

    message = EmailMessage()
    message["Subject"] = "LifeMap Password Reset Code"
    message["From"] = smtp_from
    message["To"] = email
    message.set_content(
        f"""Hello,

Your LifeMap password reset code is:

{code}

This code expires in {RESET_CODE_MINUTES} minutes.

If you did not request a password reset, you can ignore this email.

LifeMap
"""
    )

    with smtplib.SMTP(smtp_host, smtp_port, timeout=20) as server:
        server.starttls()
        server.login(smtp_username, smtp_password)
        server.send_message(message)


def register_auth_routes(app):
    init_auth_db()

    @app.post("/api/auth/signup")
    def signup():
        data = request.get_json(silent=True) or {}
        name = str(data.get("name", "")).strip()
        email = str(data.get("email", "")).strip().lower()
        password = str(data.get("password", ""))

        if not name:
            return jsonify({"error": "Name is required."}), 400

        if not email:
            return jsonify({"error": "Email is required."}), 400

        if len(password) < 6:
            return jsonify({"error": "Password must be at least 6 characters."}), 400

        db = get_db()
        existing = db.execute(
            "SELECT id FROM users WHERE email = ?",
            (email,)
        ).fetchone()

        if existing:
            db.close()
            return jsonify({
                "error": "An account with this email already exists."
            }), 409

        cursor = db.execute(
            """
            INSERT INTO users (name, email, password_hash)
            VALUES (?, ?, ?)
            """,
            (
                name,
                email,
                generate_password_hash(password)
            ),
        )

        user_id = cursor.lastrowid
        db.commit()
        db.close()

        session["user_id"] = user_id

        return jsonify({
            "message": "Account created successfully.",
            "user": {
                "id": user_id,
                "name": name,
                "email": email
            },
        }), 201

    @app.post("/api/auth/login")
    def login():
        data = request.get_json(silent=True) or {}
        email = str(data.get("email", "")).strip().lower()
        password = str(data.get("password", ""))

        if not email or not password:
            return jsonify({
                "error": "Email and password are required."
            }), 400

        db = get_db()

        user = db.execute(
            """
            SELECT id, name, email, password_hash
            FROM users
            WHERE email = ?
            """,
            (email,),
        ).fetchone()

        db.close()

        if not user or not check_password_hash(
            user["password_hash"],
            password
        ):
            return jsonify({
                "error": "Invalid email or password."
            }), 401

        session["user_id"] = user["id"]

        return jsonify({
            "message": "Login successful.",
            "user": {
                "id": user["id"],
                "name": user["name"],
                "email": user["email"]
            },
        })

    @app.post("/api/auth/request-password-reset")
    def request_password_reset():
        data = request.get_json(silent=True) or {}
        email = str(data.get("email", "")).strip().lower()

        if not email:
            return jsonify({
                "error": "Enter your account email."
            }), 400

        db = get_db()

        user = db.execute(
            "SELECT id FROM users WHERE email = ?",
            (email,)
        ).fetchone()

        if not user:
            db.close()

            # Do not reveal whether an email is registered.
            return jsonify({
                "message": "If an account exists for that email, a reset code has been sent."
            })

        code = f"{secrets.randbelow(1000000):06d}"
        code_hash = generate_password_hash(code)

        expires_at = (
            datetime.now(timezone.utc)
            + timedelta(minutes=RESET_CODE_MINUTES)
        ).isoformat()

        db.execute(
            """
            UPDATE password_reset_codes
            SET used = 1
            WHERE email = ? AND used = 0
            """,
            (email,)
        )

        db.execute(
            """
            INSERT INTO password_reset_codes
            (email, code_hash, expires_at)
            VALUES (?, ?, ?)
            """,
            (
                email,
                code_hash,
                expires_at
            ),
        )

        db.commit()
        db.close()

        try:
            send_reset_email(email, code)
        except Exception as error:
            db = get_db()
            db.execute(
                """
                UPDATE password_reset_codes
                SET used = 1
                WHERE email = ? AND code_hash = ?
                """,
                (email, code_hash)
            )
            db.commit()
            db.close()

            return jsonify({
                "error": f"Could not send the reset email: {error}"
            }), 503

        return jsonify({
            "message": "A 6-digit verification code has been sent to your email."
        })

    @app.post("/api/auth/reset-password")
    def reset_password():
        data = request.get_json(silent=True) or {}

        email = str(data.get("email", "")).strip().lower()
        code = str(data.get("code", "")).strip()
        new_password = str(data.get("newPassword", ""))

        if not email or not code or not new_password:
            return jsonify({
                "error": "Email, code and new password are required."
            }), 400

        if not code.isdigit() or len(code) != 6:
            return jsonify({
                "error": "Enter the 6-digit verification code."
            }), 400

        if len(new_password) < 6:
            return jsonify({
                "error": "New password must be at least 6 characters."
            }), 400

        db = get_db()

        reset_row = db.execute(
            """
            SELECT id, code_hash, expires_at
            FROM password_reset_codes
            WHERE email = ? AND used = 0
            ORDER BY id DESC
            LIMIT 1
            """,
            (email,)
        ).fetchone()

        if not reset_row:
            db.close()
            return jsonify({
                "error": "Reset code is invalid or expired."
            }), 400

        try:
            expires = datetime.fromisoformat(
                reset_row["expires_at"]
            )

            if expires.tzinfo is None:
                expires = expires.replace(tzinfo=timezone.utc)

        except Exception:
            db.close()
            return jsonify({
                "error": "Reset code is invalid or expired."
            }), 400

        if datetime.now(timezone.utc) > expires:
            db.execute(
                """
                UPDATE password_reset_codes
                SET used = 1
                WHERE id = ?
                """,
                (reset_row["id"],)
            )
            db.commit()
            db.close()

            return jsonify({
                "error": "Reset code has expired. Request a new code."
            }), 400

        if not check_password_hash(
            reset_row["code_hash"],
            code
        ):
            db.close()
            return jsonify({
                "error": "Incorrect verification code."
            }), 400

        user = db.execute(
            "SELECT id FROM users WHERE email = ?",
            (email,)
        ).fetchone()

        if not user:
            db.close()
            return jsonify({
                "error": "Account not found."
            }), 404

        db.execute(
            """
            UPDATE users
            SET password_hash = ?
            WHERE id = ?
            """,
            (
                generate_password_hash(new_password),
                user["id"]
            ),
        )

        db.execute(
            """
            UPDATE password_reset_codes
            SET used = 1
            WHERE id = ?
            """,
            (reset_row["id"],)
        )

        db.commit()
        db.close()

        return jsonify({
            "message": "Password reset successfully."
        })

    @app.get("/api/auth/me")
    def current_user():
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({"user": None})

        db = get_db()

        user = db.execute(
            """
            SELECT id, name, email
            FROM users
            WHERE id = ?
            """,
            (user_id,)
        ).fetchone()

        db.close()

        if not user:
            session.clear()
            return jsonify({"user": None})

        return jsonify({
            "user": {
                "id": user["id"],
                "name": user["name"],
                "email": user["email"]
            }
        })

    @app.post("/api/auth/logout")
    def logout():
        session.clear()
        return jsonify({
            "message": "Logged out successfully."
        })

    @app.get("/api/user/data")
    def get_user_data():
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({
                "error": "Not logged in."
            }), 401

        db = get_db()

        user = db.execute(
            """
            SELECT data_json
            FROM users
            WHERE id = ?
            """,
            (user_id,)
        ).fetchone()

        db.close()

        if not user:
            return jsonify({
                "error": "User not found."
            }), 404

        try:
            data = json.loads(user["data_json"])
        except Exception:
            data = {}

        return jsonify({
            "data": data
        })

    @app.put("/api/user/data")
    def save_user_data():
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({
                "error": "Not logged in."
            }), 401

        data = request.get_json(silent=True) or {}

        db = get_db()

        db.execute(
            """
            UPDATE users
            SET data_json = ?
            WHERE id = ?
            """,
            (
                json.dumps(
                    data,
                    ensure_ascii=False
                ),
                user_id
            ),
        )

        db.commit()
        db.close()

        return jsonify({
            "message": "User data saved successfully."
        })


def require_login(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        if not session.get("user_id"):
            return jsonify({
                "error": "Login required."
            }), 401

        return function(*args, **kwargs)

    return wrapper
