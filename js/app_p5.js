// kod projektu Gra Platformowa
//Canvas Resolutnion
var resx = 1366;
var resy = 768;

var player = new Player();

function Player() {
  //Position x-Render
  this.x = 100;
  //Position y-Render
  this.y = 40;
  //Position on stage
  this.pos = 100;
  //X-speed
  this.speedx = 7;
  //Size X
  this.sx = 50;
  //Size Y
  this.sy = 50;
  //Life
  this.life = 3;
  //Nodamage
  this.nodamage = false;
  //Player rising
  this.rise = false;
  //God time counter
  this.godtime = 0;
  //On air
  this.onair = false;
  //Jump Speed
  this.jumpspeed = 20;
  //Maximum Jump
  this.maxjumpheight = 310;
  //Current Jump Height
  this.jumpcounter = 0;

  //Draw
  this.draw = function () {
    if (!this.nodamage) {
      rect(this.x, this.y, this.sx, this.sy);
      if (direction[0] && direction[2]) {
        image(pistol[1], this.x + 25, this.y);
      } else if (direction[0] && direction[3]) {
        image(pistol[2], this.x + 25, this.y + 20);
      } else if (direction[1] && direction[2]) {
        image(pistol[4], this.x - 12, this.y);
      } else if (direction[1] && direction[3]) {
        image(pistol[5], this.x - 7, this.y + 20);
      } else if (direction[0]) {
        image(pistol[0], this.x + 25, this.y + 20);
      } else if (direction[1]) {
        image(pistol[3], this.x - 19, this.y + 20);
      }
    }
    else nodamage();
  };

  //Move
  this.move = function (vector) {
    if (vector === 1) {
      //--->RIGHT
      if (this.pos + this.sx - 1 < maxx) {
        if (maxx - this.pos - this.sx < this.speedx) {
          this.pos = maxx - this.sx - 1;
          if (spos <= 0) this.x = this.pos; else if (this.pos > lastp) this.x = resx - (oplatforms[maxp[stageid] - 1].x + oplatforms[maxp[stageid] - 1] - this.pos); else this.x = resx / 2;
        } else {
          if (spos <= 0 || this.pos > lastp) this.x += this.speedx; else this.x = resx / 2;
          this.pos += this.speedx;
        }
        if (this.pos < resx / 2) spos = 0; else if (this.pos <= lastp) spos = this.pos - resx / 2;
      }
    } else {
      //<--- LEFT
      if (this.pos + 1 > minx) {
        if (this.pos - minx < this.speedx) {
          this.pos = minx + 1;
          if (spos <= 0) this.x = this.pos; else if (this.pos > lastp) this.x = resx - (oplatforms[maxp[stageid] - 1].x + oplatforms[maxp[stageid] - 1].width - this.pos); else this.x = resx / 2;
        } else {
          this.pos -= this.speedx;
          if (this.pos > lastp) this.x -= this.speedx; else this.x = resx / 2
        }
        if (spos <= 0) this.x = this.pos;
        if (this.pos < resx / 2) spos = 0; else if (this.pos <= lastp) spos = this.pos - resx / 2;
      }
    }

  };
  //Jump
  this.jump = function () {
    if (this.rise && this.jumpcounter < this.maxjumpheight - this.jumpspeed) {
      console.log(miny);
      if (miny + 1 < this.y - this.jumpspeed) {
        this.y -= this.jumpspeed;
        this.jumpcounter += this.jumpspeed;
      } else {
        this.y = miny + 1;
        this.rise = false;
      }
    } else this.rise = false;
    return 0;
  };

  this.collision = function () {
    maxy = 999999;
    maxid = 0;
    miny = 0;
    minid = -1;
    maxx = 999999;
    xmaxid = -1;
    minx = 0;
    xminid = -1;
    i = Math.max(cstart - 2, 0);
    // console.log(i, maxp[stageid]);
    do {
      if (this.pos - resx / 2 > oplatforms[i].x) cstart = i;
      //***************************
      //Select platform's borders vertical
      if (this.pos >= oplatforms[i].x - this.sx && this.pos <= oplatforms[i].x + oplatforms[i].width) {
        if (oplatforms[i].y > this.y) {
          oplatforms[i].collisionTop();
        } else
          oplatforms[i].collisionBottom();

      }
      //***************************
      //Select platform's borders horizontal
      if (this.y >= oplatforms[i].y - this.sy && this.y <= oplatforms[i].y + oplatforms[i].height) {
        //***LEFT***
        if (oplatforms[i].x >= this.sx + this.pos) {
          oplatforms[i].collisionLeft();
        } else
        //***RIGHT***
          oplatforms[i].collisionRight();
      }
      i++;
    } while (i < maxp[stageid] && this.pos + resx / 4 >= oplatforms[i].x);

  }
}


