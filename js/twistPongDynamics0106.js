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

    // stop: function () {

    // }
};

function degreesToRad(degrees) {
    const pi = Math.PI; // Math.PI
    return degrees * (pi / 180);
};

function radToDegrees(rad) {
    return rad * 57.295779513;
}


// pick random angle between values. not included. - maybe it wont work.
function getRandAngle(min, max) {
    return (Math.random() * (max - min) + min);
};
//console.log(getRandAngle(degreesToRad(130), degreesToRad(270)))

function randomPointbetweenYs() {
    const Ystart = Math.ceil(gameCanvas.canvasHeight / 2 - ballTravelRadius);
    const Yend = Math.floor(gameCanvas.canvasHeight / 2 + ballTravelRadius);
    return Math.floor(Math.random() * (Yend - Ystart)) + Ystart;
};
// console.log(randomPointbetweenYs())

function haveSidesWantAngleInRad(adjacentSide, oppositeSide) {
    return Math.atan(oppositeSide / adjacentSide);
};
// console.log(haveSidesWantAngleInRad(4, 4));

// BALL
class Ball {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.r = 15;
        this.color = color;
        this.angle = 180;
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

    //-----SAFE COPY FOR MESSIGN BELLOW - 03.07.21
    // moveBall() {
    //     this.x += this.pace * Math.cos(degreesToRad(this.angle));
    //     this.y += this.pace * Math.sin(degreesToRad(this.angle));
    //     if (this.left() < player1.right()) { //-test to check collision between ball vs player1
    //         this.angle -= 1;
    //         // this.angle = Math.random() * 
    //     }; 
    //     if (this.right() > player2.left()) {
        //         this.angle += 180;
        //     };
        // };

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
        //
        let totalDistBallP2 = Math.sqrt(Math.pow(xDistBallP2, 2) + Math.pow(yDistBallP2, 2));
        // console.log(`distance to P2 ${totalDistBallP2}`);

        if (totalDistBallP2 < ball.r + player2.r) {
            console.log(`Ball collided with P2`)
            // this.angle = -180;
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
        // if (differY < 0){
        //     this.angle = radToDegrees(haveSidesWantAngleInRad(differX, (differY * -1)));
        // };
        };

