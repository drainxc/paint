const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const brushControl = document.getElementById('brushControl');
const size = document.getElementById('size');
const opacity = document.getElementById('opacity');
const opacityNumber = document.getElementById('opacityNumber');
const brush = document.getElementById('brush');
const eraser = document.getElementById('eraser');
const fill = document.getElementById('fill');
const reset = document.getElementById('reset');
const elementToChange = document.getElementsByTagName("body")[0];
elementToChange.style.cursor = "url('./asset/paint-brush.png'), auto";

opacityNumber.innerHTML = `${document.getElementById('opacity').value}`;
size.innerHTML = `${document.getElementById('brushControl').value}`;
canvas.width = 600;
canvas.height = 700;
ctx.strokeStyle = "black";
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 600, 700);
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
    elementToChange.style.cursor = "url('./asset/eraser.png'), auto";
}

function brushTool() {
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    elementToChange.style.cursor = "url('./asset/paint-brush.png'), auto";
}

function fillTool() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 600, 700);
}

function resetTool() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 600, 700);
}

function opacityControl() {
    const opacityFigures = document.getElementById('opacity').value / 100;
    ctx.globalAlpha = opacityFigures;
    opacityNumber.innerHTML = `${opacityFigures * 100}`;
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", start);
canvas.addEventListener("mouseup", stop);
canvas.addEventListener("mouseleave", stop);
brushControl.addEventListener("input", range);
opacity.addEventListener('input', opacityControl);
eraser.addEventListener('click', eraserTool);
brush.addEventListener('click', brushTool);
fill.addEventListener('click', fillTool);
reset.addEventListener('click', resetTool);