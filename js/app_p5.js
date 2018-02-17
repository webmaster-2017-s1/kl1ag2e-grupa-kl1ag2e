// kod projektu Gra Platformowa
//Canvas Resolutnion
var resx = 1366;
var resy = 768;

//Player position render
var px = resx / 2;
var py = 40;

//Player position

var pposx = 0;

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
var maxjh = 310;
//Jump speed
var jspeed = 20;


//Scene position
var spos = 0;

//Gravity
var grav = 7;

//Platform number
var pnumber = 56;
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

// platforms[0][0] = 0;
// platforms[0][1] = resy - 20;
// platforms[0][2] = 20000;
// platforms[0][3] = 20;

 platforms[1][0] = 30;
 platforms[1][1] = 370;
 platforms[1][2] = 320;
 platforms[1][3] = 50;

 platforms[2][0] = 1790;
 platforms[2][1] = 210;
 platforms[2][2] = 230;
 platforms[2][3] = 30;

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

 platforms[7][0] = 1500;
 platforms[7][1] = 240;
 platforms[7][2] = 520;
 platforms[7][3] = 70;

 platforms[8][0] = 2240;
 platforms[8][1] = 410
 platforms[8][2] = 610;
 platforms[8][3] = 70;

 platforms[9][0] = 2480;
 platforms[9][1] = 350;
 platforms[9][2] = 100;
 platforms[9][3] = 60;

 platforms[10][0] = 2620;
 platforms[10][1] = 350;
 platforms[10][2] = 100;
 platforms[10][3] = 60;

 platforms[11][0] = 2990;
 platforms[11][1] = 240;
 platforms[11][2] = 50;
 platforms[11][3] = 180;

 platforms[12][0] = 3280;
 platforms[12][1] = 400;
 platforms[12][2] = 100;
 platforms[12][3] = 100;

 platforms[13][0] = 2990;
 platforms[13][1] = 240;
 platforms[13][2] = 50;
 platforms[13][3] = 180;


 platforms[14][0] = 3610;
 platforms[14][1] = 450;
 platforms[14][2] = 320;
 platforms[14][3] = 40;

 platforms[15][0] = 3730;
 platforms[15][1] = 330;
 platforms[15][2] = 70;
 platforms[15][3] = 120;

 platforms[16][0] = 3870;
 platforms[16][1] = 280;
 platforms[16][2] = 60;
 platforms[16][3] = 170;

 platforms[17][0] = 4060;
 platforms[17][1] = 330;
 platforms[17][2] = 10;
 platforms[17][3] = 150;

 platforms[18][0] = 4140;
 platforms[18][1] = 430;
 platforms[18][2] = 40;
 platforms[18][3] = 10;

 platforms[19][0] = 4350;
 platforms[19][1] = 330;
 platforms[19][2] = 30;
 platforms[19][3] = 150;

 platforms[20][0] = 4380;
 platforms[20][1] = 450;
 platforms[20][2] = 70;
 platforms[20][3] = 30;

 platforms[21][0] = 4510;
 platforms[21][1] = 580;
 platforms[21][2] = 10;
 platforms[21][3] = 60;

 platforms[22][0] = 4680;
 platforms[22][1] = 470;
 platforms[22][2] = 10;
 platforms[22][3] = 90;

 platforms[23][0] = 4640;
 platforms[23][1] = 560;
 platforms[23][2] = 90;
 platforms[23][3] = 20;

 platforms[24][0] = 4690;
 platforms[24][1] = 340;
 platforms[24][2] = 120;
 platforms[24][3] = 20;

 platforms[25][0] = 4840;
 platforms[25][1] = 250;
 platforms[25][2] = 20;
 platforms[25][3] = 90;

 platforms[26][0] = 4940;
 platforms[26][1] = 510;
 platforms[26][2] = 60;
 platforms[26][3] = 10;

 platforms[27][0] = 5090;
 platforms[27][1] = 410;
 platforms[27][2] = 20;
 platforms[27][3] = 110;

 platforms[28][0] = 5110;
 platforms[28][1] = 410;
 platforms[28][2] = 80;
 platforms[28][3] = 20;

 platforms[29][0] = 5170;
 platforms[29][1] = 320;
 platforms[29][2] = 20;
 platforms[29][3] = 90;

 platforms[30][0] = 5290;
 platforms[30][1] = 470;
 platforms[30][2] = 10;
 platforms[30][3] = 70;

 platforms[31][0] = 5370;
 platforms[31][1] = 360;
 platforms[31][2] = 10;
 platforms[31][3] = 190;

 platforms[32][0] = 5430;
 platforms[32][1] = 300;
 platforms[32][2] = 40;
 platforms[32][3] = 10;

 platforms[33][0] = 5500;
 platforms[33][1] = 360;
 platforms[33][2] = 10;
 platforms[33][3] = 50;

 platforms[34][0] = 5520;
 platforms[34][1] = 550;
 platforms[34][2] = 30;
 platforms[34][3] = 10;

 platforms[35][0] = 5620;
 platforms[35][1] = 550;
 platforms[35][2] = 10;
 platforms[35][3] = 20;

 platforms[36][0] = 5640;
 platforms[36][1] = 410;
 platforms[36][2] = 10;
 platforms[36][3] = 160;

 platforms[37][0] = 5760;
 platforms[37][1] = 500;
 platforms[37][2] = 300;
 platforms[37][3] = 10;

 platforms[38][0] = 6100;
 platforms[38][1] = 400;
 platforms[38][2] = 300;
 platforms[38][3] = 10;

