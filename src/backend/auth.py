import json
import sqlite3
from functools import wraps

from flask import request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash


DB_PATH = "lifemap.db"


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
            password_hint TEXT NOT NULL DEFAULT '',
            data_json TEXT NOT NULL DEFAULT '{}',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Add password_hint to an existing database
    columns = [
        row["name"]
        for row in db.execute("PRAGMA table_info(users)").fetchall()
    ]

    if "password_hint" not in columns:
        db.execute(
            "ALTER TABLE users ADD COLUMN password_hint TEXT NOT NULL DEFAULT ''"
        )

    db.commit()
    db.close()


def register_auth_routes(app):
    init_auth_db()

    @app.post("/api/auth/signup")
    def signup():
        data = request.get_json(silent=True) or {}

        name = str(data.get("name", "")).strip()
        email = str(data.get("email", "")).strip().lower()
        password = str(data.get("password", ""))
        password_hint = str(data.get("passwordHint", "")).strip()

        if not name:
            return jsonify({
                "error": "Name is required."
            }), 400

        if not email:
            return jsonify({
                "error": "Email is required."
            }), 400

        if len(password) < 6:
            return jsonify({
                "error": "Password must be at least 6 characters."
            }), 400

        if not password_hint:
            return jsonify({
                "error": "Password hint is required."
            }), 400

        if len(password_hint) > 120:
            return jsonify({
                "error": "Password hint must be 120 characters or less."
            }), 400

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
            INSERT INTO users
            (name, email, password_hash, password_hint)
            VALUES (?, ?, ?, ?)
            """,
            (
                name,
                email,
                generate_password_hash(password),
                password_hint
            )
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
            }
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
            SELECT
                id,
                name,
                email,
                password_hash,
                password_hint
            FROM users
            WHERE email = ?
            """,
            (email,)
        ).fetchone()

        db.close()

        if not user:
            return jsonify({
                "error": "Invalid email or password."
            }), 401

        if not check_password_hash(
            user["password_hash"],
            password
        ):
            return jsonify({
                "error": "Incorrect password.",
                "showHint": True,
                "passwordHint": (
                    user["password_hint"]
                    or "No password hint was set for this account."
                )
            }), 401

        session["user_id"] = user["id"]

        return jsonify({
            "message": "Login successful.",
            "user": {
                "id": user["id"],
                "name": user["name"],
                "email": user["email"]
            }
        })

    @app.get("/api/auth/me")
    def current_user():
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({
                "user": None
            })

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

            return jsonify({
                "user": None
            })

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
            )
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