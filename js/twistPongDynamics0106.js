/* --TWIST PONG CODE--
--Writen by Pedro Pasquali--1#Project IronHack WDPT50-SP-- */
// document.getElementById(`canvas`).width.innnerText = 1500;
// document.getElementById(`canvas`).height.innerText = 750;


// commom numbers - (in the future they may change)
const playersGenOffset = 15;
const playersGenWidth = 20;
const playersGenHeight = 50;
const playersGenRadius = 30;
const fieldRadius = 380;
const ballTravelRadius = fieldRadius - playersGenOffset;
const ballRadius = 15;
let scoreLimit = 3;
// document.getElementById(`#scoreLimit input`).innerText = scoreLimit;
// console.log(scoreLimit);

////--LOGICS ONLY (classes, objects, functions, calculations...)
// game area object and everything that may happen in it (methods)
const gameCanvas = {
    canvas: document.getElementById(`canvas`),
    canvasWidth: this.canvas.width,
    canvasHeight: this.canvas.height,
    ctx: this.canvas.getContext(`2d`),
    clear: function () {
        this.ctx.beginPath();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.closePath();
    },
};

// --> convert degrees to radians - to facilitate understanding
function degreesToRad(degrees) {
    const pi = Math.PI; // Math.PI
    return degrees * (pi / 180);
};

// --> convert radians to degrees - to facilitate understanding
function radToDegrees(rad) {
    return rad * 57.295779513;
};

// --> pick random angle between values. NOT IN USE
function getRandAngle(min, max) {
    return (Math.random() * (max - min) + min);
};

// --> pick random Y point in the middleLine of battlefield. results in an angle of reflection after collision
function randomPointbetweenYs() {
    const Ystart = Math.ceil(gameCanvas.canvasHeight / 2 - ballTravelRadius);
    const Yend = Math.floor(gameCanvas.canvasHeight / 2 + ballTravelRadius);
    return Math.floor(Math.random() * (Yend - Ystart)) + Ystart;
};

// --> we get an angle given the 2 sides on right-triangle
function haveSidesWantAngleInRad(adjacentSide, oppositeSide) {
    return Math.atan(oppositeSide / adjacentSide);
};



//  BALL
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
        return this.x - this.r;
    };

    right() {
        return this.x + this.r;
    };

    top() {
        return this.y;
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

    moveBall() {
        this.x += this.pace * Math.cos(degreesToRad(this.angle));
        this.y += this.pace * Math.sin(degreesToRad(this.angle));
    };

    checkCollBallP1() {
        let xDistBallP1 = this.x - player1.x;
        let yDistBallP1 = player1.y - this.y;
        //
        let totalDistBallP1 = Math.sqrt(Math.pow(xDistBallP1, 2) + Math.pow(yDistBallP1, 2));
        // console.log(`distance to P1 ${totalDistBallP1}`);

        if (totalDistBallP1 < ball.r + player1.r) {
            console.log(`Ball collided with P1`)
            // this.angle = 0;
            return true;
        }
        return false;
    };

    checkCollBallP2() {
        let xDistBallP2 = player2.x - this.x;
        let yDistBallP2 = player2.y - this.y;

        let totalDistBallP2 = Math.sqrt(Math.pow(xDistBallP2, 2) + Math.pow(yDistBallP2, 2));

        if (totalDistBallP2 < ball.r + player2.r) {
            console.log(`Ball collided with P2`);
            return true
        }
        return false;
    };

    changeMovementAngle(direction) {
        if (direction === `left`) {
            console.log(`BALL TO RIGHT`);
            let differX = this.x - gameCanvas.canvasWidth / 2;
            let differY = this.y - randomPointbetweenYs();
            this.angle = radToDegrees(haveSidesWantAngleInRad(differX, differY));
        };

        if (direction === `right`) {
            console.log(`BALL TO LEFT`);
            let differX = - this.x - gameCanvas.canvasWidth / 2;
            let differY = this.y - randomPointbetweenYs();
            this.angle = 180 - radToDegrees(haveSidesWantAngleInRad(differX, differY));
        };
    };
};

