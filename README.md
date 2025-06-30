# 🎙️ AI Voice Chatbot

A real-time voice chatbot application built with **Flask**, **Whisper**, and **Groq API**.
Speak to your computer and get AI-powered responses read back to you instantly.

# Purpose :

Project submission for "GenAI Hackathon by Impetus & AWS" hackathon.

https://impetusawsgenaihackathon.devpost.com/?_gl=1*4oonh8*_gcl_au*ODU0MDczODQ0LjE3NDU1ODE5Nzc.*_ga*MzYxNTM4NTg3LjE3NDU1ODE5ODA.*_ga_0YHJK3Y10M*czE3NTEyODMxODQkbzI4JGcwJHQxNzUxMjgzMTg0JGo2MCRsMCRoMA..

Problem Statemet #1 : "Develop an AI-Driven Live Call Insights solution that enables real-time suggestions during live calls by converting speech to text and extracting actionable insights from pre-trained data. The system must support proper data ingestion and preprocessing workflows to handle audio streams effectively. It should deliver real-time processing with low latency to ensure prompt responses and maintain strong contextual understanding of ongoing conversations. An interactive chatbot interface is required to present insights clearly to users. Additionally, the solution must incorporate responsible AI practices, including appropriate guardrails and role-based access control (RBAC), to ensure secure, compliant, and trustworthy operation."

## ✨ Features
✅ **Voice Input & Output**:
Record your question and hear the AI’s spoken reply.

✅ **Accurate Transcription** : 
Speech recognition powered by OpenAI Whisper.

✅ **Conversational AI** : 
Groq API delivers fast, context-aware responses.

✅ **Modern UI** :
Clean Bootstrap design with chat bubbles showing each Q\&A turn in one box.

✅ **Fully Local Speech-to-Text** :
No need for Google Cloud if you prefer Whisper.


## 🖼️ Demo Screenshot

(will paste)

## 🚀 Quick Start

### 1️. Clone the repository

```bash
git clone https://github.com/Kshitijasharma/Genai-Voice-chatbot.git
cd ai-voice-chatbot
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Install FFmpeg

Whisper requires FFmpeg.
Download here: [FFmpeg Downloads](https://ffmpeg.org/download.html)
Make sure `ffmpeg` is in your system PATH.


## ▶️ Running the App

```bash
python app.py
```

Visit [http://127.0.0.1:5000](http://127.0.0.1:5000).

## ⚡ System Overview

### 🧩 Audio Processing Pipeline

1. **Record:** Microphone input via `MediaRecorder` API.
2. **Transcribe:** Whisper converts speech to text.
3. **Respond:** Groq API generates an AI reply.
4. **Synthesize:** `pyttsx3` creates an audio response.
5. **Playback:** The reply is read back in the browser.
6. **Display:** Each conversation pair is shown in a single message box.

## 📦 Main Dependencies

* **Flask** – Web framework
* **Whisper** – Speech recognition
* **Groq** – AI chat completions
* **pyttsx3** – Text-to-speech
* **Bootstrap 5** – Responsive UI
* **MediaRecorder API** – Voice recording

## 🤝 Contributing

Pull requests are welcome!
Please open an issue first to discuss your ideas.
