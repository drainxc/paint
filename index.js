const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const brushControl = document.getElementById('brushControl');
const size = document.getElementById('size');
const brush = document.getElementById('brush');
const eraser = document.getElementById('eraser');
const fill = document.getElementById('fill');

size.innerHTML = `${document.getElementById('brushControl').value}`;
canvas.width = 600;
canvas.height = 700;
ctx.strokeStyle = "black";
ctx.fillStyle = "white";
ctx.fillRect(0,0,600,700);
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
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function range() {
    const brushSize = document.getElementById('brushControl').value / 4;
    ctx.lineWidth = brushSize;
    size.innerHTML = `${brushSize * 4}`;
}

function eraserTool() {
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
}

canvas.addEventListener("mousemove" , onMove); 
canvas.addEventListener("mousedown" , start); 
canvas.addEventListener("mouseup" , stop); 
canvas.addEventListener("mouseleave" , stop);
brushControl.addEventListener("input", range);
eraser.addEventListener('click', eraserTool);