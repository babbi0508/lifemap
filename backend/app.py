from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
import urllib.request
import urllib.error
import time

from auth import register_auth_routes

app = Flask(__name__)
app.secret_key = os.environ.get(
    "LIFEMAP_SECRET_KEY",
    "lifemap-development-secret-change-this"
)

CORS(app, supports_credentials=True)

BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models"
MODELS = ["gemini-3.6-flash", "gemini-3.5-flash-lite"]

ROADMAP_SCHEMA = {
    "type": "object",
    "properties": {
        "title": {"type": "string"},
        "name": {"type": "string"},
        "icon": {"type": "string"},
        "color": {"type": "string"},
        "stages": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "title": {"type": "string"},
                    "lessons": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "title": {"type": "string"},
                                "description": {"type": "string"},
                                "practice": {
                                    "type": "array",
                                    "items": {"type": "string"}
                                }
                            },
                            "required": ["title", "description", "practice"]
                        }
                    }
                },
                "required": ["title", "lessons"]
            }
        }
    },
    "required": ["title", "name", "icon", "color", "stages"]
}

VIDEO_SCHEMA = {
    "type": "object",
    "properties": {
        "videoUrl": {"type": "string"},
        "videoTitle": {"type": "string"},
        "channel": {"type": "string"}
    },
    "required": ["videoUrl", "videoTitle", "channel"]
}

VIDEO_PROMPT = """
You are LifeMap's learning-video finder.
Use Google Search to find ONE relevant YouTube tutorial for the exact lesson below.
Rules:
- Search specifically for the lesson topic and the user's goal.
- Prefer a clear educational tutorial from a reputable/educational creator.
- Return exactly ONE direct YouTube watch URL.
- The URL MUST be a direct video URL such as https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID.
- NEVER return a YouTube search-results URL, playlist URL, channel URL, Shorts URL, or article URL.
- If you cannot verify a direct YouTube video URL, return an empty videoUrl.
- Return only JSON matching the schema.
"""

QUIZ_SCHEMA = {
    "type": "object",
    "properties": {
        "quiz": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "question": {"type": "string"},
                    "options": {
                        "type": "array",
                        "items": {"type": "string"}
                    },
                    "answer": {"type": "integer"}
                },
                "required": ["question", "options", "answer"]
            }
        }
    },
    "required": ["quiz"]
}

FINAL_ASSESSMENT_SCHEMA = {
    "type": "object",
    "properties": {
        "questions": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {"type": "string"},
                    "question": {"type": "string"},
                    "options": {
                        "type": "array",
                        "items": {"type": "string"}
                    },
                    "answer": {"type": "integer"},
                    "sourceLesson": {"type": "string"}
                },
                "required": [
                    "id",
                    "question",
                    "options",
                    "answer",
                    "sourceLesson"
                ]
            }
        },
        "passingPercent": {"type": "integer"}
    },
    "required": ["questions", "passingPercent"]
}

FINAL_PROJECT_SCHEMA = {
    "type": "object",
    "properties": {
        "title": {"type": "string"},
        "objective": {"type": "string"},
        "requirements": {
            "type": "array",
            "items": {"type": "string"}
        },
        "deliverables": {
            "type": "array",
            "items": {"type": "string"}
        },
        "evaluation": {"type": "string"}
    },
    "required": [
        "title",
        "objective",
        "requirements",
        "deliverables",
        "evaluation"
    ]
}

ROADMAP_PROMPT = """
You are the curriculum architect for LifeMap.
Create a genuinely goal-specific roadmap for the exact user goal.

Rules:
- The goal can be ANY real learning/career goal. Understand its actual domain.
- Do not force software/AI patterns onto non-technical goals.
- Progress from beginner to advanced/professional ability.
- Create EXACTLY 6 stages.
- Each stage has EXACTLY 3 lessons.
- Each lesson has EXACTLY 3 concrete practice tasks.
- Lesson titles and descriptions must be specific to the goal.
- Include real prerequisites, skills, workflows, projects and professional preparation when relevant.
- Do not invent certifications, licenses, salaries, legal requirements or guaranteed outcomes.
- Keep descriptions and practice tasks concise so the response is fast.
- Return only JSON matching the schema.
"""

