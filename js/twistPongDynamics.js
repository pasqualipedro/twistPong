/* --TWIST PONG CODE--
--Writen by Pedro Pasquali--1#Project IronHack WDPT50-SP-- */
// document.getElementById(`canvas`).width.innnerText = 1500;
// document.getElementById(`canvas`).height.innerText = 750;


// commom numbers - (in the future they may change)
const playersGenOffset = 15;
const playersGenWidth = 20;
const playersGenHeight = 50;
const fieldRadius = 380;
const ballRadius = 15;

////--LOGICS ONLY (classes, objects, functions, calculations...)
//  CLASS player1 - LEFT
class Player1 {
    constructor(h, w, bornAt) {
        /* this.offset = 30;//space from the margin */
        this.x =  290;
        this.y =  405;
        this.w = w;
        this.h = h;
        this.x1 = this.x + (w / 2);
        this.y1 = this.y + (h / 2);
        this.r = w / 2;
        /* this.x = (myGameArea.canvas.width / 2) + (Math.cos(bornAt*(Math.PI)) * (fieldRadius - playersGenWidth));
        this.y = (myGameArea.canvas.height / 2) + (Math.sin(bornAt*(Math.PI)) * (fieldRadius - playersGenWidth)); */
        this.color = `white`;
        this.bornAt = bornAt; //translation in the field. input in degrees (1rad = 57.29degrees)
        this.pace = 0.017; //increment of move in X - `speed` in X axis
        this.rotation = 0; //rotation on itself - alway facing the center - should use Math.tan??
        /* this.interBall = {IbRadius: playersGenWidth / 2, x: playersGenWidth / 2, y: playersGenHeight / 2} */
    };
  
    
    update () {
        myGameArea.ctx.fillStyle = `white`;
        myGameArea.ctx.fillRect(this.x, this.y, this.w, this.h);
        myGameArea.ctx.beginPath();
        myGameArea.ctx.arc( this.x1, this.y1, this.r, 0, 2 * Math.PI, false);
        myGameArea.ctx.fillStyle = `grey`;
        myGameArea.ctx.fill();
        myGameArea.ctx.closePath();
        /* console.log(`ola`); */
    };


    moveUp () {
        this.bornAt += this.pace;
        const newX = (myGameArea.canvas.width / 2) + (Math.cos(this.bornAt*(Math.PI)) * (fieldRadius - playersGenWidth));
        // console.log(newX);
            if (newX <= 650) {
                this.x = newX;
                this.y = (myGameArea.canvas.height / 2) + (Math.sin(this.bornAt*(Math.PI)) * (fieldRadius - playersGenWidth));
            };
        console.log(`P1moveUp`);
        console.log(this.x, this.y);
    };

    moveDown () {
        this.bornAt -= this.pace;
        const newX = (myGameArea.canvas.width / 2) + (Math.cos(this.bornAt*(Math.PI)) * (fieldRadius - playersGenWidth));
        // console.log(newX);
            if (newX <= 650) {
                this.x = newX;
                this.y = (myGameArea.canvas.height / 2) + (Math.sin(this.bornAt*(Math.PI)) * (fieldRadius - playersGenWidth));
            };
        console.log(`P1moveDown`)
        console.log(this.x, this.y);
    };  
};

//  CLASS player2 - RIGHT
class Player2 extends Player1 {
    constructor(h, w, bornAt) {
    super(h, w, bornAt);
    this.x = 990 ;
    this.y = 410 ;
    };

    moveUp () {
        this.bornAt += this.pace;
        const newX = (myGameArea.canvas.width / 2) + (Math.cos(this.bornAt*(Math.PI)) * (fieldRadius - playersGenWidth));
        // console.log(newX);
            if (newX >= 650) {
                this.x = newX;
                this.y = (myGameArea.canvas.height / 2) + (Math.sin(this.bornAt*(Math.PI)) * (fieldRadius - playersGenWidth));
            };
        // console.log(`P2moveUp`);
        // console.log(this.x, this.y);
    };

    moveDown () {
        this.bornAt -= this.pace;
        const newX = (myGameArea.canvas.width / 2) + (Math.cos(this.bornAt*(Math.PI)) * (fieldRadius - playersGenWidth));
        // console.log(newX);
            if (newX >= 650) {
                this.x = newX;
                this.y = (myGameArea.canvas.height / 2) + (Math.sin(this.bornAt*(Math.PI)) * (fieldRadius - playersGenWidth));
            };
        // console.log(`P2moveDown`)
        // console.log(this.x, this.y);
    };
}

