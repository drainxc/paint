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
const gradation = document.getElementById('gradation');
const color = document.getElementById('jsColor');
const square = document.getElementById('square');
const save = document.getElementById('save');
const notImg = document.getElementById('notImg');

elementToChange.style.cursor = "url('./asset/paint-brush.png'), auto"; // 커서 지정
opacityNumber.innerHTML = 1000;
size.innerHTML = `${document.getElementById('brushControl').value}`;
canvas.width = 900;
canvas.height = 700; // 캔버스 크기 지정

let painting = false;
let num = 0;
let nowColor = "black" // 처음 색 지정
let firstColor = nowColor;
let secondColor = nowColor;
let shapes = false;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 900, 700); // 캔버스 색 채우기
ctx.strokeStyle = nowColor;
ctx.lineWidth = 1; // 선 굵기
ctx.font = "50px Comic Sans MS";
ctx.strokeText("Canvas", 350, 100); // canvas 쓰기

function start() {
    painting = true;
}

function stop() {
    painting = false;
}

function onMove(event) {
    const x = event.offsetX;
    const y = event.offsetY; // 좌표 지정
    if (!shapes) {
        if (!painting || num >= 1) {
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
        else {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    } // 브러쉬 그리기
    else {
        if (!painting || num >= 1) {
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
        else {
            ctx.strokeRect(x, y, 100, 100)
        }
    } // 사각형 그리기
}

function range() {
    ctx.lineWidth = document.getElementById('brushControl').value / 4;
    size.innerHTML = `${document.getElementById('brushControl').value}`; // 굵기 띄우기
} // 굵기 조정

function eraserTool() {
    shapes = false;
    ctx.strokeStyle = "white";
    elementToChange.style.cursor = "url('./asset/eraser.png'), auto";
} // 지우개

function brushTool() {
    shapes = false;
    ctx.strokeStyle = nowColor;
    elementToChange.style.cursor = "url('./asset/paint-brush.png'), auto";
} // 브러쉬

function fillTool() {
    ctx.fillStyle = nowColor;
    ctx.fillRect(0, 0, 900, 700);
} // 채우기

function resetTool() {
    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(0, 0, 900, 700);
    ctx.globalAlpha = document.getElementById('opacity').value / 100;
    ctx.lineWidth = 1;
    ctx.strokeText("Canvas", 350, 100);
    ctx.lineWidth = document.getElementById('brushControl').value / 4;
    ctx.strokeStyle = nowColor;
} // 리셋

function opacityControl() {
    ctx.globalAlpha = document.getElementById('opacity').value / 100;
    opacityNumber.innerHTML = `${document.getElementById('opacity').value / 100 * 1000}`; // 불투명도 띄우기
} // 불투명도

function gradationTool() {
    alert('두 개의 색깔을 정해주세요.');
    num = 1;
    elementToChange.style.cursor = "url('./asset/gradation.png'), auto";
} // 그라데이션

function squareTool() {
    ctx.strokeStyle = nowColor;
    shapes = true;
    elementToChange.style.cursor = "url('./asset/square.png'), auto";
} // 사각형

function gradationColor() {
    if (num == 1) {
        firstColor = nowColor
        num++;
    }
    else if (num == 2) {
        secondColor = nowColor
        let gra = ctx.createLinearGradient(0, 0, 900, 700);
        gra.addColorStop(0.2, firstColor);
        gra.addColorStop(1, secondColor);
        ctx.fillStyle = gra;
        ctx.fillRect(0, 0, 900, 700);
        num = 0;
        elementToChange.style.cursor = "url('./asset/paint-brush.png'), auto";
    }
} // 그라데이션 컬러 두개 정하기

function saveTool() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintEastcopper";
    link.click();
} // 그림 저장

for (let i = 0; i < color.children.length; i++) {
    color.children[i].addEventListener('click', function () {
        ctx.strokeStyle = color.children[i].style.backgroundColor;
        nowColor = color.children[i].style.backgroundColor;
        gradationColor();
    })
} // 색깔 지정

let fileInput = document.getElementById("fileInput");
const upload = document.getElementById('upload');
upload.addEventListener('click', function () {
    fileInput.click();
}) // 파일 열기


fileInput.addEventListener('change', function (e) {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
        notImg.remove();
        let photoFrame = document.createElement("div");
        photoFrame.style = `background : url(${reader.result}) no-repeat; background-size : contain;`;
        photoFrame.className = "photoFrame";
        document.getElementById("pictures").appendChild(photoFrame);
        e.target.value = "";

        photoFrame.addEventListener("click", function () {
            document.getElementById("pictures").removeChild(photoFrame);
        })
    }
}) // 사진 띄우기

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
square.addEventListener('click', squareTool);
save.addEventListener('click', saveTool);