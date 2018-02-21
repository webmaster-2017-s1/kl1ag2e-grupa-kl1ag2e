// kod projektu Gra Platformowa
//Canvas Resolutnion
var resx = 1366;
var resy = 768;

//Player position render
var px = 100;
var py = 40;

//Player position
var pposx = px - resx / 2;

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

var direction = [];

//Bullets size
var bsize = 20;
//Max number of bullets
var bmax = 10;
//Bullets speed
var bspeed = 12;
//Bullets life in seconds
var blife = 5;

var bullets = [];
//bullets[][*]
//0-X pos
//1-Y pos
//2-Size(width and height)
//3-Direction
//4-Life counter
//5-True if bullet is drawing
//6-True if bullet can take us damage
//7-Bullet speed in x position
//8-Bullet speed in y position

for (i = 0; i < bmax; i++) {
  bullets[i] = [];
  bullets[i][4] = 0;
  bullets[i][5] = false;
}

//Number of enemies
var enumber = 2;

//Enemy size
var esize = 60;

//Enemy speed
var espeed = 2;

//Every second the opponent can shoot
var ttshot = 2;

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
//5-Type of enemy
//6-Time to shot

enemies[0][0] = 650;
enemies[0][1] = 380;
enemies[0][2] = 650;
enemies[0][3] = 810;
enemies[0][4] = true;
enemies[0][5] = 0;

enemies[1][0] = 4690;
enemies[1][1] = 280;
enemies[1][2] = 4690;
enemies[1][3] = 4810;
enemies[1][4] = true;
enemies[1][5] = 1;
enemies[1][6] = 0;

var enemyimg;
var enemyimg2;

//Load Images
function preload() {
  enemyimg = loadImage('./assets/enemy.png');
  enemyimg2 = loadImage('./assets/enemy2.png');
}

function setup() {
  frameRate(60);
  createCanvas(resx, resy);
  background(200);
}

function draw() {
  background(200);
  rect(px, py, sx, sy);
  keyboardEvent();
  drawObjects();
  collision();
  drawBullets();
}

function keyboardEvent() {
  if (keyIsDown(RIGHT_ARROW)) {
    movex(1);
    direction[0] = true;
    direction[1] = false;
  }

  if (keyIsDown(LEFT_ARROW)) {
    movex(-1);
    direction[1] = true;
    direction[0] = false;
  }

  direction[2] = keyIsDown(UP_ARROW);
  direction[3] = keyIsDown(DOWN_ARROW);

  return false;
}

function keyPressed() {
  if (keyCode === 90) {
    if (!onair) {
      jcounter = 0;
      jumped = true;
    }
  }
}

function keyTyped() {
  if (key === 'x') {
    newBullet(-1);
  }
}

function drawObjects() {
  fill('#0000FF');
  for (i = 0; i < maxp[stageid]; i++) {
    rect(platforms[stageid][i][0] - spos, platforms[stageid][i][1], platforms[stageid][i][2], platforms[stageid][i][3]);
  }
  fill('#FFFFFF');
  drawEnemies();
  drawSpikes();
}

var jheight = 150;
var minx = 0;
var maxx = 99999;
var miny = 0;


