const messagesEl = document.getElementById("messages");
const inputEl = document.getElementById("userInput");

async function sendMessage() {
  const text = inputEl.value.trim();
  if (!text) return;

  addMessage(text, "user");
  inputEl.value = "";

  const thinkingMsg = addMessage("...", "bot");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();
    thinkingMsg.textContent = data.reply || "Sorry, I didn’t get that.";
  } catch (err) {
    thinkingMsg.textContent = "Error talking to AI.";
    console.error(err);
  }
}

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = "message " + sender;
  msg.textContent = text;
  messagesEl.appendChild(msg);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return msg;
}
