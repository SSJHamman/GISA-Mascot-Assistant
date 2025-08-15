const mascot = document.getElementById("mascot");
const mascotBubble = document.getElementById("mascot-bubble");
const dashboard = document.getElementById("dashboard");

// Initial mascot position (center)
let mascotX = window.innerWidth/2 - 90; // offset by half width
let mascotY = window.innerHeight/2 - 90;
mascot.style.left = mascotX + "px";
mascot.style.top = mascotY + "px";

// Click on mascot idle bounce
mascot.addEventListener("click", () => showMascotMessage("I'm ready to move!"));

// Function to show bubble messages
function showMascotMessage(text){
    mascotBubble.innerText = text;
    mascotBubble.style.display = "block";
    setTimeout(()=>{ mascotBubble.style.display = "none"; },2500);
}

// Move mascot toward panel
function mascotMoveTo(panelId){
    const panel = document.getElementById(panelId);
    const panelRect = panel.getBoundingClientRect();
    const dashboardRect = dashboard.getBoundingClientRect();

    const targetX = panelRect.left + panelRect.width/2 - 90; // mascot width offset
    const targetY = panelRect.top + panelRect.height/2 - 90;

    showMascotMessage(`Heading to ${panel.querySelector('h2').innerText}!`);

    // Animate movement
    const interval = setInterval(()=>{
        let dx = targetX - mascotX;
        let dy = targetY - mascotY;
        if(Math.abs(dx) < 1 && Math.abs(dy) < 1){
            clearInterval(interval);
            mascotX = targetX; mascotY = targetY;
            mascot.style.left = mascotX + "px";
            mascot.style.top = mascotY + "px";
            mascot.style.transform = "scale(1.1)";
            setTimeout(()=>{ mascot.style.transform="scale(1)"; },300);
        } else {
            mascotX += dx*0.1;
            mascotY += dy*0.1;
            mascot.style.left = mascotX + "px";
            mascot.style.top = mascotY + "px";
        }
    },20);
}

// Idle gentle bounce
let bounceDirection = 1;
setInterval(()=>{
    mascot.style.transform = `translateY(${bounceDirection}px)`; 
    bounceDirection *= -1;
},500);
