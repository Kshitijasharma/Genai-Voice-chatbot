from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from werkzeug.middleware.proxy_fix import ProxyFix
import base64
import io
import threading
import pyttsx3
import whisper

from groq import Groq

app = Flask(__name__)
CORS(app)
app.wsgi_app = ProxyFix(app.wsgi_app)

# Load Whisper model (can be "tiny", "base", "small", "medium", "large")
whisper_model = whisper.load_model("base")

# Initialize Groq client
groq_client = Groq(api_key="ADD_YOUR_KEY")

# Initialize pyttsx3
engine = pyttsx3.init()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/speech-to-text", methods=["POST"])
def speech_to_text():
    data = request.json
    audio_data = base64.b64decode(data["audio"])

    # Save audio to a temporary WAV file
    temp_filename = "temp_audio.wav"
    with open(temp_filename, "wb") as f:
        f.write(audio_data)

    # Transcribe with Whisper
    result = whisper_model.transcribe(temp_filename)
    transcript = result["text"]

    return jsonify({"text": transcript.strip()})

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json["text"]
    completion = groq_client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {"role": "system", "content": "You are a helpful AI assistant."},
            {"role": "user", "content": user_input},
        ]
    )
    ai_response = completion.choices[0].message.content
    return jsonify({"response": ai_response.strip()})

@app.route("/text-to-speech", methods=["POST"])
def text_to_speech():
    text = request.json["text"]
    audio_io = io.BytesIO()

    def synthesize():
        engine.save_to_file(text, "output.mp3")
        engine.runAndWait()

    tts_thread = threading.Thread(target=synthesize)
    tts_thread.start()
    tts_thread.join()

    with open("output.mp3", "rb") as f:
        audio_base64 = base64.b64encode(f.read()).decode("utf-8")

    return jsonify({"audio": audio_base64})

if __name__ == "__main__":
    app.run(debug=True)
