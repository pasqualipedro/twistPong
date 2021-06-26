/* --TWIST PONG CODE--
--Writen by Pedro Pasquali--1#Project IronHack WDPT50-SP-- */
// document.getElementById(`canvas`).width.innnerText = 1500;
// document.getElementById(`canvas`).height.innerText = 750;

const playersGenOffset = 15;
const playersGenWidth = 30;
const playersGenHeight = 50;
////--LOGICS ONLY (classes, objects, functions, calculations...)
//  CLASS player LEFT-01
class Player {
    constructor(x, y, w, h) {
        this.offset = 30;//space from the margin
        this.x = x + playersGenOffset;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = `white`;
        this.rad = Math.PI;//translation in the field. input in degrees (1rad = 57.29degrees)
        this.pace = 0.01;//increment of move in X - `speed` in X axis
        this.rotation = 0;//rotation on itself - alway facing the center - should use Math.tan??
    };

    update () {
        myGameArea.ctx.fillStyle = `white`;
        myGameArea.ctx.fillRect(this.x, this.y, this.h, this.w);
    };

        // this.x += Math.cos(this.radians) * fieldRadius/2;
        /* this.y += Math.sin(this.radians) * fieldRadius/2; */
        
        /*  addEventListener(`keydown`, () => console.log(`hallo!`)); */
        /* this.radians += this.radianPace; */
        /* this.x += 1;
        console.log(this.x) */
        /* console.log(this.x + Math.cos(this.radians)); */
        /* console.log(Math.cos(this.radians)); */
        /* canvas.addEventListener(`keydown`, function() {
            console.log(`key pressed!`) */

        
    moveUp () {
        this.rad += this.pace;
        const newX = (myGameArea.canvas.width / 2) + (Math.cos(this.rad*(Math.PI)) * fieldRadius);
        console.log(newX);
            if (newX <= 650) {
                this.x = newX;
                this.y = (myGameArea.canvas.height / 2) + (Math.sin(this.rad*(Math.PI)) * fieldRadius);
            };
        /* console.log(`moveUp`);
        console.log(this.x, this.y); */
    };

    moveDown () {
        this.rad -= this.pace;
        const newX = (myGameArea.canvas.width / 2) + (Math.cos(this.rad*(Math.PI)) * +fieldRadius);
        console.log(newX);
            if (newX <= 650) {
                this.x = newX;
                this.y = (myGameArea.canvas.height / 2) + (Math.sin(this.rad*(Math.PI)) * +fieldRadius);
            };
        /* console.log(`moveDown`)
        console.log(this.x, this.y); */
    };

        /* this.x -= Math.cos(this.rad);
        this.y += Math.sin(this.rad); */
    /* if (this.x >= (this.x + 270) && this.y < (y + 425 - this.w / 2)) {
        this.rpaceX += 1;
        this.rpaceY += 1;
        this.rad += 1;
        this.rotation += 1;
    } else if (this.x >= (x + 270) && this.y > (y + 425 - this.w / 2)) {
        this.rpaceX -= 1;
        this.rpaceY += 1;
        this.rad += 1;
        this.rotation += 1; 
    };*/
    

};

// commom numbers - (in the future they may change)
const ballSize = 15;
const fieldRadius = 380;
const player1 = new Player (270, 425, 50, 20);

// game area object and everything that may happen in it (methods)
const myGameArea = {
    canvas: document.createElement(`canvas`),
    start: function () {
        this.ctx = this.canvas.getContext(`2d`);
        this.canvas.width = 1300;
        this.canvas.height = 850;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.myGameArea.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    /* checkWInner: function () {};
    scoreP1: function () {},
    scoreP2: function () {}, */
};


//  drawing static circular battlefield
function drawBattleField() {
    myGameArea.ctx.beginPath();
    myGameArea.ctx.arc((myGameArea.canvas.width / 2), (myGameArea.canvas.height / 2), fieldRadius, 0, 2 * Math.PI, false);
    myGameArea.ctx.lineWidth = 10;
    myGameArea.ctx.stroke();
    myGameArea.ctx.closePath();
    //  drawing `invisible score line` LEFT --Not sure if we are gonna use it.
    myGameArea.ctx.beginPath();
    myGameArea.ctx.arc((myGameArea.canvas.width / 2), (myGameArea.canvas.height / 2), fieldRadius, Math.PI / 2, Math.PI * 1.5, false);
    myGameArea.ctx.lineWidth = 1;
    myGameArea.ctx.stroke();
    myGameArea.ctx.closePath();
    //  drawing `invisible score line` RIGHT --Not sure if we are gonna use it.
    myGameArea.ctx.beginPath();
    myGameArea.ctx.arc((myGameArea.canvas.width / 2), (myGameArea.canvas.height / 2), fieldRadius, Math.PI * 1.5, Math.PI / 2, false);
    myGameArea.ctx.lineWidth = 1;
    myGameArea.ctx.stroke();
    myGameArea.ctx.closePath();
};

//  drawing static "meio de campo"
function drawMidfield() {
    myGameArea.ctx.beginPath();
    myGameArea.ctx.moveTo((myGameArea.canvas.width / 2), 10);
    myGameArea.ctx.lineTo((myGameArea.canvas.width / 2), myGameArea.canvas.height - 10);
    myGameArea.ctx.lineWidth = 10;
    myGameArea.ctx.stroke();
    myGameArea.ctx.closePath();
};

//  static ball
function drawBall() {
    myGameArea.ctx.beginPath();
    myGameArea.ctx.arc((myGameArea.canvas.width / 2), (myGameArea.canvas.height / 2), ballSize, 0, 2 * Math.PI, false);
    myGameArea.ctx.fillStyle = `rgba(23, 32, 42, 1)`
    myGameArea.ctx.fill();
    myGameArea.ctx.lineWidth = 2;
    myGameArea.ctx.strokeStyle = `white`
    myGameArea.ctx.stroke();
    myGameArea.ctx.closePath();
};


////--SHOWTIME (presentation and whats the correct order of logics to happen...)

// game area updates pipeline
function updateGameArea() {
    myGameArea.start();
    drawBattleField();
    drawMidfield();
    drawBall();
    /* player1.newPos(); */
    player1.update();
    // myGameArea.clear();
    // playerOne.drawPlayer();
    // playerOne.movePlayer();
    // addEventListener(`keydown`, function() {console.log(`hallo!`)});
    // playerTwo.drawPlayer();

    // requestAnimationFrame(refreshCanvas);
};


////--CONTROLS ONLY (listeners...or what need to happen to control the "logics")

document.addEventListener(`keydown`, (e) => {
    switch (e.key) {
        case `a`: // letter `D`
            player1.moveUp();
            break;
        case `d`: // letter `A`
            player1.moveDown();
            break;
    }
});