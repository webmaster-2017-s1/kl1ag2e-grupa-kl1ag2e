// kod projektu Gra Platformowa
//Canvas Resolutnion
var resx = 1366;
var resy = 768;

//Player position render
var px = 100;
var py = 40;

//Player position
var pposx = 100;

//Player speed

var pxspeed = 7;

//Player size
var sx = 50;
var sy = 50;

//Last platform pos;
var lastp = 0;

//Player life points
var plifep = 3;
//True if player can't get damage
//False if player can get damage
var nodamage = false;
//No damage counter
var ndcounter = 0;

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
direction[0] = true;

//Bullets size
var bsize = 12;
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

//Loop variables
var i = 0;
var j = 0;

//Start rendering platforms from rstart platform
var rstart = 0;

//Start collision checking platforms from cstart platform;
var cstart = 0;

//Spikes' render and collision starting spike
var sstart = 0;
//True if game is paused(PRESS SPACE to Continue)
var paused = false;

var inmenu = true;

//***Inmenu Buttons
//Buttons' X-pos
var btnx = 483;
//Buttons' width
var btnwidth = 400;
//Buttons' height
var btnheight = 75;
//Buttons' Y-pos
var btny = [300, 400, 500, 600];
//Buttons' Text
var btntext = ['New Game', 'Continue', 'Tutorial', 'Credits'];
//Active button id
var btnid = 0;

//True if Stage is Completed
var completed = false;


for (i = 0; i < bmax; i++) {
  bullets[i] = [];
  bullets[i][4] = 0;
  bullets[i][5] = false;
}

//Enemy size
var esize = 60;

//Enemy speed
var espeed = 2;

//Every second the opponent can shoot
var ttshot = 2;

var minutes = 3;
var seconds = 0;
var tcounter = 0;
var maxtime = minutes * 60 + seconds;

//Number of shot
var noshot = 0;
var score = [];

var drawingenemies = [];
for (l = 0; l < 3; l++) drawingenemies[l] = [];

var enemiesCounter = -1;

//Images
var enemyimg;
var enemyimg2;
var livebar;
var bar1;
var bar2;
var heart;
var pistol = [];

//Load Images
function preload() {
  enemyimg = loadImage('./assets/enemy.png');
  enemyimg2 = loadImage('./assets/enemy2.png');
  livebar = loadImage('./assets/livebar.png');
  bar1 = loadImage('./assets/bar1.png');
  bar2 = loadImage('./assets/bar2.png');
  heart = loadImage('./assets/heart.png');
  pistol[0] = loadImage('./assets/pistol.png');
  pistol[1] = loadImage('./assets/pistol2.png');
  pistol[2] = loadImage('./assets/pistol3.png');
  pistol[3] = loadImage('./assets/pistol4.png');
  pistol[4] = loadImage('./assets/pistol5.png');
  pistol[5] = loadImage('./assets/pistol6.png');
}

function setup() {
  frameRate(60);
  createCanvas(resx, resy);
  background(200);
}

function draw() {
  keyboardEvent();
  if (inmenu) menu(); else game();

}

function mouseClicked() {
  menuSelection(checkMousePos());
}

function newGame() {
  restartGame();
  inmenu = false;
}

function continueGame() {
  if (getLastLevel() > 0) {
    stageid = getLastLevel();
    restartGame();
    inmenu = false;
  }
}

function getLastPlatform() {
  return platforms[stageid][maxp[stageid] - 1][0] + platforms[stageid][maxp[stageid] - 1][2] - resx / 2 - 50;
}

function menu() {

  checkMousePos();
  background(200);
  textSize(50);
  textStyle(BOLD);


  fill("#000000");
  text("Platformer Game", 483, 100);

  drawButtons(btnid);
  textStyle(NORMAL);

}

