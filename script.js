// Mascot
const mascot=document.getElementById("mascot");
const mascotBubble=document.getElementById("mascot-bubble");

mascot.addEventListener("click",()=>{
    showMascotMessage("Hello STEM Explorer! 🌟");
    mascot.style.transform="scale(1.2)";
    setTimeout(()=>{mascot.style.transform="scale(1)";},300);
});

function showMascotMessage(text){
    mascotBubble.innerText=text;
    mascotBubble.style.display="block";
    setTimeout(()=>{mascotBubble.style.display="none";},2500);
}

// Tasks
const tasksContainer=document.getElementById("tasks-container");
const newTaskInput=document.getElementById("new-task-input");
const progressBar=document.getElementById("progress-bar");
let tasks=[];

function addTask(){
    const text=newTaskInput.value.trim();
    if(!text) return;
    tasks.push({text,done:false});
    renderTasks();
    newTaskInput.value="";
    showMascotMessage("Task Added! ✅");
}
function toggleTask(index){ tasks[index].done=!tasks[index].done; renderTasks(); }
function renderTasks(){
    tasksContainer.innerHTML="";
    tasks.forEach((task,i)=>{
        const div=document.createElement("div");
        div.className="task"+(task.done?" done":"");
        div.innerText=task.text;
        div.onclick=()=>toggleTask(i);
        tasksContainer.appendChild(div);
    });
    updateProgress();
}
function updateProgress(){
    const completed=tasks.filter(t=>t.done).length;
    const percent=tasks.length?Math.round((completed/tasks.length)*100):0;
    progressBar.style.width=percent+"%";
}

// STEM Tips
const tips=[
"Water has a high heat capacity",
"Use loops to simplify code",
"Acceleration = ΔVelocity / ΔTime",
"Break coding problems into smaller steps",
"Fibonacci sequence appears everywhere"
];
const stemTip=document.getElementById("stem-tip");
function showRandomTip(){
    const tip=tips[Math.floor(Math.random()*tips.length)];
    stemTip.innerText=tip;
    showMascotMessage("Here's a STEM Tip!");
}

// Calculator
function calculate(){
    const input=document.getElementById("calc-input").value;
    const output=document.getElementById("calc-output");
    try{output.innerText="Result: "+eval(input);}
    catch{output.innerText="Invalid Expression";}
}
