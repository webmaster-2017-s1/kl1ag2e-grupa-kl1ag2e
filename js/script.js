//Canvas Resolutnion
var resx = 1600;
var resy = 900;

//Player position render
var px = resx / 2;
var py = 40;

//Player position

var pposx = resx / 2;

//Player speed

var pspeed = 15;


//Player size
var sx = 50;
var sy = 50;

var onair = false;

//Scene position
var spos = resx / 2;

//Gravity
var grav = 5;

//Long platform dimensions
var pnumber = 4;
//[][*]
//0-X pos
//1-Y pos
//2-Width
//3-Height

var platforms = [];

for (i = 0; i < pnumber; i++) {
    platforms[i] = [];
}

platforms[0][0] = 0;
platforms[0][1] = resy - 20;
platforms[0][2] = 20000;
platforms[0][3] = 20;

platforms[1][0] = 2500;
platforms[1][1] = 650;
platforms[1][2] = 250;
platforms[1][3] = 100;

platforms[2][0] = 2600;
platforms[2][1] = 550;
platforms[2][2] = 250;
platforms[2][3] = 50;

platforms[3][0] = 2800;
platforms[3][1] = 650;
platforms[3][2] = 250;
platforms[3][3] = 100;


function setup() {

    createCanvas(resx, resy);
    background(200);
}

function draw() {
    background(200);
    rect(px, py, sx, sy);
    if (keyIsPressed) keyboardEvent();
    drawObjects();
    collision();
}

function keyboardEvent() {
    if (keyIsDown(38)) py -= jheight;
    if (keyIsDown(39)) {
        // spos += 5;
        // pposx = spos;
        movex(1);
    }
    if (keyIsDown(40)) py += 5;

    if (keyIsDown(37)) {
        // spos -= 5;
        // pposx = spos;
        movex(-1);
    }

    return false;
}

function keyTyped() {
    if (key === 'W') py -= jheight;
}

function drawObjects() {
    fill('#0000FF');
    for (i = 0; i < pnumber; i++) {
        rect(platforms[i][0] - spos, platforms[i][1], platforms[i][2], platforms[i][3]);
    }
    fill('#FFFFFF');

}

var jheight = 150;
var minx = 0;
var maxx = 99999;


function collision() {

    //TODO Optimise checking to only current rendered platforms

    //Maximum player position Y-AXIS
    var maxy = 999999;
    //(FOR DEBUG)Maximum platform Y-AXIS
    var maxid = 0;

    //TODO Optimise checking while jump
    //Minimum player position Y-AXIS
    var miny = 0;
    //(FOR DEBUG)Minimum platform Y-AXIS
    var minid = -1;

    maxx = 999999;

    var xmaxid = -1;
    //TODO Add consts to keep player size

    minx = 0;
    var xminid = -1;


    for (i = 0; i < pnumber; i++) {
        //***************************
        //Select platform's borders vertical
        if (px >= platforms[i][0] - pposx && px + sx <= platforms[i][0] - pposx + platforms[i][2]) {
            //***TOP***
            // console.log("Player pos: "+i+" platform"); //Uncomment to debug TOP BORDER collision
            if (platforms[i][1] > py + 50) {
                if (platforms[i][1] < maxy) {
                    maxy = platforms[i][1];
                    maxid = i;
                }
            }
            //***BOTTOM***
            // console.log("Player pos: "+i+" platform"); //Uncomment to debug collision
            if (platforms[i][1] < py - 50) {
                if (platforms[i][1] > miny) {
                    miny = platforms[i][1];
                    jheight = min(py - platforms[i][1] - 50, 150);
                    minid = i;
                    // console.log("Max Jump Height: "+jheight); //Uncomment to debug Max Jump Height
                }
            }
        }
        //***************************
        //Select platform's borders horizontal
        if (py >= platforms[i][1] && py + sy <= platforms[i][1] + platforms[i][3]) {
            //***LEFT***
            if (platforms[i][0] >= px + 50 + pposx) {
                if (platforms[i][0] < maxx) {
                    maxx = platforms[i][0];
                    xmaxid = i;
                }
            }
            //***RIGHT***
            if (platforms[i][0] + platforms[i][2] <= px + pposx) {
                if (platforms[i][0] > minx) {
                    minx = platforms[i][0] + platforms[i][2];
                    xminid = i;
                }
            }
        }
    }


    debugcollision(maxid, minid, xmaxid, xminid);
    gravity(maxy);
}


function debugcollision(maxid, minid, xmaxid, xminid) {
    fill('red');
    rect(platforms[maxid][0] - spos, platforms[maxid][1], platforms[maxid][2], platforms[maxid][3]);
    fill('green');
    if (minid !== -1) rect(platforms[minid][0] - spos, platforms[minid][1], platforms[minid][2], platforms[minid][3]);
    fill('yellow');
    if (xmaxid !== -1) rect(platforms[xmaxid][0] - spos, platforms[xmaxid][1], platforms[xmaxid][2], platforms[xmaxid][3]);
    fill('black');
    if (xminid !== -1) rect(platforms[xminid][0] - spos, platforms[xminid][1], platforms[xminid][2], platforms[xminid][3]);
    fill('white');

}

function gravity(maxy) {

    if (maxy > py + 50 + grav) {
        py += py % grav;
        py += 5;
    }
}

function jump() {


}

function movex(vector) {
    if (vector === 1) {
        // console.log(pposx + sx + px + 4 ,"",maxx); Uncoment to debug position
        if (pposx + sx + px + 4 < maxx) {
            if (maxx - pposx - sx - px <= 4) {
                spos = maxx;
                pposx = spos;
            } else {
                spos += 4;
                pposx = spos;
            }
        }
    } else {
        // console.log(pposx + px - 4 ,"",minx); Uncoment to debug position
        if (pposx + px - 4 > minx) {
            if (minx - pposx - px >= 4) {
                spos = minx;
                pposx = spos;
            } else {
                spos -= 4;
                pposx = spos;
            }
        }

    }

}