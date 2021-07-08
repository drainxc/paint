  
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
const red = document.getElementById('red');
const orange = document.getElementById('orange');
const yellow = document.getElementById('yellow');
const green = document.getElementById('green');
const blue = document.getElementById('blue');
const indigo = document.getElementById('indigo');
const purple = document.getElementById('purple');
const black = document.getElementById('black');

elementToChange.style.cursor = "url('./asset/paint-brush.png'), auto";

opacityNumber.innerHTML = `${document.getElementById('opacity').value}`;
size.innerHTML = `${document.getElementById('brushControl').value}`;
canvas.width = 600;
canvas.height = 700;
nowColor = "black"
ctx.strokeStyle = nowColor;
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
    elementToChange.style.cursor = "url('./asset/eraser.png'), auto";
}

function brushTool() {
    ctx.strokeStyle = nowColor;
    elementToChange.style.cursor = "url('./asset/paint-brush.png'), auto";
}

function fillTool() {
    ctx.fillStyle = nowColor;
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

function redColor() {
    ctx.strokeStyle = "red";
    nowColor = "red";
}

function orangeColor() {
    ctx.strokeStyle = "orange";
    nowColor = "orange";
}

function yellowColor() {
    ctx.strokeStyle = "yellow";
    nowColor = "yellow";
}

function greenColor() {
    ctx.strokeStyle = "green";
    nowColor = "green";
}

function blueColor() {
    ctx.strokeStyle = "blue";
    nowColor = "blue";
}

function indigoColor() {
    ctx.strokeStyle = "indigo";
    nowColor = "indigo";
}

function purpleColor() {
    ctx.strokeStyle = "purple";
    nowColor = "purple";
}

function blackColor() {
    ctx.strokeStyle = "black";
    nowColor = "black";
}

// var gra = ctx.createLinearGradient(0,0,600,700); 
//             gra.addColorStop(0.5, 'black');
//             gra.addColorStop(1, 'blue');
//             ctx.fillStyle = gra;
//             ctx.fillRect(0,0,600,700);

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
red.addEventListener('click', redColor);
orange.addEventListener('click', orangeColor);
yellow.addEventListener('click', yellowColor);
green.addEventListener('click', greenColor);
blue.addEventListener('click', blueColor);
indigo.addEventListener('click', indigoColor);
purple.addEventListener('click', purpleColor);
black.addEventListener('click', blackColor);