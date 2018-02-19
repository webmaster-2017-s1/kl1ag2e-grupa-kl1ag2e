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
  for (i = 0; i < maxp[stageid]; i++) {
    rect(platforms[stageid][i][0] - spos, platforms[stageid][i][1], platforms[stageid][i][2], platforms[stageid][i][3]);
  }
  fill('#FFFFFF');
  drawEnemies();
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


  for (i = 0; i < maxp[stageid]; i++) {
    //***************************
    //Select platform's borders vertical
    if (px >= platforms[stageid][i][0] - pposx - sx && px <= platforms[stageid][i][0] - pposx + platforms[stageid][i][2]) {
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
      if (platforms[stageid][i][0] >= px + sx + pposx) {
        if (platforms[stageid][i][0] < maxx) {
          maxx = platforms[stageid][i][0];
          xmaxid = i;
        }
      }
      //***RIGHT***
      if (platforms[stageid][i][0] + platforms[stageid][i][2] <= px + pposx) {
        if (platforms[stageid][i][0] > minx) {
          minx = platforms[stageid][i][0] + platforms[stageid][i][2];
          xminid = i;
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

function drawbullets() {
  for (i = 0; i < bmax; i++) {
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
  for (i = 0; !ready && i < bmax; i++) {
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