QUIZ_PROMPT = """
You create quizzes for LifeMap.
Create EXACTLY 5 questions for the supplied lesson.

Rules:
- Questions must test the exact lesson topic, not generic learning advice.
- Mix conceptual, scenario, application and reasoning questions when appropriate.
- Each question has EXACTLY 4 distinct options.
- There is EXACTLY 1 correct option.
- answer is the zero-based option index: 0, 1, 2 or 3.
- Avoid trivial questions and avoid repeating the lesson title as the answer.
- Return only JSON matching the schema.
"""

FINAL_ASSESSMENT_PROMPT = """
You are LifeMap's final-course assessor.
Create a comprehensive final assessment for the exact learning roadmap supplied by the user.

Rules:
- Create EXACTLY 15 questions covering the roadmap across multiple stages and lessons.
- Questions must test actual knowledge and application from the roadmap, not generic study advice.
- Mix conceptual, scenario, application and reasoning questions appropriate to the domain.
- Each question has EXACTLY 4 distinct options and EXACTLY 1 correct answer.
- answer is the zero-based option index: 0, 1, 2 or 3.
- sourceLesson must name the lesson that the question primarily tests.
- Do not invent legal requirements, certifications, salaries or guaranteed outcomes.
- Set passingPercent to 70.
- Return only JSON matching the schema.
"""

FINAL_PROJECT_PROMPT = """
You are LifeMap's capstone project designer.
Create ONE practical final project for the user's exact goal and roadmap.

Rules:
- The project must genuinely use skills from multiple roadmap stages.
- Make it realistic for a learner who completed the roadmap.
- Provide 4 to 6 concrete requirements.
- Provide 3 to 5 deliverables.
- Give a concise evaluation description.
- Do not invent certifications, legal requirements, salaries or guaranteed career outcomes.
- Return only JSON matching the schema.
"""

def get_api_key():
    return os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")


def extract_text(data):
    candidates = data.get("candidates", [])
    if not candidates:
        raise RuntimeError("Gemini returned no candidates.")

    parts = candidates[0].get("content", {}).get("parts", [])
    text = "".join(part.get("text", "") for part in parts).strip()

    if not text:
        raise RuntimeError("Gemini returned an empty response.")

    if text.startswith("```"):
        lines = text.splitlines()
        if lines and lines[0].startswith("```"):
            lines = lines[1:]
        if lines and lines[-1].strip() == "```":
            lines = lines[:-1]
        text = "\n".join(lines).strip()

    return text


def call_gemini(model, prompt, schema, api_key, max_tokens):
    url = f"{BASE_URL}/{model}:generateContent"

    payload = {
        "systemInstruction": {
            "parts": [{"text": prompt}]
        },
        "contents": [{
            "role": "user",
            "parts": [{"text": prompt}]
        }],
        "generationConfig": {
            "responseMimeType": "application/json",
            "responseSchema": schema,
            "maxOutputTokens": max_tokens,
            "temperature": 0.4
        }
    }

    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "x-goog-api-key": api_key
        },
        method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=60) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        body = error.read().decode("utf-8", errors="replace")
        try:
            parsed = json.loads(body)
            message = parsed.get("error", {}).get("message", body)
        except Exception:
            message = body
        raise RuntimeError(f"HTTP {error.code}: {message}")
    except urllib.error.URLError as error:
        raise RuntimeError(
            f"Network error while contacting Gemini: {error.reason}"
        )


def call_gemini_with_google_search(
    model, prompt, schema, api_key, max_tokens
):
    url = f"{BASE_URL}/{model}:generateContent"

    payload = {
        "contents": [{
            "role": "user",
            "parts": [{"text": prompt}]
        }],
        "tools": [{"google_search": {}}],
        "generationConfig": {
            "responseMimeType": "application/json",
            "responseSchema": schema,
            "maxOutputTokens": max_tokens,
            "temperature": 0.2
        }
    }

    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "x-goog-api-key": api_key
        },
        method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=45) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        body = error.read().decode("utf-8", errors="replace")
        try:
            parsed = json.loads(body)
            message = parsed.get("error", {}).get("message", body)
        except Exception:
            message = body
        raise RuntimeError(f"HTTP {error.code}: {message}")
    except urllib.error.URLError as error:
        raise RuntimeError(
            f"Network error while finding a video: {error.reason}"
        )


