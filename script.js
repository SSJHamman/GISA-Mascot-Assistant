// Tasks
const tasksContainer = document.getElementById("tasks-container");
const newTaskInput = document.getElementById("new-task-input");
const mascotMessage = document.getElementById("mascot-message");

function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText === "") return;

    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.innerHTML = `
        <span>${taskText}</span>
        <button onclick="completeTask(this)">✅</button>
    `;
    tasksContainer.appendChild(taskDiv);
    newTaskInput.value = "";

    mascotMessage.innerText = "Nice! Task added! 🎉";
}

function completeTask(button) {
    const taskDiv = button.parentElement;
    taskDiv.classList.toggle("done");
    mascotMessage.innerText = taskDiv.classList.contains("done")
        ? "Great job completing a task! 🚀"
        : "Task marked as incomplete.";
}

// STEM Tips
const tips = [
    "💧 Water has a high heat capacity!",
    "🔁 Use loops to simplify your code.",
    "⚡ Acceleration = Change in Velocity / Time",
    "💻 Break coding problems into smaller steps.",
    "📐 The Fibonacci sequence appears everywhere in nature!"
];

const stemTipDiv = document.getElementById("stem-tip");

function showRandomTip() {
    const tip = tips[Math.floor(Math.random() * tips.length)];
    stemTipDiv.innerText = tip;
    mascotMessage.innerText = "Here's a STEM tip for you! 💡";
}

// Initialize first tip
showRandomTip();
