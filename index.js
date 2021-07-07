const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 700;

ctx.strokeStyle = "#000000"; 
ctx.fillStyle = "#000000";

let painting = false;

function start() {
    painting = true;
}

function stop() {
    painting = false;
}

function onMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.moveTo(x, y);
    }
    else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

canvas.addEventListener("mousemove" , onMove); 
canvas.addEventListener("mousedown" , start); 
canvas.addEventListener("mouseup" , stop); 
canvas.addEventListener("mouseleave" , stop);
