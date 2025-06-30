class VoiceChatBot {
  constructor() {
    this.recordBtn = document.getElementById("record-btn");
    this.chatContainer = document.getElementById("chat-container");
    this.loadingIndicator = document.getElementById("loading");
    this.mediaRecorder = null;
    this.audioChunks = [];

    this.recordBtn.addEventListener("click", () => this.toggleRecording());
  }

  toggleRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
      this.mediaRecorder.stop();
      this.recordBtn.innerHTML = `🎤 Start Recording`;
    } else {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.audioChunks = [];

        this.mediaRecorder.ondataavailable = e => {
          this.audioChunks.push(e.data);
        };

        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
          this.processAudio(audioBlob);
        };

        this.mediaRecorder.start();
        this.recordBtn.innerHTML = `🛑 Stop Recording`;
      });
    }
  }

  async processAudio(blob) {
    this.loadingIndicator.style.display = "block";

    const arrayBuffer = await blob.arrayBuffer();
    const base64Audio = btoa(
      new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), "")
    );

    const sttResponse = await fetch("/speech-to-text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ audio: base64Audio })
    });

    const sttData = await sttResponse.json();

    const chatResponse = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: sttData.text })
    });

    const chatData = await chatResponse.json();

    this.addMessagePair(sttData.text, chatData.response);

    const ttsResponse = await fetch("/text-to-speech", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: chatData.response })
    });

    const ttsData = await ttsResponse.json();
    const audio = new Audio("data:audio/mp3;base64," + ttsData.audio);
    audio.play();

    this.loadingIndicator.style.display = "none";
  }

  addMessagePair(userMessage, aiMessage) {
    const pair = document.createElement("div");
    pair.className = "message-pair";

    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userDiv = document.createElement("div");
    userDiv.className = "message-user";
    userDiv.innerHTML = `<strong>👤 You</strong><br>${userMessage}<div class="message-timestamp">${timeStr}</div>`;

    const aiDiv = document.createElement("div");
    aiDiv.className = "message-ai";
    aiDiv.innerHTML = `<strong>🤖 AI</strong><br>${aiMessage}<div class="message-timestamp">${timeStr}</div>`;

    pair.appendChild(userDiv);
    pair.appendChild(aiDiv);

    this.chatContainer.appendChild(pair);
    this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new VoiceChatBot();
});