var oplatforms = [];

//Make platforms objects array
for (i = 0; i < maxp[stageid]; i++) {
  oplatforms.push(new Platform(
    platforms[stageid][i][0],
    platforms[stageid][i][1],
    platforms[stageid][i][2],
    platforms[stageid][i][3]
  ))
}

function Platform(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.draw = function () {
    rect(this.x - spos, this.y, this.width, this.height);
  };

  this.collisionLeft = function () {
    if (this.x < maxx) {
      maxx = this.x;
      xmaxid = i;
    }
  };

  this.collisionRight = function () {
    if (this.x + this.width <= player.pos) {
      if (this.x >= minx) {
        minx = this.x + this.width;
        xminid = i;
      }
    }
  };

  this.collisionTop = function () {
    if (this.y < maxy) {
      maxy = this.y;
      maxid = i;
    }
  };

  this.collisionBottom = function () {
    if (this.y + this.height < player.y) {
      if (this.y + this.height > miny) {
        miny = this.y + this.height;
        // jheight = Math.min(miny, 150);
        minid = i;
      }
    }
  }
}


//Last platform pos;
var lastp = 0;

//Minimum player position X-AXIS
var minx = 0;
//Maximum player position X-AXIS
var maxx = 99999;
//Minimum player position Y-AXIS
var miny = 0;
//Maximum player position Y-AXIS
var maxy = 999999;
//(FOR DEBUG)Maximum platform Y-AXIS
var maxid = 0;
//(FOR DEBUG)Minimum platform Y-AXIS
var minid = -1;
//(FOR DEBUG)Maximum platform X-AXIS
var xmaxid = -1;
//(FOR DEBUG)Minimum platform X-AXIS
var xminid = -1;


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
//Select Drawing Mode
//0-Menu
//1-Game
//2-Credits
//3-Controls
var mode = 0;

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
var btntext = ['New Game', 'Continue', 'Controls', 'Credits'];
//Active button id
var btnid = 0;
//Credits X-pos
var creditsx = 483;
//Credits scroll variable
var creditsy = 800;
//Credits' strings
credits = [];
credits[0] = "Credits";
credits[1] = "Project Manager";
credits[2] = "Marcin Zasuwa";
credits[3] = "Programmers";
credits[4] = "Marcin Saja";
credits[5] = "Jakub Mazur";
credits[6] = "Level Designer";

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
for (var n = 0; n < 4; n++) drawingenemies[n] = [];

var enemiesCounter = -1;
//Time to drop Enemy
var tdrop = 0;

//Images
var enemyimg;
var enemyimg2;
var livebar;
var bar1;
var bar2;
var heart;
var boss;
var pistol = [];

//Load Images
function preload() {
  enemyimg = loadImage('./assets/enemy.png');
  enemyimg2 = loadImage('./assets/enemy2.png');
  livebar = loadImage('./assets/livebar.png');
  bar1 = loadImage('./assets/bar1.png');
  bar2 = loadImage('./assets/bar2.png');
  heart = loadImage('./assets/heart.png');
  boss = loadImage('./assets/boss.png');
  for (i = 0; i < 6; i++) {
    pistol[i] = loadImage('./assets/pistol' + i + '.png');
  }
}

function setup() {
  frameRate(60);
  createCanvas(resx, resy);
  background(200);
}

function draw() {
  keyboardEvent();
  switch (mode) {
    case 0:
      //Menu
      menu();
      break;
    case 1:
      //Game
      game();
      break;
    case 2:
      //Credits
      drawCredits();
      break;
    case 3:
      //Controls
      break;

  }

}

function mouseClicked() {
  menuSelection(checkMousePos());
}

function newGame() {
  restartGame();
  mode = 1;
}

function continueGame() {
  var level = getCookieToInt("level");
  if (level > 0) {
    stageid = level;
    restartGame();
    mode = 1;
  }
}

