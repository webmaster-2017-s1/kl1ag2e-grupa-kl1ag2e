//Arena Size
var resx = 640;
var resy = 360;

//Ball size
var ballx = 30;
var bally = 30;

//Ball position
var posx = 50;
var posy = 50;

//Move Vector
var vx = 5;
var vy = 3;

//Player 1 paddle size
var p1sx = 10;
var p1sy = 100;

//Player1 paddle position
var p1px = 0;
var p1py = resy / 2 - 50;

//Player1 paddle speed
var p1speed = 2;

//Player 2 paddle size
var p2sx = 10;
var p2sy = 100;

//Player2 paddle position
var p2px = resx - p2sx - 1;
var p2py = resy / 2;

//Player2 paddle speed
var p2speed = 2;

//Game Started
var started = false;

//Which player have ball
//Player1-false
//Player2-true
var turn = false;

//Player 1 score
var p1score = 0;

//Player 2 score
var p2score = 0;

function setup() {
    resizeCanvas(resx, resy);
    frameRate(60);
    background(200);
    textSize(50);
}

function draw() {
    background(200); //Comment to debug drawing
    if (keyIsPressed) keyboardEvent();
    moveBall();
    ellipse(posx, posy, ballx, bally);

    rect(p1px, p1py, p1sx, p1sy);
    rect(p2px, p2py, p2sx, p2sy);
    text(p1score + ":" + p2score, resx / 2 - 40, 50);

}

function moveBall() {
    // console.log(checkPos()); //Uncomment to debug position check
    if (started) {
        posx += vx;
        posy += vy;
        if (checkPos() === 1) vx *= -1;
        if (checkPos() === 2) vy *= -1;
    } else {
        if (!turn) {
            //Attach ball to Player1's paddle
            posx = p1sx + ballx / 2 + 1;
            posy = p1py + p1sy / 2;
        } else {
            //Attach ball to Player2's paddle
            posx = resx - p2sx - ballx / 2 - 1;
            posy = p2py + p2sy / 2;
        }
    }
}

function checkPos() {

    //0-POS OK
    //1-X limit
    //2-Y limit
    //TODO 3-Corner (X-Y)Limit

    if ((posx - p1sx + vx <= ballx / 2 || posx + vx + p1sx >= resx - ballx / 2) && checkIfBounced()) return 1;
    if (posy <= bally / 2 || posy >= resy - bally / 2) return 2;
    return 0;

}

function checkIfBounced() {
    //TODO  Set tolerance
    if (vx < 0) {
        //Player 1
        if ((posy < p1py) || (posy > p1py + p1sy)) {
            ballMissed(true);
            return false;
        }
    } else {
        //Player2
        if ((posy < p2py) || (posy > p2py + p2sy)) {
            ballMissed(false);
            return false;
        }
    }

    return true;

}

function ballMissed(player) {
    //Player1 true
    //Player2 false
    if (player === true) {
        p2score++;
        turn = true;

    } else {
        p1score++;
        turn = false;
    }
    started = false;
    vx *= -1;
    if (Math.floor((Math.random() * 6) % 2) === 1) vy *= -1;
    setDifficulty();

}

function keyboardEvent() {
    // console.log(keyPressed); //Uncomment to debug keyPressedKey
    if (keyIsDown(87)) {
        if (p1py > 0) p1py -= p1speed;
    }

    if (keyIsDown(83)) {
        if (p1py < resy - p1sy) p1py += p1speed;
    }
    //TODO Fix cheating by pressed spacebar key
    if (keyIsDown(32)) {
        if (!started) started = true;
    }

    if (keyIsDown(38)) {
        if (p2py > 0) p2py -= p2speed;
    }

    if (keyIsDown(40)) {
        if (p2py < resy - p2sy) p2py += p2speed;
    }

    return false;
}

function setDifficulty() {
    if ((p1score + p2score) % 5 === 0) {
        if ((p1score + p2score) % 10 === 0) {
            p1speed++;
            p2speed++;
        }
        //TODO Optimise game speed
        if (vx < 0) vx--; else vx++;
        if (vy < 0) vy--; else vy++;
        
    }
}