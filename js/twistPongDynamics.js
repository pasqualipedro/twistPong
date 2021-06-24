/* --TWIST PONG CODE--
--Writen by Pedro Pasquali--1#Project IronHack WDPT50-SP-- */
// document.getElementById(`canvas`).width.innnerText = 1500;
// document.getElementById(`canvas`).height.innerText = 750;
const canvas = document.getElementById(`canvas`);
const canvasWidth = document.getElementById(`canvas`).width;
const canvasHeight = document.getElementById(`canvas`).height;
const ctx = canvas.getContext(`2d`);
console.log(canvasWidth)
console.log(canvasHeight)
ctx.strokeStyle = `white`;
const playerWidth = 50;
const playerHeight = 15;
const playerOffset = 15;
const ballSize = 15;


// HERE, drawing static battlefield
ctx.beginPath();
ctx.arc((canvasWidth/2), (canvasHeight/2), 380, 0, 2 * Math.PI, false);
ctx.lineWidth = 10;
ctx.stroke();
ctx.closePath();

// HERE, drawing `invisible goal` line LEFT --Not sure if we are gonna use it.
ctx.beginPath();
ctx.arc((canvasWidth/2), (canvasHeight/2), 380, Math.PI/2, Math.PI*1.5, false);
ctx.lineWidth = 1;
/* ctx.strokeStyle = `red` */
ctx.stroke();
ctx.closePath();

// HERE, drawing `invisible goal` line RIGHT --Not sure if we are gonna use it.
ctx.beginPath();
ctx.arc((canvasWidth/2), (canvasHeight/2), 380, Math.PI*1.5, Math.PI/2, false);
ctx.lineWidth = 1;
/* ctx.strokeStyle = `red` */
ctx.stroke();
ctx.closePath();


// HERE, drawing static "meio de campo"
ctx.beginPath();
ctx.moveTo((canvasWidth/2), 10);
ctx.lineTo((canvasWidth/2), canvasHeight-10);
ctx.lineWidth = 10;
ctx.stroke();
ctx.closePath();

// HERE, drawing static player LEFT
ctx.fillStyle = `white`;
ctx.fillRect((270 + playerOffset), (canvasHeight/2 - playerWidth/2), playerHeight, playerWidth)
// HERE, drawing static player RIGHT
ctx.fillStyle = `white`;
ctx.fillRect((1015 - playerOffset), (canvasHeight/2 - playerWidth/2), playerHeight, playerWidth)

// HERE, static ball
ctx.beginPath();
ctx.arc((canvasWidth/2), (canvasHeight/2), ballSize, 0, 2 * Math.PI, false);
ctx.fillStyle = `rgba(23, 32, 42, 1)`
ctx.fill();
ctx.lineWidth = 2;
ctx.strokeStyle = `white`
ctx.stroke();
ctx.closePath();
