/* --TWIST PONG CODE--
--Writen by Pedro Pasquali--1#Project IronHack WDPT50-SP-- */
// document.getElementById(`canvas`).width.innnerText = 1500;
// document.getElementById(`canvas`).height.innerText = 750;


// commom numbers - (in the future they may change)
const playersGenOffset = 15;
const playersGenWidth = 20;
const playersGenHeight = 50;
const fieldRadius = 380;
const ballTravelRadius = fieldRadius - playersGenOffset;
const ballRadius = 15;

////--LOGICS ONLY (classes, objects, functions, calculations...)
// game area object and everything that may happen in it (methods)
const gameCanvas = {
    canvas: document.getElementById(`canvas`),
    canvasWidth: this.canvas.width,
    canvasHeight: this.canvas.height,
    ctx: this.canvas.getContext(`2d`),
    clear: function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    stop: function () {

    }
};

function degreesToRad(degrees) {
    const pi = Math.PI; // Math.PI
    return degrees * (pi/180);
};

// pick random angle between values. not included.
function getRandAngle(min, max) {
    return (Math.random() * (max - min) + min);
};
//console.log(getRandAngle(degreesToRad(130), degreesToRad(270)))

// BALL
class Ball {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.r = 15;
        this.color = color;
        this.angle = 180;
        this.pace = 1;
    };

    left() {
        return this.x + this.r;
    };

    right() {
        return this.x + this.r;
    };

    top() {
        return this.y + this.r;
    };

    bottom() {
        return this.y + this.r;
    };

    drawBall() {
        gameCanvas.ctx.beginPath();
        gameCanvas.ctx.arc(this.x, this.y, this.r, 0, (2 * Math.PI), false);
        gameCanvas.ctx.fillStyle = this.color;
        gameCanvas.ctx.fill();
        gameCanvas.ctx.lineWidth = 1;
        gameCanvas.ctx.strokeStyle = `black`;
        gameCanvas.ctx.stroke();
        gameCanvas.ctx.closePath();
    };

    // move
    //collision N - continue
    //collision Y - next...
    // change direction




    moveBall() {
        this.x += this.pace * Math.cos(degreesToRad(180));
        this.y += this.pace * Math.sin(degreesToRad(180));
        if (this.left() < player1.right()) {
            this.x += this.pace * Math.cos(degreesToRad(50));
            this.y += this.pace * Math.sin(degreesToRad(50));
        };

        if (player1.crashWith() === true) {
            this.x += this.pace * Math.cos(degreesToRad(0));
            this.y += this.pace * Math.sin(degreesToRad(0));
        // } else if (player2.crashWith() === true) {
        //     this.x += this.pace * Math.cos(degreesToRad(180));
        //     this.y += this.pace * Math.sin(degreesToRad(180));
        };
    };
    

    //--tenho angulo e direcao - , calculamos o trajeto
    
        //--pto inicial e pto final - calcular (funcao linear) - prox X,Y
        //randomizar o pto final no arco "inimigo"
        // (x1 + l * cos(ang), y1 + l * sin(ang))
        // l = pace
        // moveBall() {
            /* console.log(this.angle); */
            // this.x += this.pace * Math.cos(this.angle);
            // this.y += this.pace * Math.sin(this.angle);
            /* this.checkCollision(); */
            /* if ( 50 > this.x > myGameArea.canvas.width + 50 || ) */


    moveUp() {
        this.angle -= this.pace;
        console.log(this.angle)
        this.x = gameCanvas.canvasWidth/2 + (Math.cos(degreesToRad(this.angle)) * (fieldRadius - playersGenWidth) * +1);
        this.y = gameCanvas.canvasHeight/2 + (Math.sin(degreesToRad(this.angle)) * (fieldRadius - playersGenHeight/2) * -1);
    };

    moveDown() {
        this.angle += this.pace;
        console.log(this.angle)
        this.x = gameCanvas.canvasWidth/2 + (Math.cos(degreesToRad(this.angle)) * (fieldRadius - playersGenWidth) * +1);
        this.y = gameCanvas.canvasHeight/2 + (Math.sin(degreesToRad(this.angle)) * (fieldRadius - playersGenHeight/2) * -1);
    };
};

//  CLASS player1 - LEFT
class Player1 {
    constructor(h, w, color) {
        this.x = gameCanvas.canvasWidth/2 - fieldRadius + playersGenOffset
        this.y = gameCanvas.canvasHeight/2 - playersGenHeight/2;
        this.w = w;
        this.h = h;
        this.color = color;
        this.angle = 180; //-- inserir em graus! - converte graus em radianos.
        this.pace = 2; //--here, the speed pace   
    };

    left() {
        return this.x;
    };

    right() {
        return this.x + this.w;
    };

    top() {
        return this.y;
    };

    bottom() {
        return this.y + this.h;
    };
     
    crashWith() {
        return !(this.right() > ball.left() || this.bottom() > ball.top() || this.top() < ball.bottom());
    };

    drawPlayer() {
        gameCanvas.ctx.beginPath();
        gameCanvas.ctx.fillStyle = this.color;
        gameCanvas.ctx.fillRect(this.x, this.y, this.w, this.h);
        gameCanvas.ctx.closePath();
        
    };