//True if bullets[i][5] in loop is false
var ready = false;
//Bullets size
var bsize = 20;
//Max number of bullets
var bmax = 10;
//Bullets speed in X position
var bspeedx = 12;
//Bullets speed in Y position
var bspeedy = 2;
//Bullets life in seconds
var blife = 5;
//Height from the place of rendering on which the ball begins to fall
var heightc = 20;
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
//7-maxy
//8-miny
//9-maxx
//10-minx

for (i = 0; i < bmax; i++) {
    bullets[i] = [];
    bullets[i][4] = 0;
    bullets[i][5] = false;
    bullets[i][6] = false;
    bullets[i][7] = 999999;
    bullets[i][8] = 0;
    bullets[i][9] = 999999;
    bullets[i][10] = 0;
}


//Number of enemies
var enumber = 1;

//Enemy size
var esize = 60;

//Enemy speed
var espeed = 2;

var enemies = [];

for (i = 0; i < enumber; i++) {
  enemies[i] = [];
}

//Enemies[][*]
//0-Current x-pos
//1-y pos
//2-Min x-pos
//3-Max x-pos
//4-Direction
//**false left <---
//**true right --->

enemies[0][0] = 650;
enemies[0][1] = 380;
enemies[0][2] = 650;
enemies[0][3] = 810;
enemies[0][4] = true;

var enemyimg;

//Load Images
function preload() {
  enemyimg = loadImage('./assets/enemy.png');
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
  drawBullets();
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
    newBullet();
  }
}

function drawObjects() {
  fill('#0000FF');
  for (i = 0; i < pnumber; i++) {
    rect(platforms[i][0] - spos, platforms[i][1], platforms[i][2], platforms[i][3]);
  }
  fill('#FFFFFF');
  drawEnemies();
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



    for (j=0; j < bmax; j++) {
      if (bullets[j][5]) {

        if (bullets[j][0] - pposx >= platforms[i][0] - pposx && bullets[j][0] - pposx <= platforms[i][0] - pposx + platforms[i][2]){
          if (platforms[i][1] >= bullets[j][1]) {
            if (platforms[i][1] <= bullets[j][7]) {
              bullets[j][7] = platforms[i][1];
            }
          }
          if (platforms[i][1] + platforms[i][3] <= bullets[j][1]) {
            if (platforms[i][1] + platforms[i][3] >= bullets[j][8]) {
              bullets[j][8] = platforms[i][1] + platforms[i][3];
            }
          }
        } else {
          bullets[j][7] = 999999;
          bullets[j][8] = 0;
        }

        if (bullets[j][1] >= platforms[i][1] - bullets[j][2] / 2 && bullets[j][1] <= platforms[i][1] + platforms[i][3]) {
          if (platforms[i][0] >= bullets[j][0]) {
            if (platforms[i][0] <= bullets[j][9]) {
              bullets[j][9] = platforms[i][0];
            }
          }
          if (platforms[i][0] + platforms[i][2] <= bullets[j][0]) {
            if (platforms[i][0] >= bullets[j][10]) {
              bullets[j][10] = platforms[i][0] + platforms[i][2];
            }
          }
        } else {
          bullets[j][9] = 999999;
          bullets[j][10] = 0;
        }

        if (bullets[j][7] <= bullets[j][1] + bullets[j][2] / 2) {
          bullets[j][5] = false;
          bullets[j][7] = 999999;
        } else if (bullets[j][8] >= bullets[j][1] - bullets[j][2] / 2) {
            bullets[j][5] = false;
            bullets[j][8] = 0;
          } else if (bullets[j][9] <= bullets[j][0] + bullets[j][2] / 2) {
              bullets[j][5] = false;
              bullets[j][9] = 999999;
            } else if (bullets[j][10] >= bullets[j][0] - bullets[j][2] / 2){
                bullets[j][5] = false;
                bullets[j][10] = 0;
              }
      }
    }
  }


  debugcollision(maxid, minid, xmaxid, xminid);
  gravity(maxy);
  air(maxy);
  if (jumped) jump();
  lose();
  moveEnemies();
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
    // console.log(maxx - pposx - sx - px);
    // console.log(pposx + px + sx, maxx);
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

function drawBullets() {
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
          bullets[i][5] = false;
        }
      }
    }
  }

function newBullet() {
    ready = false;
    for (i=0; !ready && i < bmax; i++) {
      if (!bullets[i][5]) {
        ready = true;
        bullets[i][1] = py;
        bullets[i][2] = bsize;
        bullets[i][3] = 0;
        bullets[i][4] = 0;
        bullets[i][5] = true;
        if (right) {
          bullets[i][0] = pposx + px + sx - bullets[i][2];
          bullets[i][6] = true;
        } else {
          bullets[i][0] = pposx + px + bullets[i][2];
          bullets[i][6] = false;
        }
      }
    }
  }

function lose() {
  if (py + sy >= resy) {
    textSize(50);
    fill('#FF0000');
    text("GAME OVER", resx / 2, resy / 2);
    fill('#FFFFFF');
  }
}

function moveEnemies() {
  for (i = 0; i < enumber; i++) {
    //Check enemy direction
    if (enemies[i][4]) {
      //Right--->
      if (enemies[i][3] - enemies[i][0] - esize <= espeed) {
        enemies[i][0] = enemies[i][3] - esize;
        enemies[i][4] = false;
      } else {
        enemies[i][0] += espeed;
      }

    }
    else {
      //Left <---
      if (enemies[i][0] - enemies[i][2] <= espeed) {
        enemies[i][0] = enemies[i][2];
        enemies[i][4] = true;
      } else {
        enemies[i][0] -= espeed;
      }

    }

  }

}

function drawEnemies() {
  fill('gold');
  for (i = 0; i < enumber; i++) {
    image(enemyimg, enemies[i][0] - pposx, enemies[i][1]);
  }
  fill('#FFFFFF');
}