        if (direction === `right`) {
            console.log(`BALL TO LEFT`);
            let differX = - this.x - gameCanvas.canvasWidth / 2;
            let differY = this.y - randomPointbetweenYs();
            this.angle = 180 - radToDegrees(haveSidesWantAngleInRad(differX, differY));
            console.log(this.angle);
        //     let differX = this.x - gameCanvas.canvasWidth / 2;
        //     let differY = this.y - randomPointbetweenYs();
        //     console.log(`change angle here for P2`);
        // if (differY < 0){
        //     this.angle = haveSidesWantAngleInRad(differX, (differY * -1));
        // };
        //     this.angle = haveSidesWantAngleInRad(differX, differY);
        }
    };

};                              
        /* if (this.left() <= player1.right()) { //-test to check collision between ball vs player1
            console.log(`CollisionP1`);
            this.angle -= 1;
            // let xAtmOfCol = this.x;
            // let yAtmOfCol = this.y;
            // let differX = gameCanvas.canvasWidth / 2 - xAtmOfCol;
            // let differY = yAtmOfCol - randomPointbetweenYs();
            // this.angle = haveSidesWantAngleInRad(differX, differY);
            // this.x += Math.cos(this.angle);
            // this.y += Math.sin(this.angle);
            
            // this.x = randomPointbetweenYs();
            // this.y = randomPointbetweenYs();

            console.log(xAtmOfCol);
            console.log(yAtmOfCol);
            console.log(differX);
            console.log(differY);
            console.log(haveSidesWantAngleInRad(differX, differY));
        

        if (this.right() >= player2.left()) {
            console.log(`CollisionP2`);
            this.angle += 180;
            
            this.x += this.pace * Math.cos(degreesToRad(180));
            this.y += this.pace * Math.sin(degreesToRad(180));
            // let xAtmOfCol = this.x;
            // let yAtmOfCol = this.y;
            // let differX = xAtmOfCol - gameCanvas.canvasWidth / 2;
            // let differY = yAtmOfCol - randomPointbetweenYs();
            // this.angle = degreesToRad(180) - haveSidesWantAngleInRad(differX, differY);
            // this.x += Math.cos(this.angle);
            // this.y += Math.sin(this.angle);
        };
     */






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
        this.pace = 2; //--here, the speed pace   
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

    // crashWith() {
    //     return !(this.right() > ball.left() || this.bottom() > ball.top() || this.top() < ball.bottom());
    // };

    drawPlayer() {
        gameCanvas.ctx.beginPath();
        gameCanvas.ctx.arc(this.x, this.y, playersGenRadius, 0, (2 * Math.PI), false);
        gameCanvas.ctx.fillStyle = this.color;
        gameCanvas.ctx.fill();
        gameCanvas.ctx.lineWidth = 1;
        gameCanvas.ctx.strokeStyle = `black`;
        gameCanvas.ctx.stroke();
        gameCanvas.ctx.closePath();

        // gameCanvas.ctx.beginPath();
        // gameCanvas.ctx.fillStyle = this.color;
        // gameCanvas.ctx.fillRect(this.x, this.y, this.w, this.h);
        // gameCanvas.ctx.closePath();  

    };

    moveUp() {
        this.angle -= this.pace;
        console.log(this.angle)
        if (this.angle >= 90) { // nao esta muito bem
            this.x = gameCanvas.canvasWidth / 2 + (Math.cos(degreesToRad(this.angle)) * (fieldRadius) * +1);
        };
        this.y = gameCanvas.canvasHeight / 2 + (Math.sin(degreesToRad(this.angle)) * (fieldRadius) * -1);

    };

    moveDown() {
        this.angle += this.pace;
        console.log(this.angle)
        if (this.angle <= 270) { // nao esta muito bem
            this.x = gameCanvas.canvasWidth / 2 + (Math.cos(degreesToRad(this.angle)) * (fieldRadius) * +1);
        };
        this.y = gameCanvas.canvasHeight / 2 + (Math.sin(degreesToRad(this.angle)) * (fieldRadius) * -1);
    };

    score() {

    }

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

    crashWith() {
        return !(this.left() > ball.right() || this.bottom() > ball.top() || this.top() < ball.bottom());
    };

    moveUp() {
        this.angle += this.pace;
        console.log(this.angle)
        this.x = gameCanvas.canvasWidth / 2 + (Math.cos(degreesToRad(this.angle)) * (fieldRadius) * +1);
        this.y = gameCanvas.canvasHeight / 2 + (Math.sin(degreesToRad(this.angle)) * (fieldRadius) * -1);
    };

    moveDown() {
        this.angle -= this.pace;
        console.log(this.angle)
        this.x = gameCanvas.canvasWidth / 2 + (Math.cos(degreesToRad(this.angle)) * (fieldRadius) * +1);
        this.y = gameCanvas.canvasHeight / 2 + (Math.sin(degreesToRad(this.angle)) * (fieldRadius) * -1);
    };
}

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

// function changeScore() {

// };

// function checkGameOver() {

// };



// main elements declarations HERE
const player1 = new Player1(playersGenRadius, `orange`);
const player2 = new Player2(playersGenRadius, `turquoise`);
const ball = new Ball(gameCanvas.canvasWidth / 2, gameCanvas.canvasHeight / 2, `white`);





////--SHOWTIME (presentation and whats the correct order of logics to happen...)

// game area updates pipeline
function updateCanvas() {
    gameCanvas.clear();
    drawBattleField();
    player1.drawPlayer();
    player2.drawPlayer();
    if (ball.checkCollBallP1()) {
        ball.changeMovementAngle(`left`);
    } else if (ball.checkCollBallP2()) {
        ball.changeMovementAngle(`right`);
    };
    ball.moveBall();
    ball.drawBall();
    //checkScore();
    ///check collision novo - ponto e circulo
    ///sempre que ponto para esquerda e direita, muda angulo inicial e da um reset na bola (x e y)
    ///se chegar num limite de score, cancelar requestframe
    //checkGameOver();
    requestAnimationFrame(updateCanvas);
};




////--CONTROLS ONLY (listeners...or what need to happen to control the "logics")
// player1
document.addEventListener(`keydown`, (e) => {
    switch (e.key) {
        case `w`: // letter `W`
            console.log(`P1 Up`);
            player1.moveUp();
            break;
        case `s`: // letter `S`
            console.log(`P1 Down`);
            player1.moveDown();
            break;
        case `ArrowUp`: // `Up`
            console.log(`P2 Up`);
            player2.moveUp();
            break;
        case `ArrowDown`: // `Down`
            console.log(`P2 Down`);
            player2.moveDown();
            break;
    }
});

// start button
document.addEventListener(`keydown`, (e) => {
    switch (e.key) {
        case `Enter`: // `Enter` to start the game
            updateCanvas();
    }
});

// // ball movement
// document.addEventListener(`keydown`, (e) => {
//     switch (e.key) {
//         case `Enter`: // `Enter`
//             console.log(`MoveBall`);
//             ball.moveBall();
//             break;
//     }
// });