function menuSelection(a) {
  if (inmenu) {
    switch (a) {
      case 0:
        //New Game
        newGame();
        break;
      case 1:
        //Continue
        continueGame();
        break;
      case 2:
        //Tutorial
        // stageid = 2;
        // inmenu = false;
        break;
      case 3:
        //Credits
        break;
    }
  }
}

function drawButtons(btnid) {

  textSize(30);
  for (i = 0; i < btny.length; i++) {
    if (btnid === i) fill("#00FF00"); else fill("#FFFFFF");
    rect(btnx, btny[i], btnwidth, btnheight);
    fill("#000000");
    text(btntext[i], btnx + 60, btny[i] + 50);
    fill("#FFFFFF");
  }
}

function checkMousePos() {
  //Check button vertical
  //Refresh cursor status
  cursor(ARROW);
  if (mouseX >= btnx && mouseX <= btnx + btnwidth) {
    for (i = 0; i < btny.length; i++) {
      if (mouseY >= btny[i] && mouseY <= btny[i] + btnheight) {
        cursor(HAND);
        btnid = i;
        return i;
      }
    }

  }
  return -1;
}

function writeLastLevel() {
  //Write Last Level to Cookie
  document.cookie = "level=" + stageid + "; expires=Sat, 17 Aug 2019 10:45:00 UTC+01:00";
}

function getLastLevel() {
  var id;
  var cookie = document.cookie;

  for (i = 0; i < cookie.length; i++) {
    //Check cookie "level"
    if ((cookie.charAt(i) === 'l') && (cookie.charAt(i + 2) === 'v') && (cookie.charAt(i + 4) === 'l')) {
      id = parseInt(cookie.charAt(i + 6));
      return id;
    }
  }
  return -1;
}

function game() {
  if (!(completed || paused)) {
    background(200);
    drawObjects();
    collision();
  } else if (completed) stageCompleted(); else pause();
}

function pause() {
  textSize(50);
  fill("#00FF00");
  text("WIP. Press Space to Continue :)", 50, 50);
  fill('#FFFFFF');
}

function stageCompleted() {
  textSize(50);
  fill('#000000');
  text("Congratulations!!!", 500, 100);
  text("Your score:", 575, 175);
  text(score, 640, 250);
  text("Level " + (stageid + 1) + " Completed", 500, 400);
  text("Press SPACE to Continue", 500, 700);
  fill('#FFFFFF');
}

function keyboardEvent() {
  if (keyIsDown(RIGHT_ARROW) && !paused) {
    movex(1);
    direction[0] = true;
    direction[1] = false;
  }

  if (keyIsDown(LEFT_ARROW) && !paused) {
    movex(-1);
    direction[1] = true;
    direction[0] = false;
  }

  direction[2] = keyIsDown(UP_ARROW);
  direction[3] = keyIsDown(DOWN_ARROW);

  return false;
}

function keyPressed() {
  //Z-JUMP
  if (keyCode === 90 && !paused) {
    if (!onair) {
      jcounter = 0;
      jumped = true;
    }
  }
  //X-Shoot
  if (keyCode === 88) {
    newBullet(-1);
  }

  //SPACE
  if (keyCode === 32) {
    if (completed) {
      stageid++;
      completed = false;
      restartGame();
    } else if (!inmenu) paused = !paused;
  }
  //Enter Pressed
  if (keyCode === 13 && inmenu) {
    menuSelection(btnid);
  }
  //UP_ARROW Pressed
  if (keyCode === 38 && inmenu && btnid > 0) {
    btnid--;
  }
  //DOWN_ARROW Pressed
  if (keyCode === 40 && inmenu && btnid < 3) {
    btnid++;
  }
}

function keyReleased() {
  if (keyCode === 90) {
    jumped = false;
  }
}

function drawObjects() {
  drawPlayer();
  drawPlatforms();
  drawEnemies();
  drawSpikes();
  drawBullets();
  drawHUD();
}