    moveUp() {
        this.angle -= this.pace;
        console.log(this.angle)
        if (this.angle >= 90) { // nao esta muito bem
        this.x = gameCanvas.canvasWidth/2 + (Math.cos(degreesToRad(this.angle)) * (fieldRadius - playersGenWidth) * +1);
        };
        this.y = gameCanvas.canvasHeight/2 + (Math.sin(degreesToRad(this.angle)) * (fieldRadius - playersGenHeight/2) * -1);
        
    };

    moveDown() {
        this.angle += this.pace;
        console.log(this.angle)
        if (this.angle <= 270) { // nao esta muito bem
        this.x = gameCanvas.canvasWidth/2 + (Math.cos(degreesToRad(this.angle)) * (fieldRadius - playersGenWidth) * +1);
        };
        this.y = gameCanvas.canvasHeight/2 + (Math.sin(degreesToRad(this.angle)) * (fieldRadius - playersGenHeight/2) * -1);
    };
};

//  CLASS player2 - RIGHT
class Player2 extends Player1 {
    constructor(h, w, color) {
        super(h, w);
        this.x = gameCanvas.canvasWidth/2 + fieldRadius - playersGenOffset - playersGenWidth;
        this.y = gameCanvas.canvasHeight/2 - playersGenHeight/2;
        this.h = h;
        this.w = w;
        this.color = color;
        this.angle = 0;
        this.pace = 2;
    };

    left() {
        return this.x;
    };

    right() {
        return this.x + this.w;
    };

    top() {
        return this.y;
    };

    bottom() {
        return this.y + this.h;
    };
     
    crashWith() {
        return !(this.left() > ball.right() || this.bottom() > ball.top() || this.top() < ball.bottom());
    };

    moveUp () {
        this.angle -= this.pace;
        console.log(this.angle)
        this.x = gameCanvas.canvasWidth/2 + (Math.cos(degreesToRad(this.angle)) * (fieldRadius - playersGenWidth - playersGenWidth) * +1);
        this.y = gameCanvas.canvasHeight/2 + (Math.sin(degreesToRad(this.angle)) * (fieldRadius - playersGenHeight/2) * -1);
    };

    moveDown () {
        this.angle += this.pace;
        console.log(this.angle)
        this.x = gameCanvas.canvasWidth/2 + (Math.cos(degreesToRad(this.angle)) * (fieldRadius - playersGenWidth - playersGenWidth) * +1);
        this.y = gameCanvas.canvasHeight/2 + (Math.sin(degreesToRad(this.angle)) * (fieldRadius - playersGenHeight/2) * -1);
    };
}

//  BATTLEFIELD
function drawBattleField() {
    gameCanvas.ctx.beginPath();
    gameCanvas.ctx.arc((gameCanvas.canvasWidth / 2), (gameCanvas.canvasHeight/ 2), fieldRadius, 0, 2 * Math.PI, false);
    gameCanvas.ctx.lineWidth = 5;
    gameCanvas.ctx.strokeStyle = `white`;
    gameCanvas.ctx.stroke();
    gameCanvas.ctx.save();
    gameCanvas.ctx.moveTo((gameCanvas.canvasWidth / 2), 10);
    gameCanvas.ctx.lineTo((gameCanvas.canvasWidth / 2), gameCanvas.canvasHeight - 10);
    gameCanvas.ctx.stroke();
    // gameCanvas.ctx.moveTo(0, (gameCanvas.canvasHeight / 2));
    // gameCanvas.ctx.lineTo(gameCanvas.canvasWidth, (gameCanvas.canvasHeight/ 2));
    // gameCanvas.ctx.stroke();
    gameCanvas.ctx.closePath();
};





// main elements declarations HERE
const player1 = new Player1 (playersGenHeight, playersGenWidth, `orange`);
const player2 = new Player2 (playersGenHeight, playersGenWidth, `turquoise`);
const ball = new Ball (gameCanvas.canvasWidth/2, gameCanvas.canvasHeight/2, `white`);


console.log(player1.crashWith());
console.log(player2.crashWith());



////--SHOWTIME (presentation and whats the correct order of logics to happen...)
// function checkScore() {

// };

// function checkGameOver() {

// };

// game area updates pipeline
function updateCanvas() {
    gameCanvas.clear();
    drawBattleField();
    player1.drawPlayer();
    player2.drawPlayer();
    ball.drawBall();
    ball.moveBall();
    player1.crashWith();
    player2.crashWith();
    
    

    requestAnimationFrame(updateCanvas);
};
updateCanvas();

////--CONTROLS ONLY (listeners...or what need to happen to control the "logics")

// player1
document.addEventListener(`keydown`, (e) => {
    switch (e.key) {
        case `w`: // letter `W`
            player1.moveUp();
            break;
        case `s`: // letter `S`
            player1.moveDown();
            break;
        case `ArrowRight`: // `Left`
            console.log(`Up`);
            player2.moveUp();
            break;
        case `ArrowLeft`: // `Right`
            console.log(`Down`);
            player2.moveDown();
            break;
    }
});

// start button
window.addEventListener(`load`, () => {
    const startGame = document.getElementById(`startGameBtn`)
    startGame.addEventListener(`click`, updateCanvas())});

// ball movement
document.addEventListener(`keydown`, (e) => {
    switch (e.key) {
        case `Enter`: // `Enter`
            console.log(`MoveBall`);
            ball.moveBall();
            break;
    }
});