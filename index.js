
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
const white = document.getElementById('white');
const purple = document.getElementById('purple');
const black = document.getElementById('black');
const gradation = document.getElementById('gradation');
const color = document.getElementById('jsColor');

elementToChange.style.cursor = "url('./asset/paint-brush.png'), auto";

opacityNumber.innerHTML = 1000;
size.innerHTML = `${document.getElementById('brushControl').value}`;
canvas.width = 600;
canvas.height = 700;
nowColor = "black"
ctx.strokeStyle = nowColor;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 600, 700);
let painting = false;
ctx.lineWidth = 10;
let num = 0;
let firstColor = nowColor;
let secondColor = nowColor;

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
    opacityNumber.innerHTML = `${opacityFigures * 1000}`;
}



function gradationTool() {
    alert('두 개의 색깔을 정해주세요.');
    num = 1;
    elementToChange.style.cursor = "url('./asset/gradation.png'), auto";
}

function gradationColor() {
    if (num == 1) {
        firstColor = nowColor
        num++;
    }
    else if (num == 2) {
        secondColor = nowColor
        let gra = ctx.createLinearGradient(0, 0, 600, 700);
        gra.addColorStop(0.2, firstColor);
        gra.addColorStop(1, secondColor);
        ctx.fillStyle = gra;
        ctx.fillRect(0, 0, 600, 700);
        num = 0;
        elementToChange.style.cursor = "url('./asset/paint-brush.png'), auto";
    }
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
gradation.addEventListener('click', gradationTool);
for (let i = 0; i < color.children.length; i++) {
    color.children[i].addEventListener('click', function () {
        ctx.strokeStyle = color.children[i].style.backgroundColor;
        nowColor = color.children[i].style.backgroundColor;
        gradationColor();
    })
}