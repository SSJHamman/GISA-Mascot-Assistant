const mascot = document.getElementById("mascot");
const mascotBubble = document.getElementById("mascot-bubble");

// Click interaction
mascot.addEventListener("click", () => {
    showMascotMessage("Hi there! Let's explore STEM!");
    mascot.style.transform = "scale(1.2)";
    setTimeout(() => { mascot.style.transform = "scale(1)"; }, 300);
});

// Function to show messages
function showMascotMessage(text){
    mascotBubble.innerText = text;
    mascotBubble.style.display = "block";
    setTimeout(() => { mascotBubble.style.display = "none"; }, 2500);
}

// Optional idle animation (small bounce)
let bounceDirection = 1;
setInterval(() => {
    const currentY = parseFloat(getComputedStyle(mascot).transform.split(',')[5]) || 0;
    mascot.style.transform = `translateY(${currentY + bounceDirection}px)`;
    if(currentY > 5 || currentY < -5) bounceDirection *= -1;
}, 100);
