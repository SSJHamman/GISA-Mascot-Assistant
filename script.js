const mascot=document.getElementById("mascot");
const mascotBubble=document.getElementById("mascot-bubble");
const tasksContainer=document.getElementById("tasks-container");
const newTaskInput=document.getElementById("new-task-input");
const stemTipDiv=document.getElementById("stem-tip");
const calcInput=document.getElementById("calc-input");
const calcOutput=document.getElementById("calc-output");

let tasks=[];

// Mascot hover
mascot.addEventListener("click",()=>{
    mascotBubble.style.display="block";
    setTimeout(()=>{mascotBubble.style.display="none";},3000);
    mascot.style.transform="scale(1.2)";
    setTimeout(()=>{mascot.style.transform="scale(1)";},300);
});

// Tasks
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
function toggleTask(index){
    tasks[index].done=!tasks[index].done;
    renderTasks();
}
function renderTasks(){
    tasksContainer.innerHTML="";
    tasks.forEach((task,i)=>{
        const div=document.createElement("div");
        div.className="task"+(task.done?" done":"");
        div.innerHTML=`<span>${task.text}</span>`;
        div.onclick=()=>toggleTask(i);
        tasksContainer.appendChild(div);
    });
}

// STEM Tips
const tips=[
"Water has a high heat capacity",
"Use loops to simplify code",
"Acceleration = ΔVelocity / ΔTime",
"Break coding problems into smaller steps",
"Fibonacci sequence appears everywhere"
];
function showRandomTip(){
    const tip=tips[Math.floor(Math.random()*tips.length)];
    stemTipDiv.innerText=tip;
    mascotBubble.innerText="Here's a STEM Tip!";
    mascotBubble.style.display="block";
    setTimeout(()=>{mascotBubble.style.display="none"},2000);
}

// Mini Calculator
function calculate(){
    try{
        calcOutput.innerText="Result: "+eval(calcInput.value);
    }catch{calcOutput.innerText="Invalid Expression";}
}
