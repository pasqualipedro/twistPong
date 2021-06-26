/* --TWIST PONG CODE--
--Writen by Pedro Pasquali--1#Project IronHack WDPT50-SP-- */
// document.getElementById(`canvas`).width.innnerText = 1500;
// document.getElementById(`canvas`).height.innerText = 750;

// HERE, code for player LEFT-01
class Player {
    constructor(x, y, w, h, offset, rad) {
        this.x = x + 270;
        this.y = y + 425 - 30 / 2;
        this.offset = 30;//space from the margin
        this.w = w + 30;
        this.h = h + 50;
        this.color = `white`;
        this.rad = rad;//translation in the field, in radians
        this.rpaceX = 0;//increment of move in X - `speed` in X axis
        this.rpaceY = 0;//increment of move in Y - `speed` in Y axis
        this.rotation = 0;//rotation on itself - alway facing the center - should use Math.tan??
    };

    update () {
        myGameArea.ctx.fillStyle = `white`;
        myGameArea.ctx.fillRect(this.x, this.y, this.h, this.w);
    };

    newPos = () => {
        this.x += this.rpaceX;
        this.y += this.rpaceY;
        document.addEventListener(`keydown`, (e) => {
            switch (e.key) {
                case 65: // letter `A`
                    if (this.x >= (x + 270) || this.y < (y + 425 - this.w / 2)) {
                        this.rpaceX += 1;
                        this.rpaceY -= 1;
                        this.rad -= 1;
                        this.rotation -= 1;
                    } else if (this.x >= (x + 270) || this.y > (y + 425 - this.w / 2)) {
                        this.rpaceX -= 1;
                        this.rpaceY -= 1;
                        this.rad -= 1;
                        this.rotation += 1;
                    };
                    break;
                case 68: // letter `D`
                    if (this.x >= (x + 270) || this.y < (y + 425 - this.w / 2)) {
                        this.rpaceX += 1;
                        this.rpaceY += 1;
                        this.rad += 1;
                        this.rotation += 1;
                    } else if (this.x >= (x + 270) || this.y > (y + 425 - this.w / 2)) {
                        this.rpaceX -= 1;
                        this.rpaceY += 1;
                        this.rad += 1;
                        this.rotation += 1;
                    };
                    break;
            }
        });

        document.addEventListener(`keyup`, (e) => {
            this.rpaceX = 0;
            this.rpaceY = 0;
        });
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
        };
        
    moveDown () {
            this.y += 10;
            this.x += 10;
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
    }

    };
//--HERE, commom numbers - (in the future they may change)
const playersGenOffset = 15;
const ballSize = 15;
const fieldRadius = 380;
const playersGenWidth = 30;
const playersGenHeight = 50;
const player1 = new Player (0, 0, 0, 0, 0, 0);

//HERE, game area updates pipeline
function updateGameArea() {
    myGameArea.start();
    drawBattleField();
    drawMidfield();
    drawBall();
    player1.newPos();
    player1.update();
    // myGameArea.clear();
    // playerOne.drawPlayer();
    // playerOne.movePlayer();
    // addEventListener(`keydown`, function() {console.log(`hallo!`)});
    // playerTwo.drawPlayer();

    // requestAnimationFrame(refreshCanvas);
};

//HERE, game area object and everything that may happen in it (methods)
const myGameArea = {
    canvas: document.createElement(`canvas`),
    start: function () {
        this.ctx = this.canvas.getContext(`2d`);
        /* canvasWidth = document.getElementById(`canvas`).width
        canvasHeight = document.getElementById(`canvas`).height */
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





// HERE, drawing static circular battlefield
function drawBattleField() {
    myGameArea.ctx.beginPath();
    myGameArea.ctx.arc((myGameArea.canvas.width / 2), (myGameArea.canvas.height / 2), fieldRadius, 0, 2 * Math.PI, false);
    myGameArea.ctx.lineWidth = 10;
    myGameArea.ctx.stroke();
    myGameArea.ctx.closePath();
    // HERE, drawing `invisible score line` LEFT --Not sure if we are gonna use it.
    myGameArea.ctx.beginPath();
    myGameArea.ctx.arc((myGameArea.canvas.width / 2), (myGameArea.canvas.height / 2), fieldRadius, Math.PI / 2, Math.PI * 1.5, false);
    myGameArea.ctx.lineWidth = 1;
    myGameArea.ctx.stroke();
    myGameArea.ctx.closePath();
    // HERE, drawing `invisible score line` RIGHT --Not sure if we are gonna use it.
    myGameArea.ctx.beginPath();
    myGameArea.ctx.arc((myGameArea.canvas.width / 2), (myGameArea.canvas.height / 2), fieldRadius, Math.PI * 1.5, Math.PI / 2, false);
    myGameArea.ctx.lineWidth = 1;
    myGameArea.ctx.stroke();
    myGameArea.ctx.closePath();
};

// HERE, drawing static "meio de campo"
function drawMidfield() {
    myGameArea.ctx.beginPath();
    myGameArea.ctx.moveTo((myGameArea.canvas.width / 2), 10);
    myGameArea.ctx.lineTo((myGameArea.canvas.width / 2), myGameArea.canvas.height - 10);
    myGameArea.ctx.lineWidth = 10;
    myGameArea.ctx.stroke();
    myGameArea.ctx.closePath();
};

// HERE, static ball
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

    



// requestAnimationFrame(refreshCanvas);

// // HERE, code for player RIGHT-01
// class PlayerRight {
//     constructor() {
//         this.pLeftOff = 15;
//         this.w = 50;
//         this.h = 15;
//         this.x = (1015 - playersGenOffset);
//         this.y = (425 - this.w / 2);
//         this.radians = 0;
//         this.pace = 1;
//     };

//     drawPlayer() {
//         myGameArea.ctx.fillStyle = `white`;
//         myGameArea.ctx.fillRect(this.x, this.y, this.h, this.w);
//         // myGameArea.ctx.fillRect((1015 - playersGenOffset), (myGameArea.canvas.height/2 - this.w/2), this.w, this.h);
//     };

//     movePlayer() {
//         this.x =
//             this.drawPlayerRight

//     };
// };

//--LOGICA
//classes....

//--HERE, CONTROL ONLY
//...listener 
document.addEventListener(`keydown`, (e) => {
    console.log(e.key);
    switch (e.key) {
        case `a`: // letter `A`
            player1.moveDown();
            break;
        case 68: // letter `D`
            /* if (this.x >= (x + 270) || this.y < (y + 425 - this.w / 2)) {
                this.rpaceX += 1;
                this.rpaceY += 1;
                this.rad += 1;
                this.rotation += 1;
            } else if (this.x >= (x + 270) || this.y > (y + 425 - this.w / 2)) {
                this.rpaceX -= 1;
                this.rpaceY += 1;
                this.rad += 1;
                this.rotation += 1;
            }; */
            break;
    }
});


//--APRESENTACAO
//---orden das logicas