function getLastPlatform() {
  return platforms[stageid][maxp[stageid] - 1][0] + platforms[stageid][maxp[stageid] - 1][2] - resx / 2;
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

function drawCredits() {
  if (creditsy > 125)
    creditsy -= 2;
  background(200);
  textSize(50);
  textStyle(BOLD);
  fill("#0000FF");
  text(credits[0], creditsx, creditsy); //Credits
  fill("#FF0000");
  text(credits[1], creditsx, creditsy + 100); //Project Manager
  fill("#000000");
  text(credits[2], creditsx, creditsy + 150); //Marcin Zasuwa
  fill("#FF0000");
  text(credits[3], creditsx, creditsy + 250); //Programmers
  fill("#000000");
  text(credits[2], creditsx, creditsy + 300); //Marcin Zasuwa
  text(credits[4], creditsx, creditsy + 350); //Marcin Saja
  text(credits[5], creditsx, creditsy + 400); //Jakub Mazur
  fill("#FF0000");
  text(credits[6], creditsx, creditsy + 500); //Level Designer
  fill("#000000");
  text(credits[5], creditsx, creditsy + 550); //Jakub Mazur
}

function menuSelection(a) {
  if (mode === 0) {
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
        creditsy = 800;
        mode = 2;
        break;
    }
    cursor(ARROW);
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

function getCookieToInt(name) {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    if (cookies[i].charAt(0) === " ") {
      cookies[i] = cookies[i].substring(1);
    }
    if (cookies[i].indexOf(name) === 0) {
      return parseInt(cookies[i].substring(name.length + 1, cookies[i].length));
    }
  }
  return -1;
}


function game() {
  if (!(completed || paused)) {
    background(200);
    drawObjects();
    physics();
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
    player.move(1);
    direction[0] = true;
    direction[1] = false;
  }

  if (keyIsDown(LEFT_ARROW) && !paused) {
    player.move(-1);
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
    if (!player.onair) {
      player.jumpcounter = 0;
      player.rise = true;
    }
  }
  //X-Shoot
  if (keyCode === 88) {
    newBullet(-1);
  }

  //SPACE
  if (keyCode === 32) {
    if (mode === 2) mode = 0; //Go to Menu
    else if (completed) {
      //Continue
      stageid++;
      completed = false;
      restartGame();
    } else if (mode !== 0) paused = !paused; //Pause/Unpause
  }
  //Enter-Select Menu Entry
  if (keyCode === 13 && mode === 0) {
    menuSelection(btnid);
  }
  //UP_ARROW Pressed
  if (keyCode === 38 && mode === 0 && btnid > 0) {
    btnid--;
  }
  //DOWN_ARROW Pressed
  if (keyCode === 40 && mode === 0 && btnid < 3) {
    btnid++;
  }
}

function keyReleased() {
  if (keyCode === 90) {
    player.rise = false;
  }
}

function drawObjects() {
  player.draw();


  //Draw Platforms
  i = Math.max(rstart - 2, 0);
  do {
    if (player.pos - resx > oplatforms[i].x) rstart = i;
    if (i === maxp[stageid] - 1) fill('#00FF00'); else fill('#0000FF');
    oplatforms[i].draw();
    i++;
  } while (i < maxp[stageid] && player.pos + resx >= oplatforms[i].x);
  fill('#FFFFFF');


  drawEnemies();
  drawSpikes();
  drawBullets();
  drawHUD();
}

function physics() {
  // platformsCollision();
  player.collision();
  // debugcollision(maxid, minid, xmaxid, xminid); //Uncomment to debug collision
  gravity(maxy, maxid);
  air(maxy);
  if (player.rise) player.jump();
  bulletsCollision();
  damage();
  spikesCollision();
  checkIfUnderScreen();
  checkEnemyPos();
  activeEnemies();
}

function bulletsCollision() {
  for (i = 0; i < maxp[stageid]; i++) {
    for (j = 0; j < bmax; j++) {
      if (bullets[j][5]) {
        if (bullets[j][1] <= platforms[stageid][i][1] + platforms[stageid][i][3] + bullets[j][2] * 0.75 && bullets[j][1] >= platforms[stageid][i][1] - bullets[j][2] * 0.75) {
          if (bullets[j][0] >= platforms[stageid][i][0] - bullets[j][2] * 0.75 && bullets[j][0] <= platforms[stageid][i][0] + platforms[stageid][i][2] + bullets[j][2] * 0.75) {
            bullets[j][5] = false;
          }
        }
      }
    }
  }
}

//**********COLLISION DEBUG**********
// function debugcollision(maxid, minid, xmaxid, xminid) {
//   fill('red');
//   rect(platforms[stageid][maxid][0] - spos, platforms[stageid][maxid][1], platforms[stageid][maxid][2], platforms[stageid][maxid][3]);
//   fill('green');
//   if (minid !== -1) rect(platforms[stageid][minid][0] - spos, platforms[stageid][minid][1], platforms[stageid][minid][2], platforms[stageid][minid][3]);
//   fill('yellow');
//   if (xmaxid !== -1) rect(platforms[stageid][xmaxid][0] - spos, platforms[stageid][xmaxid][1], platforms[stageid][xmaxid][2], platforms[stageid][xmaxid][3]);
//   fill('orange');
//   if (xminid !== -1) rect(platforms[stageid][xminid][0] - spos, platforms[stageid][xminid][1], platforms[stageid][xminid][2], platforms[stageid][xminid][3]);
//   fill('white');
//
// }

function gravity(maxy, maxid) {

  if (maxy - 1 > player.y + player.sy) {
    if (maxy - 1 > player.y + player.sy + grav)
      player.y += grav;
    else
      player.y = maxy - player.sy - 1;
  } else {
    if (maxid === maxp[stageid] - 1) {
      completed = true;
      countPoints();
    }
  }
}

function air(maxy) {
  player.onair = player.y + player.sy + grav < maxy;
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
          bullets[i][0] = spos + player.x + player.sx;
          bullets[i][1] = player.y + 10;
          bullets[i][3] = 0;
        } else if (direction[0] && direction[3]) {
          bullets[i][0] = spos + player.x + player.sx - 3;
          bullets[i][1] = player.y + 45;
          bullets[i][3] = 1;
        } else if (direction[1] && direction[2]) {
          bullets[i][0] = spos + player.x;
          bullets[i][1] = player.y + 10;
          bullets[i][3] = 2;
        } else if (direction[1] && direction[3]) {
          bullets[i][0] = spos + player.x + 3;
          bullets[i][1] = player.y + 45;
          bullets[i][3] = 3;
        } else if (direction[0]) {
          bullets[i][0] = spos + player.x + player.sx + 10;
          bullets[i][1] = player.y + 25;
          bullets[i][3] = 4;
        } else if (direction[1]) {
          bullets[i][0] = spos + player.x - 10;
          bullets[i][1] = player.y + 25;
          bullets[i][3] = 5;
        }
        bullets[i][6] = false;
      } else {
        var a = drawingenemies[enumber][0] + (esize / 2) - player.x - spos;
        var b = drawingenemies[enumber][1] - player.y;
        var c = Math.pow(a, 2) + Math.pow(b, 2);
        var d = c / bspeed;
        bullets[i][7] = Math.sqrt(Math.pow(a, 2) / d) * 3;
        bullets[i][8] = Math.sqrt(Math.pow(b, 2) / d) * 3;

        if (drawingenemies[enumber][0] + (esize / 2) - player.x - spos > 0 && drawingenemies[enumber][1] - player.y > 0) bullets[i][3] = 6;
        else if (drawingenemies[enumber][0] + (esize / 2) - player.x - spos > 0 && drawingenemies[enumber][1] - player.y <= 0) bullets[i][3] = 7;
        else if (drawingenemies[enumber][0] + (esize / 2) - player.x - spos <= 0 && drawingenemies[enumber][1] - player.y > 0) bullets[i][3] = 8;
        else if (drawingenemies[enumber][0] + (esize / 2) - player.x - spos <= 0 && drawingenemies[enumber][1] - player.y <= 0) bullets[i][3] = 9;

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
  if (player.y + player.sy >= resy) lose();
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
  player.x = 100;
  player.pos = 100;
  spos = 0;
  player.y = 100;
  player.onair = false;
  player.rise = false;
  player.jumpcounter = false;
  rstart = 0;
  cstart = 0;
  player.life = 3;
  player.nodamage = false;
  player.godtime = 0;
  for (j = 0; j < maxe[stageid]; j++) {
    switch (enemies[stageid][j][5]) {
      case 0:
        enemies[stageid][j][7] = 3;
        break;
      case 1:
        enemies[stageid][j][7] = 2;
        break;
      case 2:
        enemies[stageid][j][7] = 150;
        break;
      default:
    }
  }
  for (j = 0; j < bmax; j++) bullets[j][5] = 0;
  seconds = 0;
  minutes = 3;
  score[stageid] = 0;
  noshot = 0;
  lastp = getLastPlatform();
  sstart = 0;
}

