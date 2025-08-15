const mascot = document.getElementById("mascot");
const mascotBubble = document.getElementById("mascot-bubble");
const dashboard = document.getElementById("dashboard");

// Initial mascot position (center of dashboard)
let mascotX = dashboard.clientWidth/2 - 90; // offset by half mascot width
let mascotY = dashboard.clientHeight/2 - 90;
mascot.style.left = mascotX + "px";
mascot.style.top = mascotY + "px";

// Click on mascot idle bounce
mascot.addEventListener("click", () => showMascotMessage("I'm ready to move!"));

// Show bubble message
function showMascotMessage(text){
    mascotBubble.innerText = text;
    mascotBubble.style.display = "block";
    setTimeout(()=>{ mascotBubble.style.display = "none"; },2500);
}

// Move mascot toward panel
function mascotMoveTo(panelId){
    const panel = document.getElementById(panelId);

    // Get panel position relative to dashboard
    const panelRect = panel.getBoundingClientRect();
    const dashboardRect = dashboard.getBoundingClientRect();
    const targetX = panelRect.left - dashboardRect.left + panelRect.width/2 - 90;
    const targetY = panelRect.top - dashboardRect.top + panelRect.height/2 - 90;

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
    const currentTransform = mascot.style.transform.match(/scale\(([^)]+)\)/);
    let scale = currentTransform ? parseFloat(currentTransform[1]) : 1;
    mascot.style.transform = `translateY(${bounceDirection}px) scale(${scale})`;
    bounceDirection *= -1;
},500);