def generate_video(goal, lesson_title, lesson_description):
    api_key = get_api_key()

    if not api_key:
        raise RuntimeError(
            "GEMINI_API_KEY is not configured. Restart the terminal after setting it."
        )

    prompt = (
        VIDEO_PROMPT
        + f"\n\nUSER GOAL: {goal}"
        + f"\nLESSON: {lesson_title}"
        + f"\nLESSON DESCRIPTION: {lesson_description}"
    )

    errors = []

    for model in MODELS:
        try:
            data = call_gemini_with_google_search(
                model,
                prompt,
                VIDEO_SCHEMA,
                api_key,
                1200
            )

            result = json.loads(extract_text(data))
            url = str(result.get("videoUrl", "")).strip()

            if url.startswith("https://youtu.be/"):
                video_id = (
                    url.split("https://youtu.be/", 1)[1]
                    .split("?", 1)[0]
                    .split("&", 1)[0]
                )

                if len(video_id) == 11:
                    url = f"https://www.youtube.com/watch?v={video_id}"

            if not (
                url.startswith("https://www.youtube.com/watch?v=")
                and len(
                    url.split("v=", 1)[1].split("&", 1)[0]
                ) == 11
            ):
                raise RuntimeError(
                    "Gemini did not return a verified direct YouTube watch URL."
                )

            return {
                "videoUrl": url,
                "videoTitle": (
                    str(result.get("videoTitle", "Related tutorial")).strip()
                    or "Related tutorial"
                ),
                "channel": (
                    str(result.get("channel", "YouTube")).strip()
                    or "YouTube"
                )
            }

        except Exception as error:
            errors.append(f"{model}: {error}")
            time.sleep(0.5)

    raise RuntimeError(
        "Could not find a verified direct YouTube tutorial. "
        + " | ".join(errors)
    )


def generate_with_fallback(prompt, schema, max_tokens):
    api_key = get_api_key()

    if not api_key:
        raise RuntimeError(
            "GEMINI_API_KEY is not configured. Restart the terminal after setting it."
        )

    errors = []

    for model in MODELS:
        try:
            data = call_gemini(
                model,
                prompt,
                schema,
                api_key,
                max_tokens
            )
            return json.loads(extract_text(data))
        except Exception as error:
            errors.append(f"{model}: {error}")
            time.sleep(0.5)

    raise RuntimeError(
        "Gemini is temporarily unavailable. "
        + " | ".join(errors)
    )


def generate_roadmap(goal):
    prompt = ROADMAP_PROMPT + f"\n\nUSER GOAL:\n{goal}"
    return generate_with_fallback(
        prompt,
        ROADMAP_SCHEMA,
        12000
    )


def generate_quiz(goal, lesson_title, lesson_description):
    prompt = (
        QUIZ_PROMPT
        + f"\n\nUSER GOAL: {goal}"
        + f"\nLESSON: {lesson_title}"
        + f"\nLESSON DESCRIPTION: {lesson_description}"
    )

    data = generate_with_fallback(
        prompt,
        QUIZ_SCHEMA,
        4500
    )

    quiz = data.get("quiz", [])

    if len(quiz) != 5:
        raise RuntimeError(
            "Gemini returned an incomplete quiz. Please open the lesson again."
        )

    return {"quiz": quiz}


def generate_final_assessment(goal, roadmap):
    prompt = (
        FINAL_ASSESSMENT_PROMPT
        + f"\n\nUSER GOAL: {goal}"
        + f"\nROADMAP JSON:\n{json.dumps(roadmap, ensure_ascii=False)}"
    )

    data = generate_with_fallback(
        prompt,
        FINAL_ASSESSMENT_SCHEMA,
        9000
    )

    questions = data.get("questions", [])

    if len(questions) != 15:
        raise RuntimeError(
            "Gemini returned an incomplete final assessment."
        )

    for question in questions:
        if len(question.get("options", [])) != 4:
            raise RuntimeError(
                "A final assessment question did not contain exactly 4 options."
            )

        if question.get("answer") not in [0, 1, 2, 3]:
            raise RuntimeError(
                "A final assessment answer index was invalid."
            )

    return {
        "questions": questions,
        "passingPercent": 70
    }