function drawPlayer() {
  if (!nodamage) {
    rect(px, py, sx, sy);
    if (direction[0] && direction[2]) {
     image(pistol[1], px + 25, py);
    } else if (direction[0] && direction[3]) {
      image(pistol[2], px + 25, py + 20);
    } else if (direction[1] && direction[2]) {
      image(pistol[4], px - 12, py);
    } else if (direction[1] && direction[3]) {
      image(pistol[5], px - 7, py + 20);
    } else if (direction[0]) {
      image(pistol[0], px + 25, py + 20);
    } else if (direction[1]) {
      image(pistol[3], px - 19, py + 20);
    }
  }
  else noDamage();
}

function drawPlatforms() {
  i = Math.max(rstart - 2, 0);

  do {
    if (pposx - resx > platforms[stageid][i][0]) rstart = i;
    if (i === maxp[stageid] - 1) fill('#00FF00'); else fill('#0000FF');
    rect(platforms[stageid][i][0] - spos, platforms[stageid][i][1], platforms[stageid][i][2], platforms[stageid][i][3]);
    i++;
  } while (i < maxp[stageid] && pposx + resx >= platforms[stageid][i][0]);
  fill('#FFFFFF');

}


var jheight = 150;
var minx = 0;
var maxx = 99999;
var miny = 0;


function collision() {
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

  i = max(cstart - 2, 0);
  // console.log(i, maxp[stageid]);
  do {
    if (pposx - resx / 2 > platforms[stageid][i][0]) cstart = i;
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
      } else
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
      if (platforms[stageid][i][0] >= sx + pposx) {
        if (platforms[stageid][i][0] < maxx) {
          maxx = platforms[stageid][i][0];
          xmaxid = i;
        }
      } else
      //***RIGHT***
      if (platforms[stageid][i][0] + platforms[stageid][i][2] <= pposx) {
        if (platforms[stageid][i][0] >= minx) {
          minx = platforms[stageid][i][0] + platforms[stageid][i][2];
          xminid = i;
        }
      }
    }
    i++;
  } while (i < maxp[stageid] && pposx + resx / 4 >= platforms[stageid][i][0]);


  // debugcollision(maxid, minid, xmaxid, xminid); //Uncomment to debug collision
  gravity(maxy, maxid);
  air(maxy);
  if (jumped) jump();
  bulletsCollision();
  damage();
  spikesCollision();
  checkIfUnderScreen();
  newEnemy();
  activeEnemies();
}

