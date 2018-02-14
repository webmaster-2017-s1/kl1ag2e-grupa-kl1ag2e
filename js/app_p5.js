// kod projektu Gra Platformowa
//Canvas Resolutnion
var resx = 1366;
var resy = 768;

//Player position render
var px = resx / 2;
var py = 40;

//Player position

var pposx =  0;

//Player speed

var pxspeed = 7;


//Player size
var sx = 50;
var sy = 50;

var onair = false;

//True if player rise
var jumped = false;
//Jump counter;
var jcounter = 0;
//Max Jump Height
var maxjh = 500;
//Jump speed
var jspeed = 30;


//Scene position
var spos = 0;

//Gravity
var grav = 7;

//Platform number
var pnumber = 10;
//Platforms' dimensions
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

platforms[1][0] = 30;
platforms[1][1] = 370;
platforms[1][2] = 320;
platforms[1][3] = 50;

platforms[2][0] = 2500;
platforms[2][1] = 444;
platforms[2][2] = 384;
platforms[2][3] = 108;

platforms[3][0] = 240;
platforms[3][1] = 280;
platforms[3][2] = 270;
platforms[3][3] = 70;

platforms[4][0] = 650;
platforms[4][1] = 440;
platforms[4][2] = 160;
platforms[4][3] = 70;

platforms[5][0] = 990;
platforms[5][1] = 390;
platforms[5][2] = 320;
platforms[5][3] = 50;

platforms[6][0] = 1200;
platforms[6][1] = 290;
platforms[6][2] = 90;
platforms[6][3] = 100;

//True if bullets[i][5] in loop is false
var ready = false;
//Bullets size
var bsize = 20;
//Max number of bullets
var bmax = 10;
//Bullets speed in X position
var bspeedx = 6;
//Bullets speed in Y position
var bspeedy = 1;
//Bullets life in seconds
var blife = 5;
//Height from the place of rendering on which the ball begins to fall
var heightc = 50;
//True if bullet is to go the right
var right = true;

var bullets = [];
//bullets[][*]
//0-X pos
//1-Y pos
//2-Size(width and height)
//3-Height from the place of rendering
//4-Life counter
//5-True if bullet is drawing
//6-True if bullet is go to the right

for (i = 0; i < bmax; i++) {
    bullets[i] = [];
    bullets[i][4] = 0;
    bullets[i][5] = false;
    bullets[i][6] = false;
}


function setup() {
  frameRate(60);
  createCanvas(resx, resy);
  background(200);
}

function draw() {
  background(200);
  rect(px, py, sx, sy);
  if (keyIsPressed) keyboardEvent();
  drawObjects();
  collision();
  drawbullets();
}

function keyboardEvent() {
    if (keyIsDown(39)) {
        // spos += 5;
        // pposx = spos;
        movex(1);
        right = true;
    }
    if (keyIsDown(40)) py += 5;

    if (keyIsDown(37)) {
        // spos -= 5;
        // pposx = spos;
        movex(-1);
        right = false;
    }

    return false;
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    if (!onair) {
      jcounter = 0;
      jumped = true;
    }
  }
}