//  CLASS player1 - LEFT
class Player1 {
    constructor(r, color) {
        this.x = gameCanvas.canvasWidth / 2 - fieldRadius;
        this.y = gameCanvas.canvasHeight / 2;
        this.r = r;
        // this.w = w;
        // this.h = h;
        this.color = color;
        this.angle = 180; //-- inserir em graus! - converte graus em radianos.
        this.pace = 2.5; //--here, the speed pace   
        this.score = 0;
    };

    left() {
        return this.x - this.r;
    };

    right() {
        return this.x + this.r;
    };

    top() {
        return this.y;
    };

    bottom() {
        return this.y + this.r;
    };

    drawPlayer() {
        gameCanvas.ctx.beginPath();
        gameCanvas.ctx.arc(this.x, this.y, playersGenRadius, 0, (2 * Math.PI), false);
        gameCanvas.ctx.fillStyle = this.color;
        gameCanvas.ctx.fill();
        gameCanvas.ctx.lineWidth = 1;
        gameCanvas.ctx.strokeStyle = `black`;
        gameCanvas.ctx.stroke();
        gameCanvas.ctx.closePath();
    };

    moveUp() {
        this.angle -= this.pace;
        this.x = gameCanvas.canvasWidth / 2 + (Math.cos(degreesToRad(this.angle)) * (fieldRadius) * +1);
        this.y = gameCanvas.canvasHeight / 2 + (Math.sin(degreesToRad(this.angle)) * (fieldRadius) * -1);
    };

    moveDown() {
        this.angle += this.pace;
        this.x = gameCanvas.canvasWidth / 2 + (Math.cos(degreesToRad(this.angle)) * (fieldRadius) * +1);
        this.y = gameCanvas.canvasHeight / 2 + (Math.sin(degreesToRad(this.angle)) * (fieldRadius) * -1);
    };

    printScore() {
        document.getElementById(`p1scoreNumber`).innerText = this.score
    };

};

//  CLASS player2 - RIGHT
class Player2 extends Player1 {
    constructor(r, color) {
        super(r);
        this.x = gameCanvas.canvasWidth / 2 + fieldRadius;
        this.y = gameCanvas.canvasHeight / 2;
        this.r = r;
        // this.h = h;
        // this.w = w;
        this.color = color;
        this.angle = 0;
        this.pace = 2;
    };

    left() {
        return this.x - this.r;
    };

    right() {
        return this.x + this.r;
    };

    top() {
        return this.y;
    };

    bottom() {
        return this.y + this.r;
    };

    moveUp() {
        this.angle += this.pace;
        this.x = gameCanvas.canvasWidth / 2 + (Math.cos(degreesToRad(this.angle)) * (fieldRadius) * +1);
        this.y = gameCanvas.canvasHeight / 2 + (Math.sin(degreesToRad(this.angle)) * (fieldRadius) * -1);
    };

    moveDown() {
        this.angle -= this.pace;
        this.x = gameCanvas.canvasWidth / 2 + (Math.cos(degreesToRad(this.angle)) * (fieldRadius) * +1);
        this.y = gameCanvas.canvasHeight / 2 + (Math.sin(degreesToRad(this.angle)) * (fieldRadius) * -1);
    };

    printScore() {
        document.getElementById(`p2scoreNumber`).innerText = this.score
    };
};