function collision() {

  //TODO Optimise checking to only current rendered platforms[stageid]

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

  var bmaxx = [];
  var bminx = [];
  var bmaxy = [];
  var bminy = [];

  for (i = 0; i < bmax; i++) {
    bmaxx[i] = 999999;
    bminx[i] = 0;
    bmaxy[i] = 999999;
    bminy[i] = 0;
  }


  for (i = 0; i < maxp[stageid]; i++) {
    //***************************
    //Select platform's borders vertical
    if (px >= platforms[stageid][i][0] - spos - sx && px <= platforms[stageid][i][0] - spos + platforms[stageid][i][2]) {
      //***TOP***
      // console.log("Player pos: "+i+" platform"); //Uncomment to debug TOP BORDER collision
      if (platforms[stageid][i][1] > py) {
        if (platforms[stageid][i][1] < maxy) {
          maxy = platforms[stageid][i][1];
          maxid = i;
        }
      }
      //***BOTTOM***
      // console.log("Player pos: "+i+" platform"); //Uncomment to debug collision
      if (platforms[stageid][i][1] + platforms[stageid][i][3] < py) {
        if (platforms[stageid][i][1] + platforms[stageid][i][3] > miny) {
          miny = platforms[stageid][i][1] + platforms[stageid][i][3];
          jheight = min(miny, 150);
          minid = i;
          // console.log("Max Jump Height: "+jheight); //Uncomment to debug Max Jump Height
        }
      }
    }
    //***************************
    //Select platform's borders horizontal
    if (py >= platforms[stageid][i][1] - sy && py <= platforms[stageid][i][1] + platforms[stageid][i][3]) {
      //***LEFT***
      if (platforms[stageid][i][0] >= px + sx + pposx + (resx / 2 - px)) {
        if (platforms[stageid][i][0] < maxx) {
          maxx = platforms[stageid][i][0];
          xmaxid = i;
        }
      }
      //***RIGHT***
      if (platforms[stageid][i][0] + platforms[stageid][i][2] <= px + pposx + (resx / 2 - px)) {
        if (platforms[stageid][i][0] >= minx) {
          minx = platforms[stageid][i][0] + platforms[stageid][i][2];
          xminid = i;
        }
      }
    }

    for (j = 0; j < bmax; j++) {
      if (bullets[j][5]) {

        if (bullets[j][0] - pposx >= platforms[stageid][i][0] - pposx && bullets[j][0] - pposx <= platforms[stageid][i][0] - pposx + platforms[stageid][i][2]) {
          if (platforms[stageid][i][1] >= bullets[j][1]) {
            if (platforms[stageid][i][1] <= bmaxx[j]) {
              bmaxx[j] = platforms[stageid][i][1];
            }
          }
          if (platforms[stageid][i][1] + platforms[stageid][i][3] <= bullets[j][1]) {
            if (platforms[stageid][i][1] + platforms[stageid][i][3] >= bminx[j]) {
              bminx[j] = platforms[stageid][i][1] + platforms[stageid][i][3];
            }
          }
        }

        if (bullets[j][1] >= platforms[stageid][i][1] - bullets[j][2] / 2 && bullets[j][1] <= platforms[stageid][i][1] + platforms[stageid][i][3]) {
          if (platforms[stageid][i][0] >= bullets[j][0]) {
            if (platforms[stageid][i][0] <= bmaxy[j]) {
              bmaxy[j] = platforms[stageid][i][0];
            }
          }
          if (platforms[stageid][i][0] + platforms[stageid][i][2] <= bullets[j][0]) {
            if (platforms[stageid][i][0] >= bminy[j]) {
              bminy[j] = platforms[stageid][i][0] + platforms[stageid][i][2];
            }
          }
        }
        if (bmaxx[j] <= bullets[j][1] + bullets[j][2] / 2 || bminx[j] >= bullets[j][1] - bullets[j][2] / 2 || bmaxy[j] <= bullets[j][0] + bullets[j][2] / 2 || bminy[j] >= bullets[j][0] - bullets[j][2] / 2) bullets[j][5] = false;
        }
      }
    }


  // debugcollision(maxid, minid, xmaxid, xminid); //Uncomment to debug collision
  gravity(maxy);
  air(maxy);
  if (jumped) jump();
  lose();
  moveEnemies();
  enemiesDamage();
}