function checkEnemyPos() {
  if (stageid !== 3)
    for (i = 0; i < maxe[stageid]; i++) {
      if (player.x + spos >= enemies[stageid][i][2] - (1366 - player.x) && player.x + spos <= enemies[stageid][i][3] + player.x && !enemies[stageid][i][8] && enemies[stageid][i][7] > 0) {
        //Add Enemy to drawingenemies
        createNewEnemy(enemies[stageid][i][0], enemies[stageid][i][1], i);
      }
    } else {
    if (!enemies[stageid][0][8] && enemies[stageid][0][7] > 0) {
      //Add Enemy to drawingenemies
      createNewEnemy(enemies[stageid][0][0], enemies[stageid][0][1], 0);
    }
  }
}

function createNewEnemy(x, y, id) {
  enemiesCounter++;
  drawingenemies[enemiesCounter][0] = x;
  drawingenemies[enemiesCounter][1] = y;
  drawingenemies[enemiesCounter][2] = id;
  enemies[stageid][id][8] = true;
}

function drawEnemies() {
  for (i = 0; i <= enemiesCounter; i++) {
    var k = 0;
    image(livebar, drawingenemies[i][0] - spos + 3, drawingenemies[i][1] - 19);

    //Draw Life Bars
    switch (enemies[stageid][drawingenemies[i][2]][5]) {
      case 0:
        image(enemyimg, drawingenemies[i][0] - spos, drawingenemies[i][1]);
        for (j = 0; j < enemies[stageid][drawingenemies[i][2]][7]; j++) {
          image(bar2, drawingenemies[i][0] - spos + 6 + k, drawingenemies[i][1] - 16);
          k += 16;
        }
        break;

      case 1:
        image(enemyimg2, drawingenemies[i][0] - spos, drawingenemies[i][1]);
        for (j = 0; j < enemies[stageid][drawingenemies[i][2]][7]; j++) {
          image(bar1, drawingenemies[i][0] - spos + 6 + k, drawingenemies[i][1] - 16);
          k += 24;
        }
        break;

      case 2:
        image(boss, drawingenemies[i][0] - spos, drawingenemies[i][1]);
        for (j = 0; j < enemies[stageid][drawingenemies[i][2]][7]; j++) {
          image(bar1, drawingenemies[i][0] - spos + 6 + k, drawingenemies[i][1] - 16);
          k += 24;
        }
        break;

    }

    if (enemies[stageid][drawingenemies[i][2]][5] === 2) {
      //Move Boss
      moveBoss(i);
      //Drop Enemy
      if (tdrop > 180 && selectNotUsedEnemy() !== -1) {
        tdrop = 0;
        dropEnemy(selectNotUsedEnemy());
      } else tdrop++;
    } else {
      //Movie Enemies(other than Boss)
      if (drawingenemies[i][1] < enemies[stageid][drawingenemies[i][2]][1]) {
        //If Enemy is falling (move in X and Y Axis)
        enemyFalling(i);
      } else {
        //If Enemy is on platform (move in X Axis)
        moveEnemies(i);
      }

    }

    if (player.x + spos < enemies[stageid][drawingenemies[i][2]][2] - (1366 - player.x) || player.x + spos > enemies[stageid][drawingenemies[i][2]][3] + player.x || enemies[stageid][drawingenemies[i][2]][7] === 0) {
      enemies[stageid][drawingenemies[i][2]][8] = false;
    }
  }
}