//  BATTLEFIELD
function drawBattleField() {
    gameCanvas.ctx.beginPath();
    gameCanvas.ctx.arc((gameCanvas.canvasWidth / 2), (gameCanvas.canvasHeight / 2), fieldRadius, 0, 2 * Math.PI, false);
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
const player1 = new Player1(playersGenRadius, `orange`);
const player2 = new Player2(playersGenRadius, `turquoise`);
const ball = new Ball(gameCanvas.canvasWidth / 2, gameCanvas.canvasHeight / 2, `white`);




function checkScore() {
    let ballHypotP1Field = Math.hypot((gameCanvas.canvasWidth / 2 - ball.x), (ball.y - gameCanvas.canvasHeight / 2));
    let ballHypotP2Field = Math.hypot((ball.x - gameCanvas.canvasWidth / 2), (ball.y - gameCanvas.canvasHeight / 2));
    
    // check if player 2 scored
    if (ball.x < gameCanvas.canvasWidth / 2 && ballHypotP1Field > fieldRadius) {
        console.log(`SCORE TO PLAYER 2!!`)
        player2.score += 1;
        player2.printScore();
        ball.x = gameCanvas.canvasWidth / 2;
        ball.y = gameCanvas.canvasHeight / 2;
        ball.angle = 0;
    };

    // check if player 1 scored
    if (ball.x > gameCanvas.canvasWidth / 2 && ballHypotP2Field > fieldRadius) {
        console.log(`SCORE TO PLAYER 1!!`)
        player1.score += 1;
        player1.printScore();
        ball.x = gameCanvas.canvasWidth / 2 ;
        ball.y = gameCanvas.canvasHeight / 2;
        ball.angle = 180;
    };
};

function checkCollisions() {
    if (ball.checkCollBallP1()) {
        ball.changeMovementAngle(`left`);
        ball.pace += 0.15;
    } else if (ball.checkCollBallP2()) {
        ball.changeMovementAngle(`right`);
        ball.pace += 0.15;
    };
};

function checkGameOver() {
    if (player1.score === scoreLimit) {
        return player1
        // console.log(`gameover, player 1 wins!`)
    } else if (player2.score === scoreLimit) {
        return player2
        // console.log(`gameover, player 2 wins!`)
    }
    return false;
};

function eraseScores() {
    player2.score = 0;
    player1.score = 0;
}

// function chooseScoreLimit(addOrSubtract) {
//     if (addOrSubtract === `add`) {
//         console.log(`trying to increase points`)
//         // document.querySelector(`#scoreLimit`).innerText = scoreLimit;
//         // scoreLimit += 1;
//     };
//     if (addOrSubtract === `subtract`) {
//         console.log(`trying to DEcrease points`)
//     }
// };

////--SHOWTIME (presentation and whats the correct order of logics to happen...)

// game area updates pipeline
function updateCanvas() {
    gameCanvas.clear();
    drawBattleField();
    player1.drawPlayer();
    player2.drawPlayer();
    checkCollisions();
    ball.moveBall();
    ball.drawBall();
    checkScore();
    const winner = checkGameOver();
    if (!winner) {
        requestAnimationFrame(updateCanvas);
    } else {
        gameCanvas.clear();
        gameCanvas.ctx.fillText(`O ganhador foi ${winner.color}`, gameCanvas.canvasWidth / 2, gameCanvas.canvasHeight / 2, 250);
        eraseScores();
    };
};




////--CONTROLS ONLY (listeners...or what need to happen to control the "logics")
// players controls
document.addEventListener(`keydown`, (e) => {
    switch (e.key) {
            // player1
        case `w`: // letter `W`
            console.log(`P1 Up`);
            player1.moveUp();
            break;
        case `s`: // letter `S`
            console.log(`P1 Down`);
            player1.moveDown();
            break;

            // player2
        case `o`: // `Up`
            console.log(`P2 Up`);
            player2.moveUp();
            break;
        case `l`: // `Down`
            console.log(`P2 Down`);
            player2.moveDown();
            break;
    }
});

// start button
window.addEventListener('load', () => {
    const startButton = document.getElementById('startGameButton');
    startButton.addEventListener(`click`, updateCanvas);
  });

  // score buttons
// window.addEventListener('load', () => {
//     const increaseLimitScoreButton = document.querySelector(`#increaseScoreButton`);
//     const decreaseLimitScoreButton = document.querySelector(`#decreaseScoreButton`);
//     increaseLimitScoreButton.addEventListener(`click`, chooseScoreLimit(`add`));
//     decreaseLimitScoreButton.addEventListener(`click`, chooseScoreLimit(`subtract`));
// });