function debugcollision(maxid, minid, xmaxid, xminid) {
  fill('red');
  rect(platforms[stageid][maxid][0] - spos, platforms[stageid][maxid][1], platforms[stageid][maxid][2], platforms[stageid][maxid][3]);
  fill('green');
  if (minid !== -1) rect(platforms[stageid][minid][0] - spos, platforms[stageid][minid][1], platforms[stageid][minid][2], platforms[stageid][minid][3]);
  fill('yellow');
  if (xmaxid !== -1) rect(platforms[stageid][xmaxid][0] - spos, platforms[stageid][xmaxid][1], platforms[stageid][xmaxid][2], platforms[stageid][xmaxid][3]);
  fill('orange');
  if (xminid !== -1) rect(platforms[stageid][xminid][0] - spos, platforms[stageid][xminid][1], platforms[stageid][xminid][2], platforms[stageid][xminid][3]);
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
    //--->RIGHT
    if (pposx + sx + px + (resx / 2 - px) - 1 < maxx) {
      if (maxx - pposx - sx - px - (resx / 2 - px) < pxspeed) {
        pposx = maxx - px - sx - (resx / 2 - px) - 1;

        if (spos <= 0) px = (resx / 2 + pposx); else px = resx / 2;
        spos = max(0, pposx);
      } else {
        if (spos <= 0) px += pxspeed; else px = resx / 2;
        pposx += pxspeed;
        spos = max(0, pposx);
      }
    }
  } else {
    //<--- LEFT
    if (pposx + px + 1 + (resx / 2 - px) > minx) {
      if (pposx + px - minx + (resx / 2 - px) < pxspeed) {
        pposx = minx - px + 1 - (resx / 2 - px);
        if (spos <= 0) px = (resx / 2 + pposx);
        spos = max(0, pposx);
      } else {
        pposx -= pxspeed;
        if (spos <= 0) px = (resx / 2 + pposx);
        spos = max(0, pposx);
      }
    }
  }
}

function drawBullets() {
  for (i = 0; i < bmax; i++) {
    if (bullets[i][5]) {
      if (bullets[i][3] === 0) {
        bullets[i][0] = bullets[i][0] + bspeed;
        bullets[i][1] = bullets[i][1] - bspeed;
      } else if (bullets[i][3] === 1) {
        bullets[i][0] = bullets[i][0] + bspeed;
        bullets[i][1] = bullets[i][1] + bspeed;
      } else if (bullets[i][3] === 2) {
        bullets[i][0] = bullets[i][0] - bspeed;
        bullets[i][1] = bullets[i][1] - bspeed;
      } else if (bullets[i][3] === 3) {
        bullets[i][0] = bullets[i][0] - bspeed;
        bullets[i][1] = bullets[i][1] + bspeed;
      } else if (bullets[i][3] === 4) {
        bullets[i][0] = bullets[i][0] + bspeed;
      } else if (bullets[i][3] === 5) {
        bullets[i][0] = bullets[i][0] - bspeed;
      } else if (bullets[i][3] === 6) {
        bullets[i][0] = bullets[i][0] - bullets[i][7];
        bullets[i][1] = bullets[i][1] - bullets[i][8];
      } else if (bullets[i][3] === 7) {
        bullets[i][0] = bullets[i][0] - bullets[i][7];
        bullets[i][1] = bullets[i][1] + bullets[i][8];
      } else if (bullets[i][3] === 8) {
        bullets[i][0] = bullets[i][0] + bullets[i][7];
        bullets[i][1] = bullets[i][1] - bullets[i][8];
      } else if (bullets[i][3] === 9) {
        bullets[i][0] = bullets[i][0] + bullets[i][7];
        bullets[i][1] = bullets[i][1] + bullets[i][8];
      }
      if (bullets[i][6] === false) fill('white');
        else fill('red');
      ellipse(bullets[i][0] - spos, bullets[i][1], bullets[i][2], bullets[i][2]);
      fill('white');

      bullets[i][4]++;
      if (bullets[i][4] === 60 * blife) {
        bullets[i][5] = false;
      }
    }
  }
}