function moveEnemies(p) {
  //X-AXIS
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
}

function enemyFalling(p) {

  if (enemies[drawingenemies[p][2]][5] !== 2) {
    //Move Y-Axis
    if (drawingenemies[p][1] + vey <= enemies[stageid][drawingenemies[p][2]][1]) drawingenemies[p][1] += vey;
    else drawingenemies[p][1] = enemies[stageid][drawingenemies[p][2]][1];
    //Move X-Axis
    if (enemies[stageid][drawingenemies[p][2]][11] > 0) {


      //Move to right--->
      if (drawingenemies[p][0] + enemies[stageid][drawingenemies[p][2]][11] <= enemies[stageid][drawingenemies[p][2]][12]) {
        drawingenemies[p][0] += enemies[stageid][drawingenemies[p][2]][11];
      }
    }
    //Move to left
    if (drawingenemies[p][0] - enemies[stageid][drawingenemies[p][2]][11] >= enemies[stageid][drawingenemies[p][2]][12]) {
      drawingenemies[p][0] += enemies[stageid][drawingenemies[p][2]][11];
    }

  }

}


function countFallingVector(x, h) {
//x-Difference from enemy position x to destination position x
//y-Difference from enemy position y to destination position y
  return Math.floor((Math.sqrt(Math.pow(x, 2) + Math.pow(h, 2))) / (h / vey));

}

