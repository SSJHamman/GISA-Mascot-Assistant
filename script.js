// Tasks
const tasksContainer=document.getElementById("tasks-container");
const newTaskInput=document.getElementById("new-task-input");
const progressBar=document.getElementById("progress-bar");
const mascotMessage=document.getElementById("mascot-message");
let tasks=[];

function addTask(){
    const text=newTaskInput.value.trim();
    if(!text) return;
    tasks.push({text,done:false});
    renderTasks();
    newTaskInput.value="";
    mascotMessage.innerText="Task Added! ✅";
}
function toggleTask(index){
    tasks[index].done=!tasks[index].done;
    renderTasks();
}
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

// STEM tips
const tips=[
"Water has a high heat capacity",
"Use loops to simplify code",
"Acceleration = ΔVelocity / ΔTime",
"Break coding problems into smaller steps",
"Fibonacci sequence appears everywhere"
];
function showRandomTip(){
    const tip=tips[Math.floor(Math.random()*tips.length)];
    stemTip.innerText=tip;
    mascotMessage.innerText="Here's a STEM Tip!";
}

// Mascot surprise
const mascotMessages=[
"Keep up the great work!","You are a STEM superstar!","Remember to take breaks!","Learning is fun!"
];
function mascotMessageRandom(){
    mascotMessage.innerText=mascotMessages[Math.floor(Math.random()*mascotMessages.length)];
}

// Mini calculator
function calculate(){
    const input=document.getElementById("calc-input").value;
    const output=document.getElementById("calc-output");
    try{output.innerText="Result: "+eval(input);}
    catch{output.innerText="Invalid Expression";}
}