function bulletsCollision() {
  for (h = 0; h < maxp[stageid]; h++) {
    for (j = 0; j < bmax; j++) {
      if (bullets[j][5]) {
        if (bullets[j][1] <= platforms[stageid][h][1] + platforms[stageid][h][3] + bullets[j][2] * 0.75 && bullets[j][1] >= platforms[stageid][h][1] - bullets[j][2] * 0.75) {
          if (bullets[j][0] >= platforms[stageid][h][0] - bullets[j][2] * 0.75 && bullets[j][0] <= platforms[stageid][h][0] + platforms[stageid][h][2] + bullets[j][2] * 0.75) {
            bullets[j][5] = false;
          }
        }
      }
    }
  }
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

function gravity(maxy, maxid) {

  if (maxy - 1 > py + sy) {
    if (maxy - 1 > py + sy + grav)
      py += grav;
    else
      py = maxy - sy - 1;
  } else {
    if (maxid === maxp[stageid] - 1) {
      completed = true;
      countPoints();
    }
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

//TODO Optimise moving
function movex(vector) {
  if (vector === 1) {
    //--->RIGHT
    if (pposx + sx - 1 < maxx) {
      if (maxx - pposx - sx < pxspeed) {
        pposx = maxx - sx - 1;
        if (spos <= 0 || pposx > lastp) px = pposx; else px = resx / 2;
      } else {
        if (spos <= 0 || pposx > lastp) px += pxspeed; else px = resx / 2;
        pposx += pxspeed;
      }
      if (pposx < resx / 2) spos = 0; else if (pposx <= lastp) spos = pposx - resx / 2;
    }
  } else {
    //<--- LEFT
    if (pposx + 1 > minx) {
      if (pposx - minx < pxspeed) {
        pposx = minx + 1;
        if (pposx > lastp) px = pposx % resx;
      } else {
        pposx -= pxspeed;
        if (pposx > lastp) px -= pxspeed;
      }
      if (spos <= 0) px = pposx;
      if (pposx < resx / 2) spos = 0; else if (pposx <= lastp) spos = pposx - resx / 2;
    }
  }
}

function drawBullets() {
  for (i = 0; i < bmax; i++) {
    if (bullets[i][5]) {
      if (bullets[i][3] === 0) {
        bullets[i][0] += bspeed;
        bullets[i][1] -= bspeed;
      } else if (bullets[i][3] === 1) {
        bullets[i][0] += bspeed;
        bullets[i][1] += bspeed;
      } else if (bullets[i][3] === 2) {
        bullets[i][0] -= bspeed;
        bullets[i][1] -= bspeed;
      } else if (bullets[i][3] === 3) {
        bullets[i][0] -= bspeed;
        bullets[i][1] += bspeed;
      } else if (bullets[i][3] === 4) {
        bullets[i][0] += bspeed;
      } else if (bullets[i][3] === 5) {
        bullets[i][0] -= bspeed;
      } else if (bullets[i][3] === 6) {
        bullets[i][0] -= bullets[i][7];
        bullets[i][1] -= bullets[i][8];
      } else if (bullets[i][3] === 7) {
        bullets[i][0] -= bullets[i][7];
        bullets[i][1] += bullets[i][8];
      } else if (bullets[i][3] === 8) {
        bullets[i][0] += bullets[i][7];
        bullets[i][1] -= bullets[i][8];
      } else if (bullets[i][3] === 9) {
        bullets[i][0] += bullets[i][7];
        bullets[i][1] += bullets[i][8];
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
        noshot++;
        bullets[i][2] = bsize;
        if (direction[0] && direction[2]) {
          bullets[i][0] = spos + px + sx;
          bullets[i][1] = py + 10;
          bullets[i][3] = 0;
        } else if (direction[0] && direction[3]) {
          bullets[i][0] = spos + px + sx - 3;
          bullets[i][1] = py + 45;
          bullets[i][3] = 1;
        } else if (direction[1] && direction[2]) {
          bullets[i][0] = spos + px;
          bullets[i][1] = py + 10;
          bullets[i][3] = 2;
        } else if (direction[1] && direction[3]) {
          bullets[i][0] = spos + px + 3;
          bullets[i][1] = py + 45;
          bullets[i][3] = 3;
        } else if (direction[0]) {
          bullets[i][0] = spos + px + sx + 10;
          bullets[i][1] = py + 25;
          bullets[i][3] = 4;
        } else if (direction[1]) {
          bullets[i][0] = spos + px - 10;
          bullets[i][1] = py + 25;
          bullets[i][3] = 5;
        }
        bullets[i][6] = false;
      } else {
        var a = drawingenemies[enumber][0] + (esize / 2) - px - spos;
        var b = drawingenemies[enumber][1] - py;
        var c = Math.pow(a, 2) + Math.pow(b, 2);
        var d = c / bspeed;
        bullets[i][7] = Math.sqrt(Math.pow(a, 2) / d) * 3;
        bullets[i][8] = Math.sqrt(Math.pow(b, 2) / d) * 3;

        if (drawingenemies[enumber][0] + (esize / 2) - px - spos > 0 && drawingenemies[enumber][1] - py > 0) bullets[i][3] = 6;
        else if (drawingenemies[enumber][0] + (esize / 2) - px - spos > 0 && drawingenemies[enumber][1] - py <= 0) bullets[i][3] = 7;
        else if (drawingenemies[enumber][0] + (esize / 2) - px - spos <= 0 && drawingenemies[enumber][1] - py > 0) bullets[i][3] = 8;
        else if (drawingenemies[enumber][0] + (esize / 2) - px - spos <= 0 && drawingenemies[enumber][1] - py <= 0) bullets[i][3] = 9;

        bullets[i][0] = drawingenemies[enumber][0] + (esize / 2);
        bullets[i][1] = drawingenemies[enumber][1];
        bullets[i][2] = bsize;
        bullets[i][6] = true;
      }
      bullets[i][4] = 0;
      bullets[i][5] = true;
      break;
    }
  }
}

function checkIfUnderScreen() {
  if (py + sy >= resy) lose();
}

function lose() {

  textSize(50);
  fill('#FF0000');
  text("GAME OVER", resx / 2, resy / 2);
  fill('#FFFFFF');
  paused = true;
  restartGame();
}

function restartGame() {
  writeLastLevel();
  px = 100;
  pposx = 100;
  spos = 0;
  py = 100;
  onair = false;
  jumped = false;
  jcounter = false;
  rstart = 0;
  cstart = 0;
  plifep = 3;
  nodamage = false;
  ndcounter = 0;
  for (j = 0; j < maxe[stageid]; j++) {
    if (enemies[stageid][j][5] === 0) enemies[stageid][j][7] = 3;
    else enemies[stageid][j][7] = 2;
  }
  for (j = 0; j < bmax; j++) bullets[j][5] = 0;
  seconds = 0;
  minutes = 3;
  score[stageid] = 0;
  noshot = 0;
  lastp = getLastPlatform();
  sstart = 0;
}

function newEnemy() {
  for (i = 0; i < maxe[stageid]; i++) {
    if (px + spos >= enemies[stageid][i][2] - (1366 - px) && px + spos <= enemies[stageid][i][3] + px && !enemies[stageid][i][8] && enemies[stageid][i][7] > 0) {
      enemiesCounter++;
      drawingenemies[enemiesCounter][0] = enemies[stageid][i][0];
      drawingenemies[enemiesCounter][1] = enemies[stageid][i][1];
      drawingenemies[enemiesCounter][2] = i;
      enemies[stageid][i][8] = true;
    }
  }
}

function drawEnemies() {
  for (p = 0; p <= enemiesCounter; p++) {
    var k = 0;
    image(livebar, drawingenemies[p][0] - spos + 3, drawingenemies[p][1] - 19);
    if (enemies[stageid][drawingenemies[p][2]][5] === 0) {
      image(enemyimg, drawingenemies[p][0] - spos, drawingenemies[p][1]);
      for (l = 0; l < enemies[stageid][drawingenemies[p][2]][7]; l++) {
        image(bar2, drawingenemies[p][0] - spos + 6 + k, drawingenemies[p][1] - 16);
        k += 16;
     }
    } else {
      image(enemyimg2, drawingenemies[p][0] - spos, drawingenemies[p][1]);
      for (l = 0; l < enemies[stageid][drawingenemies[p][2]][7]; l++) {
        image(bar1, drawingenemies[p][0] - spos + 6 + k, drawingenemies[p][1] - 16);
        k += 24;
      }
    }
   if (enemies[stageid][drawingenemies[p][2]][4]) {
        //Right--->
    if (enemies[stageid][drawingenemies[p][2]][3] - drawingenemies[p][0] - esize <= espeed) {
     drawingenemies[p][0] = enemies[stageid][drawingenemies[p][2]][3] - esize;
     enemies[stageid][drawingenemies[p][2]][4] = false;
    } else {
     drawingenemies[p][0] += espeed;
    }
   } else {
        //Left <---
    if (drawingenemies[p][0] - enemies[stageid][drawingenemies[p][2]][2] <= espeed) {
     drawingenemies[p][0] = enemies[stageid][drawingenemies[p][2]][2];
     enemies[stageid][drawingenemies[p][2]][4] = true;
    } else {
     drawingenemies[p][0] -= espeed;
    }
   }
   if (px + spos < enemies[stageid][drawingenemies[p][2]][2] - (1366 - px) || px + spos > enemies[stageid][drawingenemies[p][2]][3] + px || enemies[stageid][drawingenemies[p][2]][7] === 0) {
     enemies[stageid][drawingenemies[p][2]][8] = false;
   }
  }
}

function activeEnemies() {
  if (enemiesCounter > -1) {
   for (p = 0; p <= enemiesCounter; p++) {
     if (!enemies[stageid][drawingenemies[p][2]][8]) {
       if (enemiesCounter === 0) enemiesCounter--;
        else {
       drawingenemies[p][0] = drawingenemies[enemiesCounter][0];
       drawingenemies[p][1] = drawingenemies[enemiesCounter][1];
       drawingenemies[p][2] = drawingenemies[enemiesCounter][2];
       enemiesCounter--;
      }
     }
   }
 }
}

function drawHUD() {
  image(heart, 25, 25);
  textSize(45);
  fill('black');
  text(plifep, 82, 65);
  drawTimer();
  fill('#FFFFFF');
}

function drawTimer() {
  if (tcounter < 59) tcounter++;
  else if (tcounter === 59) {
    tcounter = 0;
    seconds--;
    if (minutes === 0 && seconds === 0) lose();
    if (seconds === -1) {
      seconds = 59;
      minutes--;
    }
  }
  text(minutes, 647, 65);
  text(':', 682, 65);
  if (seconds > 9) {
    text(seconds, 707, 65);
  } else {
    text('0', 707, 65);
    text(seconds, 732, 65);
  }
}

function damage() {
  for (l = 0; l <= enemiesCounter; l++) {
    if (enemies[stageid][drawingenemies[l][2]][5] === 1 && enemies[stageid][drawingenemies[l][2]][7] > 0) {
      if (px + spos >= enemies[stageid][drawingenemies[l][2]][0] - 500 && px + spos <= enemies[stageid][drawingenemies[l][2]][0] + 500 && enemies[stageid][drawingenemies[l][2]][6] === 0) {
        enemies[stageid][drawingenemies[l][2]][6]++;
        newBullet(l);
      } else if (enemies[stageid][drawingenemies[l][2]][6] > 0 && enemies[stageid][drawingenemies[l][2]][6] < 60 * ttshot + 1) enemies[stageid][drawingenemies[l][2]][6]++;
      else if (enemies[stageid][drawingenemies[l][2]][6] === 60 * ttshot + 1) enemies[stageid][drawingenemies[l][2]][6] = 0;
    }
    if (enemies[stageid][drawingenemies[l][2]][7] > 0) {
      if (py <= drawingenemies[l][1] + esize - sy && py >= drawingenemies[l][1] - sy) {
        if (px >= drawingenemies[l][0] - spos - sx && px <= drawingenemies[l][0] + esize - spos) {
          lifePoints(-1, -1);
        }
      }
    }
    for (j = 0; j < bmax; j++) {
      if (enemies[stageid][drawingenemies[l][2]][7] > 0 && bullets[j][5] && !bullets[j][6]) {
        if (bullets[j][1] <= drawingenemies[l][1] + esize + bullets[j][2] / 2 && bullets[j][1] >= drawingenemies[l][1] - bullets[j][2] / 2) {
          if (bullets[j][0] >= drawingenemies[l][0] - bullets[j][2] / 2 && bullets[j][0] <= drawingenemies[l][0] + esize + bullets[j][2] / 2) {
            bullets[j][5] = false;
            lifePoints(drawingenemies[l][2], -1);
            if (enemies[stageid][drawingenemies[l][2]][7] === 0) {
              if (enemies[stageid][drawingenemies[l][2]][5] === 0) score[stageid] += 150;
              else score[stageid] += 250;
            }
          }
        }
      }
    }
  }
  for (j = 0; j < bmax; j++) {
    if (bullets[j][6] && bullets[j][5]) {
      if (bullets[j][1] <= py + sy + bullets[j][2] / 2 && bullets[j][1] >= py - bullets[j][2] / 2) {
        if (bullets[j][0] >= px + spos - bullets[j][2] / 2 && bullets[j][0] <= px + spos + sx + bullets[j][2] / 2) {
          bullets[j][5] = false;
          lifePoints(-1, -1);
        }
      }
    }
  }
}

function lifePoints(id, number) {
  if (id === -1 && !nodamage) {
    plifep += number;
    nodamage = true;
  } else if (id >= 0) {
    enemies[stageid][id][7] += number;
  }
  if (plifep === 0) lose();
}

function noDamage() {
  ndcounter++;
  if (ndcounter % 10 === 0) {
    rect(px, py, sx, sy);
    if (direction[0] && direction[2]) {
     image(pistol[1], px + 25, py);
    } else if (direction[0] && direction[3]) {
      image(pistol[2], px + 25, py + 20);
    } else if (direction[1] && direction[2]) {
      image(pistol[4], px - 12, py);
    } else if (direction[1] && direction[3]) {
      image(pistol[5], px - 7, py + 20);
    } else if (direction[0]) {
      image(pistol[0], px + 25, py + 20);
    } else if (direction[1]) {
      image(pistol[3], px - 19, py + 20);
    }
  }
  if (ndcounter === 60 * 1.5) {
    nodamage = false;
    ndcounter = 0;
  }
}

function drawSpikes() {
  i = max(sstart - 1, 0);
  do {
    if (pposx - resx > spikes[stageid][i][0]) sstart = i;
    //DOWN
    if (spikes[stageid][i][2] === 0) triangle(spikes[stageid][i][0] - spos - swidth, spikes[stageid][i][1], spikes[stageid][i][0] - spos + swidth, spikes[stageid][i][1], spikes[stageid][i][0] - spos, spikes[stageid][i][1] + sheight);

    //UP
    else if (spikes[stageid][i][2] === 1) triangle(spikes[stageid][i][0] - spos + swidth, spikes[stageid][i][1], spikes[stageid][i][0] - spos - swidth, spikes[stageid][i][1], spikes[stageid][i][0] - spos, spikes[stageid][i][1] - sheight);

    //LEFT
    else if (spikes[stageid][i][2] === 2) triangle(spikes[stageid][i][0] - spos, spikes[stageid][i][1] + swidth, spikes[stageid][i][0] - spos, spikes[stageid][i][1] - swidth, spikes[stageid][i][0] - spos - sheight, spikes[stageid][i][1]);

    //RIGHT
    else if (spikes[stageid][i][2] === 3) triangle(spikes[stageid][i][0] - spos, spikes[stageid][i][1] - swidth, spikes[stageid][i][0] - spos, spikes[stageid][i][1] + swidth, spikes[stageid][i][0] - spos + sheight, spikes[stageid][i][1]);
    i++;
  } while (i < maxs[stageid] && pposx + resx >= spikes[stageid][i][0])
}

function spikesCollision() {
  for (i = sstart; i < maxs[stageid]; i++) {
    //Spikes UP AND DOWN
    if ((spikes[stageid][i][2] === 0 || spikes[stageid][i][2] === 1) && (pposx >= spikes[stageid][i][0] - swidth - sx && pposx <= spikes[stageid][i][0] + swidth)) {

      switch (spikes[stageid][i][2]) {
        case 0:
          //DOWN
          if (py > spikes[stageid][i][1]) spikeBorderCollision(0);
          break;
        case 1:
          //UP
          if (py < spikes[stageid][i][1]) spikeBorderCollision(1);
          break;
      }

    } else
    //Spikes LEFT AND RIGHT
    if (py >= spikes[stageid][i][1] - swidth && py <= spikes[stageid][i][1] + swidth) {

      switch (spikes[stageid][i][2]) {
        case 2:
          //LEFT
          if (pposx >= spikes[stageid][i][0] - sheight - sx && pposx <= spikes[stageid][i][0] + sx) spikeBorderCollision(2);
          break;
        case 3:
          //RIGHT
          if (pposx >= spikes[stageid][i][0] && pposx <= spikes[stageid][i][0] + sheight) spikeBorderCollision(3);
          break;
      }
    }
  }
}

function countPoints() {
  for (var k = 1; k <= plifep; k++) score[stageid] += 75;
  var points = (60 * minutes + seconds) * 300 / maxtime;
  if (noshot === 0) noshot++;
  var points2 = 350 / noshot;
  score[stageid] = score[stageid] + points + points2;
  score[stageid] = Math.round(score[stageid]);
}


function spikeBladeHeight(part) {

  switch (part) {
    case 0:
      //LEFT
      return Math.round(sheight * (swidth - spikes[stageid][i][0] + pposx + sx) / swidth);
    case 1:
      //RIGHT
      return Math.round(sheight * (spikes[stageid][i][0] + swidth - pposx) / swidth);
    case 2:
      //DOWN
      return Math.round(sheight * (swidth - py + spikes[stageid][i][1]) / swidth);
    case 3:
      return Math.round(sheight * (swidth + py + sy - spikes[stageid][i][1]) / swidth);
  }
}

function spikeBorderCollision(d) {
  var a = 0;

  switch (d) {
    case 0:
      //DOWN
      if (pposx + sx < spikes[stageid][i][0]) {
        //LEFT
        a = spikeBladeHeight(0);
        if (spikes[stageid][i][1] + a > py)
          lifePoints(-1, -1);
      } else if (pposx >= spikes[stageid][i][0]) {
        //RIGHT
        a = spikeBladeHeight(1);
        if (spikes[stageid][i][1] + a > py)
          lifePoints(-1, -1);
      } else {
        //CENTER
        if (spikes[stageid][i][1] + sy > py) {
          lifePoints(-1, -1);
        }
      }
      break;

    case 1:
      //UP
      if (pposx + sx < spikes[stageid][i][0]) {
        //LEFT
        a = spikeBladeHeight(0);
        if (spikes[stageid][i][1] - a < py + sy)
          lifePoints(-1, -1);
      } else if (pposx >= spikes[stageid][i][0]) {
        //RIGHT
        a = spikeBladeHeight(1);
        if (spikes[stageid][i][1] - a < py + sy)
          lifePoints(-1, -1);
      } else {
        //CENTER
        if (spikes[stageid][i][1] - sy < py + sy) {
          lifePoints(-1, -1);
        }
      }
      break;

    case 2:
      //LEFT
      if (py > spikes[stageid][i][1]) {
        //DOWN
        a = spikeBladeHeight(2);
        if (pposx + sx >= spikes[stageid][i][0] - a)
          lifePoints(-1, -1);
      } else if (py + sy > spikes[stageid][i][1]) {
        //UP
        a = spikeBladeHeight(3);
        console.log(pposx + sx, spikes[stageid][i][0] - a);
        if (pposx + sx >= spikes[stageid][i][0] - a)
          lifePoints(-1, -1);
      } else {
        //CENTER
        if (pposx + sx >= spikes[stageid][i][0] - sheight)
          lifePoints(-1, -1);
      }
      break;

    case 3:
      //RIGHT
      if (py > spikes[stageid][i][1]) {
        //DOWN
        a = spikeBladeHeight(2);
        if (pposx <= spikes[stageid][i][0] + a)
          lifePoints(-1, -1);
      } else if (py + sy > spikes[stageid][i][1]) {
        //UP
        a = spikeBladeHeight(3);
        console.log(pposx + sx, spikes[stageid][i][0] - a);
        if (pposx <= spikes[stageid][i][0] + a)
          lifePoints(-1, -1);
      } else {
        //CENTER
        if (pposx <= spikes[stageid][i][0] + sheight)
          lifePoints(-1, -1);
      }
      break;
  }
}
