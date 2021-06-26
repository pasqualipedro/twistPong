const playersGenOffset = 15;
const ballSize = 15;
const fieldRadius = 380;
const playersGenWidth = 30;
const playersGenHeight = 50;

const canvas = document.getElementById(`canvas`);
const ctx = canvas.getContext(`2d`);
canvasWidth = document.getElementById(`canvas`).width
canvasHeight = document.getElementById(`canvas`).height
console.log(canvasWidth);
console.log(canvasHeight);

ctx.strokeStyle = `white`


drawBattleField();
drawMidfield();
drawBall();
player1.draw();



// HERE, drawing static circular battlefield
function drawBattleField() {
    ctx.beginPath();
    ctx.arc((canvasWidth / 2), (canvasHeight / 2), fieldRadius, 0, 2 * Math.PI, false);
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.closePath();
    // HERE, drawing `invisible score line` LEFT --Not sure if we are gonna use it.
    ctx.beginPath();
    ctx.arc((canvasWidth / 2), (canvasHeight / 2), fieldRadius, Math.PI / 2, Math.PI * 1.5, false);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
    // HERE, drawing `invisible score line` RIGHT --Not sure if we are gonna use it.
    ctx.beginPath();
    ctx.arc((canvasWidth / 2), (canvasHeight / 2), fieldRadius, Math.PI * 1.5, Math.PI / 2, false);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
};

// HERE, drawing static "meio de campo"
function drawMidfield() {
    ctx.beginPath();
    ctx.moveTo((canvasWidth / 2), 10);
    ctx.lineTo((canvasWidth / 2), canvasHeight - 10);
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.closePath();
};

// HERE, static ball
class Ball {
    constructor (x, y, r, color) {
        this.x = x + canvasWidth / 2;
        this.y = y + canvasHeight / 2;
        this.r = r + ballSize;
        this.color = color;
    
    };
    
    draw() {
        ctx.beginPath();
        ctx.arc((canvasWidth / 2), (canvasHeight / 2), ballSize, 0, 2 * Math.PI, false);
        ctx.fillStyle = `rgba(23, 32, 42, 1)`
        ctx.lineWidth = 2;
        ctx.strokeStyle = color
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

    };

    movement() {

    }
        
};




// function drawBall() {
//     ctx.beginPath();
//     ctx.arc((canvasWidth / 2), (canvasHeight / 2), ballSize, 0, 2 * Math.PI, false);
//     ctx.fillStyle = `rgba(23, 32, 42, 1)`
//     ctx.lineWidth = 2;
//     ctx.strokeStyle = `white`
//     ctx.fill();
//     ctx.stroke();
//     ctx.closePath();

// };





// HERE, code for player LEFT-01
class Player {
    constructor(x, y, w, h, offset, rad) {
        this.x = x + 270;
        this.y = y + 425 - this.w / 2;
        this.offset = offset + playersGenOffset;//space from the margin
        this.w = w + playersGenWidth;
        this.h = h + playersGenHeight;
        this.color = `white`;
        this.rad = rad;//translation in the field, in radians
        this.rpaceX = 0;//increment of move in X - `speed` in X axis
        this.rpaceY = 0;//increment of move in Y - `speed` in Y axis
        this.rotation = 0;//rotation on itself - alway facing the center - should use Math.tan??
    };

    draw () {
        const ctx = canvas.getContext(`2d`);
        ctx.fillStyle = `white`;
        ctx.fillRect(this.x, this.y, this.h, this.w);
    };

    moveTo = () => {
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
    };  
};
const player1 = new Player (0, 0, 0, 0, 0, 0);
