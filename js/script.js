//Canvas Resolutnion
var resx=1280;
var resy=720;

//Player position
var px=30;
var py=40;

//Player size
var sx=40;
var sy=40;


function setup() {
    createCanvas(resx,resy);
    background(200);
}

function draw() {
    background(200);
    rect(px,py,sx,sy);
    if(keyIsPressed) keyboardEvent();

}

function keyboardEvent() {
    if(keyIsDown(38)) py-=5;
    if(keyIsDown(39)) px+=5;
    if(keyIsDown(40)) py+=5;
    if(keyIsDown(37)) px-=5;

    return false;
}