function keyTyped() {
  if (key === 's') {
    newbullet();
  }
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
var miny = 0;


function collision() {

  //TODO Optimise checking to only current rendered platforms

  //Maximum player position Y-AXIS
  var maxy = 999999;
  //(FOR DEBUG)Maximum platform Y-AXIS
  var maxid = 0;

  //TODO Optimise checking while jump
  //Minimum player position Y-AXIS
  miny = 0;
  //(FOR DEBUG)Minimum platform Y-AXIS
  var minid = -1;

  maxx = 999999;

  var xmaxid = -1;


  minx = 0;
  var xminid = -1;


  for (i = 0; i < pnumber; i++) {
    //***************************
    //Select platform's borders vertical
    if (px >= platforms[i][0] - pposx - sx && px <= platforms[i][0] - pposx + platforms[i][2]) {
      //***TOP***
      // console.log("Player pos: "+i+" platform"); //Uncomment to debug TOP BORDER collision
      if (platforms[i][1] > py) {
        if (platforms[i][1] < maxy) {
          maxy = platforms[i][1];
          maxid = i;
        }
      }
      //***BOTTOM***
      // console.log("Player pos: "+i+" platform"); //Uncomment to debug collision
      if (platforms[i][1] + platforms[i][3] < py) {
        if (platforms[i][1] + platforms[i][3] > miny) {
          miny = platforms[i][1] + platforms[i][3];
          jheight = min(miny, 150);
          minid = i;
          // console.log("Max Jump Height: "+jheight); //Uncomment to debug Max Jump Height
        }
      }
    }
    //***************************
    //Select platform's borders horizontal
    if (py >= platforms[i][1] - sy && py <= platforms[i][1] + platforms[i][3]) {
      //***LEFT***
      if (platforms[i][0] >= px + sx + pposx) {
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
  air(maxy);
  if (jumped) jump();
}


function debugcollision(maxid, minid, xmaxid, xminid) {
  fill('red');
  rect(platforms[maxid][0] - spos, platforms[maxid][1], platforms[maxid][2], platforms[maxid][3]);
  fill('green');
  if (minid !== -1) rect(platforms[minid][0] - spos, platforms[minid][1], platforms[minid][2], platforms[minid][3]);
  fill('yellow');
  if (xmaxid !== -1) rect(platforms[xmaxid][0] - spos, platforms[xmaxid][1], platforms[xmaxid][2], platforms[xmaxid][3]);
  fill('orange');
  if (xminid !== -1) rect(platforms[xminid][0] - spos, platforms[xminid][1], platforms[xminid][2], platforms[xminid][3]);
  fill('white');

}

function gravity(maxy) {

  if (maxy - 1 > py + sy) {
    if (maxy - 1 > py + sy + grav)
      py += grav;
    else
      py = maxy - sy - 1;

  }
}

function air(maxy) {
  onair = py + sy + grav < maxy;
}

function jump() {
  //TODO Optimise this section(if possible)
  if (jumped && jcounter < maxjh - jspeed) {
    if (miny + 1 < py - jspeed) {
      py -= jspeed;
      jcounter += jspeed;
    } else {
      py = miny + 1;
      jumped = false;
    }
  } else jumped = false;


}

function movex(vector) {
  if (vector === 1) {
    // console.log(pposx + sx + px + 4 ,"",maxx); //Uncoment to debug position
    console.log(maxx - pposx - sx - px);
    console.log(pposx + px + sx, maxx);
    if (pposx + sx + px - 1 < maxx) {
      if (maxx - pposx - sx - px < pxspeed) {
        pposx = maxx - px - sx - 1;
        spos = pposx;
      } else {
        pposx += pxspeed;
        spos = pposx;
      }
    }
  } else {
    // console.log(pposx + px - minx ,"",minx); //Uncoment to debug position
    if (pposx + px + 1 > minx) {
      if (pposx + px - minx < pxspeed) {
        pposx = minx - px + 1;
        spos = pposx;
      } else {
        pposx -= pxspeed;
        spos = pposx;
      }
    }

  }

}

function drawbullets() {
    for (i=0; i < bmax; i++) {
      if (bullets[i][5]) {
        if (bullets[i][3] <= heightc) {
          bullets[i][3]++;
          bullets[i][1] = bullets[i][1] - bspeedy;
        } else {
          bullets[i][1] = bullets[i][1] + bspeedy;
        }
        if (bullets[i][6]) bullets[i][0] = bullets[i][0] + bspeedx;
          else bullets[i][0] = bullets[i][0] - bspeedx;
        ellipse(bullets[i][0] - pposx, bullets[i][1], bullets[i][2], bullets[i][2]);

        bullets[i][4]++;
        if (bullets[i][4] === 60 * blife) {
          bullets[i][4] = 0;
          bullets[i][5] = false;
        }
      }
    }
  }

function newbullet() {
    ready = false;
    for (i=0; !ready && i < bmax; i++) {
      if (!bullets[i][5]) {
        ready = true;
        bullets[i][1] = py;
        bullets[i][2] = bsize;
        bullets[i][3] = 0;
        bullets[i][5] = true;
        if (right) {
          bullets[i][0] = pposx + px + sx;
          bullets[i][6] = true;
        } else {
          bullets[i][0] = pposx + px;
          bullets[i][6] = false;
        }
      }
   }
}
