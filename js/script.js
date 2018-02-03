//Canvas Resolutnion
var resx=1280;
var resy=720;

//Player position
var px=30;
var py=40;

//Player size
var sx=40;
var sy=40;

var onair = false;

//Long platform dimensions
var pnumber = 10;
//[][*]
//0-X pos
//1-Y pos
//2-Width
//3-Height


//Scene position
var spos = resx;


var platforms = [];

for (i = 0; i < pnumber; i++) {
    platforms[i] = [];
    // for(j=0;j<4;j++){
    //     platforms[i][j]=0;
    // }
}

platforms[0][0] = 2000;
platforms[0][1] = 100;
platforms[0][2] = 80;
platforms[0][3] = 20;






function setup() {

    createCanvas(resx,resy);
    background(200);
}

function draw() {
    background(200);
    rect(px,py,sx,sy);
    if(keyIsPressed) keyboardEvent();
    drawObjects();
}

function keyboardEvent() {
    if(keyIsDown(38)) py-=5;
    if (keyIsDown(39)) spos += 5;
    if(keyIsDown(40)) py+=5;
    if (keyIsDown(37)) spos -= 5;

    return false;
}

function drawObjects() {


    rect(platforms[0][0] - spos, platforms[0][1], platforms[0][2], platforms[0][3]);


}


function gravity() {

}