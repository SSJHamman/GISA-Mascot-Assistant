const backendURL = "https://https://honkers-backend.vercel.app/chat";

async function sendMessage(message) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are Honkers McFeathers, a silly but helpful AI assistant for 7th graders. Help with schoolwork in a fun but clear way." },
        { role: "user", content: message }
      ],
      max_tokens: 200
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chat-box");
  const input = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");

  function addMessage(sender, text) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerText = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  sendBtn.addEventListener("click", async () => {
    const userMessage = input.value.trim();
    if (!userMessage) return;

    addMessage("user", "You: " + userMessage);
    input.value = "";

    addMessage("honkers", "Honkers is thinking...");

    const reply = await sendMessage(userMessage);
    chatBox.lastChild.innerText = "Honkers: " + reply;
  });

  input.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") sendBtn.click();
  });
});
