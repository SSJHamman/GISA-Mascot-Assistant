// Tasks
const tasksContainer = document.getElementById("tasks-container");
const newTaskInput = document.getElementById("new-task-input");
const mascotMessage = document.getElementById("mascot-message");
const progressBar = document.getElementById("progress-bar");

let tasks = [];

function addTask(){
    const taskText = newTaskInput.value.trim();
    if(!taskText) return;
    tasks.push({text:taskText, done:false});
    renderTasks();
    newTaskInput.value = "";
    mascotMessage.innerText="Task added successfully!";
}

function completeTask(index){
    tasks[index].done = !tasks[index].done;
    renderTasks();
    mascotMessage.innerText = tasks[index].done ? "Task completed! Great job!" : "Task marked incomplete.";
}

function renderTasks(){
    tasksContainer.innerHTML = "";
    tasks.forEach((task,i)=>{
        const div = document.createElement("div");
        div.className="task"+(task.done?" done":"");
        div.innerHTML=`<span>${task.text}</span><button onclick="completeTask(${i})">✔</button>`;
        tasksContainer.appendChild(div);
    });
    updateProgress();
}

function updateProgress(){
    const completed = tasks.filter(t=>t.done).length;
    const percent = tasks.length?Math.round((completed/tasks.length)*100):0;
    progressBar.style.width = percent+"%";
}

// STEM Tips
const tips=["Water has a high heat capacity.","Use loops to simplify code.","Acceleration = ΔVelocity / ΔTime","Break coding problems into steps","Fibonacci appears everywhere!"];
const stemTipDiv=document.getElementById("stem-tip");
function showRandomTip(){
    stemTipDiv.innerText = tips[Math.floor(Math.random()*tips.length)];
    mascotMessage.innerText = "Here's a STEM tip!";
}

// Mascot surprise messages
const mascotMessages=["Keep up the great work!","You are a STEM superstar!","Remember to take breaks!","Learning is fun!"];
function mascotMessageRandom(){
    mascotMessage.innerText = mascotMessages[Math.floor(Math.random()*mascotMessages.length)];
}

// Mini calculator
function calculate(){
    const input=document.getElementById("calc-input").value;
    let output=document.getElementById("calc-output");
    try{output.innerText="Result: "+eval(input);}catch{output.innerText="Invalid expression";}
}