function selectNotUsedEnemy() {
  i = 1;
  while (enemies[stageid][i][8]) {
    i++;
    if (i >= maxe[stageid]) return -1;
  }
  return i;
}

function dropEnemy(i) {
  //Create new enemy under boss
  createNewEnemy(drawingenemies[0][0] + 40, drawingenemies[0][1], i);
  //Random destination point
  enemies[stageid][i][12] = Math.floor((Math.random() * 686) + 350);
  var x = enemies[stageid][i][12] - drawingenemies[enemiesCounter][0];
  var h = platforms[stageid][3][1] - drawingenemies[enemiesCounter][1] - 60;
  enemies[stageid][i][11] = countFallingVector(x, h);
  //Random Enemy Type
  enemies[stageid][i][5] = Math.floor((Math.random() * 2));
  //Invert Vector if x<0
  if (x < 0) enemies[stageid][i][11] *= -1;
  switch (enemies[stageid][i][5]) {
    case 0:
      //Not shooting enemy
      enemies[stageid][i][6] = -1;
      enemies[stageid][i][7] = 3;
      break;
    case 1:
      //Shooting enemy
      enemies[stageid][i][6] = 10;
      enemies[stageid][i][7] = 2;
      break;
  }
}

function moveBoss(p) {
  //X-Movement
  if (enemies[stageid][drawingenemies[p][2]][4]) {
    if (drawingenemies[p][0] - vbx < enemies[stageid][drawingenemies[p][2]][3]) {
      drawingenemies[p][0] += vbx;
    } else {
      drawingenemies[p][0] = enemies[stageid][drawingenemies[p][2]][3];
      enemies[stageid][drawingenemies[p][2]][4] = false;
    }
  } else {
    if (drawingenemies[p][0] - vbx > enemies[stageid][drawingenemies[p][2]][2]) {
      drawingenemies[p][0] -= vbx;
    } else {
      drawingenemies[p][0] = enemies[stageid][drawingenemies[p][2]][2];
      enemies[stageid][drawingenemies[p][2]][4] = true;
    }
  }
  //Y-Movement
  if (enemies[stageid][drawingenemies[p][2]][11]) {
    if (drawingenemies[p][1] + vby <= enemies[stageid][drawingenemies[p][2]][10]) {
      drawingenemies[p][1] += vby;
    } else {
      drawingenemies[p][1] = enemies[stageid][drawingenemies[p][2]][10];
      enemies[stageid][drawingenemies[p][2]][11] = false;
    }
  } else {
    if (drawingenemies[p][1] - vby >= enemies[stageid][drawingenemies[p][2]][9]) {
      drawingenemies[p][1] -= vby;
    } else {
      drawingenemies[p][1] = enemies[stageid][drawingenemies[p][2]][9];
      enemies[stageid][drawingenemies[p][2]][11] = true;
    }
  }
}