//  CLASS ball
class Ball {
    constructor (x, y, r, stroke, strWidth, fill) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.stroke = stroke;
        this.strWidth = strWidth;
        this.fill = fill;
        this.pace = 5;
        this.angle = Math.PI; // here, the ball will always go to 180ª direction (left), at first.
    };

    drawBall() {
        myGameArea.ctx.beginPath();
        myGameArea.ctx.arc( this.x, this.y, this.r, 0, (2 * Math.PI), false);
        myGameArea.ctx.fillStyle = this.fill;
        myGameArea.ctx.fill();
        myGameArea.ctx.lineWidth = 3;
        myGameArea.ctx.strokeStyle = `black`;
        myGameArea.ctx.stroke();
        myGameArea.ctx.closePath();
    };

    //--tenho angulo e direcao - , calculamos o trajeto

    //--pto inicial e pto final - calcular (funcao linear) - prox X,Y
    //randomizar o pto final no arco "inimigo"
    // (x1 + l * cos(ang), y1 + l * sin(ang))
    // l = pace
    moveBall(angle) {
        this.x += this.pace * Math.cos(this.angle);
        this.y += this.pace * Math.sin(this.angle);
        
    };

    checkCollision() {
        let xDistBallP1 = ball.x - player1.x1;
        let yDistBallP1 = player1.y1 - ball.y;
        //
        let xDistBallP2 = player2.x1 - ball.x;
        let yDistBallP2 = player2.y1 - ball.y;
        //
        let totalDistBallP1 = Math.sqrt(Math.pow(xDistBallP1, 2) + Math.pow(yDistBallP1, 2));
        console.log(`distance to P1 ${totalDistBallP1}`);
        let totalDistBallP2 = Math.sqrt(Math.pow(xDistBallP2, 2) + Math.pow(yDistBallP2, 2));
        console.log(`distance to P2 ${totalDistBallP2}`);
        //
            if (totalDistBallP1 < this.r + player1.r) {
                this.x += this.pace * Math.cos(Math.random() * ((Math.PI * 1.75) - (Math.PI * 2.25)) + (Math.PI * 2.25)); //Math.random() * (max - min) + min;
                this.y += this.pace * Math.cos(Math.random() * ((Math.PI * 1.75) - (Math.PI * 2.25)) + (Math.PI * 2.25));
                

                this.x += Math.random()
            }
    };
    
};


// game area object and everything that may happen in it (methods)
const myGameArea = {
    canvas: document.createElement(`canvas`),
    start: function () {
        this.ctx = this.canvas.getContext(`2d`);
        this.canvas.width = 1300;
        this.canvas.height = 850;
        document.getElementById(`canvasDiv`).appendChild(this.canvas);
        updateGameArea();
    },
    clear: function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
    myGameArea.ctx.strokeStyle = `white`;
    myGameArea.ctx.stroke();
    myGameArea.ctx.closePath();
    //  drawing `invisible score line` LEFT --Not sure if we are gonna use it.
    myGameArea.ctx.beginPath();
    myGameArea.ctx.arc((myGameArea.canvas.width / 2), (myGameArea.canvas.height / 2), fieldRadius, Math.PI * 1.25, Math.PI * 0.75, true);
    myGameArea.ctx.lineWidth = 1;
    myGameArea.ctx.stroke();
    myGameArea.ctx.closePath();
    //  drawing `invisible score line` RIGHT --Not sure if we are gonna use it.
    myGameArea.ctx.beginPath();
    myGameArea.ctx.arc((myGameArea.canvas.width / 2), (myGameArea.canvas.height / 2), fieldRadius, Math.PI * 1.75, Math.PI * 2.25, false);
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
    myGameArea.ctx.strokeStyle = `white`;
    myGameArea.ctx.stroke();
    myGameArea.ctx.closePath();
};


// main elements declarations HERE
const player1 = new Player1 (50, 20, 1);
const player2 = new Player2 (50, 20, 2);
const ball = new Ball (650, 425, ballRadius, 0.5, `white`, `white`); //---this is not working properly.


////--SHOWTIME (presentation and whats the correct order of logics to happen...)

// game area updates pipeline
function updateGameArea () {
    myGameArea.clear();
    drawBattleField();
    drawMidfield();
    ball.moveBall();
    ball.drawBall();
    player1.update();
    player2.update();
    ball.checkCollision();

    requestAnimationFrame(updateGameArea);
};


////--CONTROLS ONLY (listeners...or what need to happen to control the "logics")

// player1
document.addEventListener(`keydown`, (e) => {
    switch (e.key) {
        case `a`: // letter `D`
            player1.moveUp();
            break;
        case `d`: // letter `A`
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

// player2
/* document.addEventListener(`keydown`, (e) => {
    switch (e.key) {
    }
}); */

// ball movement
document.addEventListener(`keydown`, (e) => {
    switch (e.key) {
        case `Enter`: // `Enter`
        console.log(`MoveBall`);
            ball.moveBall();
            break;
    }
});