function newBullet(enumber) {
  for (i = 0; i < bmax; i++) {
    if (!bullets[i][5]) {
      if (enumber === -1) {
        bullets[i][1] = py;
        bullets[i][2] = bsize;
        if (direction[0] && direction[2]) {
          bullets[i][0] = spos + px + sx;
          bullets[i][3] = 0;
        } else if (direction[0] && direction[3]) {
          bullets[i][0] = spos + px + sx;
          bullets[i][3] = 1;
        } else if (direction[1] && direction[2]) {
          bullets[i][0] = spos + px;
          bullets[i][3] = 2;
        } else if (direction[1] && direction[3]) {
          bullets[i][0] = spos + px;
          bullets[i][3] = 3;
        } else if (direction[0]) {
          bullets[i][0] = spos + px + sx;
          bullets[i][3] = 4;
        } else if (direction[1]) {
          bullets[i][0] = spos + px;
          bullets[i][3] = 5;
        }
        bullets[i][6] = false;
      } else {
        var x = enemies[enumber][0] + (esize / 2) - px - spos;
        var y = enemies[enumber][1] - py;
        var z = Math.pow(x, 2) + Math.pow(y, 2);
        var a = z / bspeed;
        bullets[i][7] = Math.sqrt(Math.pow(x, 2) / a) * 3;
        bullets[i][8] = Math.sqrt(Math.pow(y, 2) / a) * 3;

        if (enemies[enumber][0] + (esize / 2) - px - spos > 0 && enemies[enumber][1] - py > 0) bullets[i][3] = 6;
        else if (enemies[enumber][0] + (esize / 2) - px - spos > 0 && enemies[enumber][1] - py <= 0) bullets[i][3] = 7;
        else if (enemies[enumber][0] + (esize / 2) - px - spos <= 0 && enemies[enumber][1] - py > 0) bullets[i][3] = 8;
        else if (enemies[enumber][0] + (esize / 2) - px - spos <= 0 && enemies[enumber][1] - py <= 0) bullets[i][3] = 9;

        bullets[i][0] = enemies[enumber][0] + (esize / 2);
        bullets[i][1] = enemies[enumber][1];
        bullets[i][2] = bsize;
        bullets[i][6] = true;
      }
      bullets[i][4] = 0;
      bullets[i][5] = true;
      break;
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
    if (enemies[i][5] === 0) image(enemyimg, enemies[i][0] - spos, enemies[i][1]);
      else image(enemyimg2, enemies[i][0] - spos, enemies[i][1]);
  }
  fill('#FFFFFF');
}

function enemiesDamage() {
  for (i = 0; i < enumber; i++) {
    if (enemies[i][5] === 1) {
      if (px + spos >= enemies[i][0] - 500 && px + spos <= enemies[i][0] + 500 && enemies[i][6] === 0) {
        enemies[i][6]++;
        newBullet(i);
      } else if (enemies[i][6] > 0 && enemies[i][6] < 60 * ttshot + 1) enemies[i][6]++;
        else if (enemies[i][6] === 60 * ttshot + 1) enemies[i][6] = 0;
    }
  }
}

function drawSpikes() {
  for (i = 0; i < maxs[stageid]; i++) {

    //DOWN
    if (spikes[stageid][i][2] === 0) triangle(spikes[stageid][i][0] - spos - swidth, spikes[stageid][i][1], spikes[stageid][i][0] - spos + swidth, spikes[stageid][i][1], spikes[stageid][i][0] - spos, spikes[stageid][i][1] + sheight);

    //UP
    if (spikes[stageid][i][2] === 1) triangle(spikes[stageid][i][0] - spos + swidth, spikes[stageid][i][1], spikes[stageid][i][0] - spos - swidth, spikes[stageid][i][1], spikes[stageid][i][0] - spos, spikes[stageid][i][1] - sheight);

    //LEFT
    if (spikes[stageid][i][2] === 2) triangle(spikes[stageid][i][0] - spos, spikes[stageid][i][1] + swidth, spikes[stageid][i][0] - spos, spikes[stageid][i][1] - swidth, spikes[stageid][i][0] - spos - sheight, spikes[stageid][i][1]);

    //RIGHT
    if (spikes[stageid][i][2] === 3) triangle(spikes[stageid][i][0] - spos, spikes[stageid][i][1] - swidth, spikes[stageid][i][0] - spos, spikes[stageid][i][1] + swidth, spikes[stageid][i][0] - spos + sheight, spikes[stageid][i][1]);
  }
}