function activeEnemies() {
  if (enemiesCounter >= 0) {
    for (var p = 0; p <= enemiesCounter; p++) {
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
  text(player.life, 82, 65);
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
  for (var l = 0; l <= enemiesCounter; l++) {
    if (enemies[stageid][drawingenemies[l][2]][5] === 2) esize = 150; else esize = 60;
    if (enemies[stageid][drawingenemies[l][2]][5] === 1 && enemies[stageid][drawingenemies[l][2]][7] > 0) {
      if (player.x + spos >= enemies[stageid][drawingenemies[l][2]][0] - 500 && player.x + spos <= enemies[stageid][drawingenemies[l][2]][0] + 500 && enemies[stageid][drawingenemies[l][2]][6] === 0) {
        enemies[stageid][drawingenemies[l][2]][6]++;
        newBullet(l);
      } else if (enemies[stageid][drawingenemies[l][2]][6] > 0 && enemies[stageid][drawingenemies[l][2]][6] < 60 * ttshot + 1) enemies[stageid][drawingenemies[l][2]][6]++;
      else if (enemies[stageid][drawingenemies[l][2]][6] === 60 * ttshot + 1) enemies[stageid][drawingenemies[l][2]][6] = 0;
    }
    if (enemies[stageid][drawingenemies[l][2]][7] > 0) {
      if (player.y <= drawingenemies[l][1] + esize - player.sy && player.y >= drawingenemies[l][1] - player.sy) {
        if (player.x >= drawingenemies[l][0] - spos - player.sx && player.x <= drawingenemies[l][0] + esize - spos) {
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
      if (bullets[j][1] <= player.y + player.sy + bullets[j][2] / 2 && bullets[j][1] >= player.y - bullets[j][2] / 2) {
        if (bullets[j][0] >= player.x + spos - bullets[j][2] / 2 && bullets[j][0] <= player.x + spos + player.sx + bullets[j][2] / 2) {
          bullets[j][5] = false;
          lifePoints(-1, -1);
        }
      }
    }
  }
}

function lifePoints(id, number) {
  if (id === -1 && !player.nodamage) {
    player.life += number;
    player.nodamage = true;
  } else if (id >= 0) {
    enemies[stageid][id][7] += number;
  }
  if (player.life === 0) lose();
}

function nodamage() {
  player.godtime++;
  if (player.godtime % 10 === 0) {
    rect(player.x, player.y, player.sx, player.sy);
    if (direction[0] && direction[2]) {
      image(pistol[1], player.x + 25, player.y);
    } else if (direction[0] && direction[3]) {
      image(pistol[2], player.x + 25, player.y + 20);
    } else if (direction[1] && direction[2]) {
      image(pistol[4], player.x - 12, player.y);
    } else if (direction[1] && direction[3]) {
      image(pistol[5], player.x - 7, player.y + 20);
    } else if (direction[0]) {
      image(pistol[0], player.x + 25, player.y + 20);
    } else if (direction[1]) {
      image(pistol[3], player.x - 19, player.y + 20);
    }
  }
  if (player.godtime === 60 * 1.5) {
    player.nodamage = false;
    player.godtime = 0;
  }
}

function drawSpikes() {
  i = Math.max(sstart - 1, 0);
  do {
    if (player.pos - resx > spikes[stageid][i][0]) sstart = i;
    //DOWN
    if (spikes[stageid][i][2] === 0) triangle(spikes[stageid][i][0] - spos - swidth, spikes[stageid][i][1], spikes[stageid][i][0] - spos + swidth, spikes[stageid][i][1], spikes[stageid][i][0] - spos, spikes[stageid][i][1] + sheight);

    //UP
    else if (spikes[stageid][i][2] === 1) triangle(spikes[stageid][i][0] - spos + swidth, spikes[stageid][i][1], spikes[stageid][i][0] - spos - swidth, spikes[stageid][i][1], spikes[stageid][i][0] - spos, spikes[stageid][i][1] - sheight);

    //LEFT
    else if (spikes[stageid][i][2] === 2) triangle(spikes[stageid][i][0] - spos, spikes[stageid][i][1] + swidth, spikes[stageid][i][0] - spos, spikes[stageid][i][1] - swidth, spikes[stageid][i][0] - spos - sheight, spikes[stageid][i][1]);

    //RIGHT
    else if (spikes[stageid][i][2] === 3) triangle(spikes[stageid][i][0] - spos, spikes[stageid][i][1] - swidth, spikes[stageid][i][0] - spos, spikes[stageid][i][1] + swidth, spikes[stageid][i][0] - spos + sheight, spikes[stageid][i][1]);
    i++;
  } while (i < maxs[stageid] && player.pos + resx >= spikes[stageid][i][0])
}

function spikesCollision() {
  for (i = sstart; i < maxs[stageid]; i++) {
    //Spikes UP AND DOWN
    if ((spikes[stageid][i][2] === 0 || spikes[stageid][i][2] === 1) && (player.pos >= spikes[stageid][i][0] - swidth - player.sx && player.pos <= spikes[stageid][i][0] + swidth)) {

      switch (spikes[stageid][i][2]) {
        case 0:
          //DOWN
          if (player.y > spikes[stageid][i][1]) spikeBorderCollision(0);
          break;
        case 1:
          //UP
          if (player.y < spikes[stageid][i][1]) spikeBorderCollision(1);
          break;
      }

    } else
    //Spikes LEFT AND RIGHT
    if (player.y >= spikes[stageid][i][1] - swidth && player.y <= spikes[stageid][i][1] + swidth) {

      switch (spikes[stageid][i][2]) {
        case 2:
          //LEFT
          if (player.pos >= spikes[stageid][i][0] - sheight - player.sx && player.pos <= spikes[stageid][i][0] + player.sx) spikeBorderCollision(2);
          break;
        case 3:
          //RIGHT
          if (player.pos >= spikes[stageid][i][0] && player.pos <= spikes[stageid][i][0] + sheight) spikeBorderCollision(3);
          break;
      }
    }
  }
}

function countPoints() {
  for (var k = 1; k <= player.life; k++) score[stageid] += 75;
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
      return Math.round(sheight * (swidth - spikes[stageid][i][0] + player.pos + player.sx) / swidth);
    case 1:
      //RIGHT
      return Math.round(sheight * (spikes[stageid][i][0] + swidth - player.pos) / swidth);
    case 2:
      //DOWN
      return Math.round(sheight * (swidth - player.y + spikes[stageid][i][1]) / swidth);
    case 3:
      //UP
      return Math.round(sheight * (swidth + player.y + player.sy - spikes[stageid][i][1]) / swidth);
  }
}

function spikeBorderCollision(d) {
  var a = 0;

  switch (d) {
    case 0:
      //DOWN
      if (player.pos + player.sx < spikes[stageid][i][0]) {
        //LEFT
        a = spikeBladeHeight(0);
        if (spikes[stageid][i][1] + a > player.y)
          lifePoints(-1, -1);
      } else if (player.pos >= spikes[stageid][i][0]) {
        //RIGHT
        a = spikeBladeHeight(1);
        if (spikes[stageid][i][1] + a > player.y)
          lifePoints(-1, -1);
      } else {
        //CENTER
        if (spikes[stageid][i][1] + player.sy > player.y) {
          lifePoints(-1, -1);
        }
      }
      break;

    case 1:
      //UP
      if (player.pos + player.sx < spikes[stageid][i][0]) {
        //LEFT
        a = spikeBladeHeight(0);
        if (spikes[stageid][i][1] - a < player.y + player.sy)
          lifePoints(-1, -1);
      } else if (player.pos >= spikes[stageid][i][0]) {
        //RIGHT
        a = spikeBladeHeight(1);
        if (spikes[stageid][i][1] - a < player.y + player.sy)
          lifePoints(-1, -1);
      } else {
        //CENTER
        if (spikes[stageid][i][1] - player.sy < player.y + player.sy) {
          lifePoints(-1, -1);
        }
      }
      break;

    case 2:
      //LEFT
      if (player.y > spikes[stageid][i][1]) {
        //DOWN
        a = spikeBladeHeight(2);
        if (player.pos + player.sx >= spikes[stageid][i][0] - a)
          lifePoints(-1, -1);
      } else if (player.y + player.sy > spikes[stageid][i][1]) {
        //UP
        a = spikeBladeHeight(3);
        if (player.pos + player.sx >= spikes[stageid][i][0] - a)
          lifePoints(-1, -1);
      } else {
        //CENTER
        if (player.pos + player.sx >= spikes[stageid][i][0] - sheight)
          lifePoints(-1, -1);
      }
      break;

    case 3:
      //RIGHT
      if (player.y > spikes[stageid][i][1]) {
        //DOWN
        a = spikeBladeHeight(2);
        if (player.pos <= spikes[stageid][i][0] + a)
          lifePoints(-1, -1);
      } else if (player.y + player.sy > spikes[stageid][i][1]) {
        //UP
        a = spikeBladeHeight(3);
        if (player.pos <= spikes[stageid][i][0] + a)
          lifePoints(-1, -1);
      } else {
        //CENTER
        if (player.pos <= spikes[stageid][i][0] + sheight)
          lifePoints(-1, -1);
      }
      break;
  }
}
