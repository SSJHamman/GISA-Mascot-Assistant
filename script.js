const mascot=document.getElementById("mascot");
const mascotBubble=document.getElementById("mascot-bubble");
const mascotMessage=document.getElementById("mascot-message");

// Tasks
const tasksContainer=document.getElementById("tasks-container");
const newTaskInput=document.getElementById("new-task-input");
const progressBar=document.getElementById("progress-bar");
let tasks=[];

mascot.addEventListener("click",()=>{
    mascotBubble.innerText="Hello STEM Explorer! 🌟";
    mascotBubble.style.display="block";
    mascot.style.transform="scale(1.2)";
    setTimeout(()=>{
        mascotBubble.style.display="none";
        mascot.style.transform="scale(1)";
    },3000);
});

// Tasks functions
function addTask(){
    const text=newTaskInput.value.trim();
    if(!text) return;
    tasks.push({text,done:false});
    renderTasks();
    newTaskInput.value="";
    mascotBubble.innerText="Task Added! ✅";
    mascotBubble.style.display="block";
    setTimeout(()=>{mascotBubble.style.display="none"},2000);
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

// STEM tips
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
    mascotBubble.innerText="Here's a STEM Tip!";
    mascotBubble.style.display="block";
    setTimeout(()=>{mascotBubble.style.display="none"},2000);
}

// Mascot messages
const messages=[
"Keep up the great work!","You are a STEM superstar!","Remember to take breaks!","Learning is fun!"
];
function mascotMessageRandom(){
    mascotMessage.innerText=messages[Math.floor(Math.random()*messages.length)];
}

// Calculator
function calculate(){
    const input=document.getElementById("calc-input").value;
    const output=document.getElementById("calc-output");
    try{output.innerText="Result: "+eval(input);}
    catch{output.innerText="Invalid Expression";}
}
