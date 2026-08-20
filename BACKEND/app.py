from flask import Flask, request, jsonify
from flask_cors import CORS

from requirement_parser import parse_requirements
from optimizer import recommend_devices


app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return jsonify({
        "message": "Configwise backend is running"
    })


@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No input provided"
        }), 400

    user_query = data.get("requirements")

    if not user_query:
        return jsonify({
            "error": "Requirements are required"
        }), 400

    try:
        # Convert natural language into structured requirements
        requirements = parse_requirements(user_query)

        # Find the best matching phones
        recommendations = recommend_devices(requirements)

        return jsonify({
            "requirements": requirements,
            "recommendations": recommendations
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True, port=8001)