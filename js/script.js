//Canvas Resolutnion
var resx = 1600;
var resy = 900;

//Player position render
var px = resx / 2;
var py=40;

//Player position

var pposx = resx / 2;


//Player size
var sx = 50;
var sy = 50;

var onair = false;

//Long platform dimensions
var pnumber = 3;
//[][*]
//0-X pos
//1-Y pos
//2-Width
//3-Height


//Scene position
var spos = resx / 2;


var platforms = [];

for (i = 0; i < pnumber; i++) {
    platforms[i] = [];
    // for(j=0;j<4;j++){
    //     platforms[i][j]=0;
    // }
}

platforms[0][0] = 0;
platforms[0][1] = resy - 20;
platforms[0][2] = 20000;
platforms[0][3] = 20;

platforms[1][0] = 2500;
platforms[1][1] = 550;
platforms[1][2] = 250;
platforms[1][3] = 50;

platforms[2][0] = 2600;
platforms[2][1] = 450;
platforms[2][2] = 250;
platforms[2][3] = 50;



function setup() {

    createCanvas(resx,resy);
    background(200);
}

function draw() {
    background(200);
    rect(px,py,sx,sy);
    if(keyIsPressed) keyboardEvent();
    drawObjects();
    collision();
}

function keyboardEvent() {
    if(keyIsDown(38)) py-=5;
    if (keyIsDown(39)) {
        spos += 5;
        pposx = spos;
    }
    if(keyIsDown(40)) py+=5;
    if (keyIsDown(37)) {
        spos -= 5;
        pposx = spos;
    }

    return false;
}

function drawObjects() {
    fill('#0000FF');
    for (i = 0; i < pnumber; i++) {
        rect(platforms[i][0] - spos, platforms[i][1], platforms[i][2], platforms[i][3]);
    }
    fill('#FFFFFF');

}

function collision() {
    //Check if  player upward platform

    //Minimum platform posy >=py

    var miny = 9999;
    var maxid = 0;


    for (i = 0; i < pnumber; i++) {
        //Select platform borders
        if (px >= platforms[i][0] - pposx && px + sx <= platforms[i][0] - pposx + platforms[i][2]) {
            // console.log("Player pos: "+i+" platform"); //Uncomment to debug collision
            if (platforms[i][1] > py) {
                if (platforms[i][1] < miny) {
                    miny = platforms[i][1];
                    maxid = i;
                }
            }
        }
    }
    debugcollision(maxid);

}


function debugcollision(maxid) {
    fill('red');
    rect(platforms[maxid][0] - spos, platforms[maxid][1], platforms[maxid][2], platforms[maxid][3]);
    fill('white');

}