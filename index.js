const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const brushControl = document.getElementById('brushControl');

canvas.width = 600;
canvas.height = 700;

ctx.strokeStyle = "#000000"; 
ctx.fillStyle = "#000000";
let painting = false;
ctx.lineWidth = 10;

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

function range() {
    let brushSize = document.getElementById('brushControl').value;
    ctx.lineWidth = brushSize;
}

canvas.addEventListener("mousemove" , onMove); 
canvas.addEventListener("mousedown" , start); 
canvas.addEventListener("mouseup" , stop); 
canvas.addEventListener("mouseleave" , stop);
brushControl.addEventListener("input", range);