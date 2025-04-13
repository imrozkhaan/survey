from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# Replace with your OpenRouter API key from https://openrouter.ai/keys
OPENROUTER_API_KEY = "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"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/ask", methods=["POST"])
def ask():
    topic = request.json["message"]

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "mistralai/mistral-7b-instruct",  # Free model
                "messages": [
                    {"role": "system", "content": "You are a helpful assistant that generates survey questions based on the topic."},
                    {"role": "user", "content": f"Suggest survey questions based on this topic: {topic}"}
                ]
            }
        )

        data = response.json()
        reply = data["choices"][0]["message"]["content"]
        return jsonify({"reply": reply})

    except Exception as e:
        print("Error:", e)
        return jsonify({"reply": "⚠️ Error: Could not get a response from AI."})

if __name__ == "__main__":
    app.run(debug=True)