def generate_final_project(goal, roadmap):
    prompt = (
        FINAL_PROJECT_PROMPT
        + f"\n\nUSER GOAL: {goal}"
        + f"\nROADMAP JSON:\n{json.dumps(roadmap, ensure_ascii=False)}"
    )

    data = generate_with_fallback(
        prompt,
        FINAL_PROJECT_SCHEMA,
        5000
    )

    if (
        not data.get("title")
        or len(data.get("requirements", [])) < 3
        or len(data.get("deliverables", [])) < 2
    ):
        raise RuntimeError(
            "Gemini returned an incomplete final project brief."
        )

    return data


@app.get("/")
def home():
    return jsonify({
        "message": "LifeMap Smart Backend is working!"
    })


@app.post("/api/generate-roadmap")
def api_generate_roadmap():
    try:
        data = request.get_json(silent=True) or {}
        goal = str(data.get("goal", "")).strip()

        if not goal:
            return jsonify({
                "error": "Please enter a goal."
            }), 400

        if len(goal) > 120:
            return jsonify({
                "error": "Goal is too long. Keep it within 120 characters."
            }), 400

        return jsonify(generate_roadmap(goal))

    except Exception as error:
        return jsonify({
            "error": str(error)
        }), 503


@app.post("/api/find-video")
def api_find_video():
    try:
        data = request.get_json(silent=True) or {}

        goal = str(data.get("goal", "")).strip()
        lesson_title = str(
            data.get("lessonTitle", "")
        ).strip()
        lesson_description = str(
            data.get("lessonDescription", "")
        ).strip()

        if not goal or not lesson_title:
            return jsonify({
                "error": "Goal and lesson title are required."
            }), 400

        return jsonify(
            generate_video(
                goal,
                lesson_title,
                lesson_description
            )
        )

    except Exception as error:
        return jsonify({
            "error": str(error)
        }), 503


@app.post("/api/generate-quiz")
def api_generate_quiz():
    try:
        data = request.get_json(silent=True) or {}

        goal = str(data.get("goal", "")).strip()
        lesson_title = str(
            data.get("lessonTitle", "")
        ).strip()
        lesson_description = str(
            data.get("lessonDescription", "")
        ).strip()

        if not goal or not lesson_title:
            return jsonify({
                "error": "Goal and lesson title are required."
            }), 400

        return jsonify(
            generate_quiz(
                goal,
                lesson_title,
                lesson_description
            )
        )

    except Exception as error:
        return jsonify({
            "error": str(error)
        }), 503


@app.post("/api/generate-final-assessment")
def api_generate_final_assessment():
    try:
        data = request.get_json(silent=True) or {}

        goal = str(data.get("goal", "")).strip()
        roadmap = data.get("roadmap") or {}

        if not goal or not roadmap:
            return jsonify({
                "error": "Goal and roadmap are required."
            }), 400

        return jsonify(
            generate_final_assessment(
                goal,
                roadmap
            )
        )

    except Exception as error:
        return jsonify({
            "error": str(error)
        }), 503


@app.post("/api/generate-final-project")
def api_generate_final_project():
    try:
        data = request.get_json(silent=True) or {}

        goal = str(data.get("goal", "")).strip()
        roadmap = data.get("roadmap") or {}

        if not goal or not roadmap:
            return jsonify({
                "error": "Goal and roadmap are required."
            }), 400

        return jsonify(
            generate_final_project(
                goal,
                roadmap
            )
        )

    except Exception as error:
        return jsonify({
            "error": str(error)
        }), 503


# Register Login, Signup, Change Password, Logout,
# Profile and user-data routes.
register_auth_routes(app)


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )
