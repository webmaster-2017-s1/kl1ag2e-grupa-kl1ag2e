// kod projektu Gra Platformowa
//Canvas Resolutnion
var resx = 1366;
var resy = 768;

function Game() {
  //Screen rendering
  this.mode = 0;
  //Scene position
  this.spos = 0;
  //Gravitation
  this.grav = 7;

  //Size of Bullets
  // this.bulletSize = 15;
  //MAx number of Bullets
  // this.bulletMax = 10;
  // //Bullets speed
  // this.bulletSpeed = 12;
  // //Bullets life in seconds
  // this.bulletLife = 5;

  this.rstart = 0;

  this.cstart = 0;
  this.sstart = 0;
  this.estart = 0;


  this.esize = 60;

//Enemy speed
  this.espeed = 2;

//Every second the opponent can shoot
  this.ttshot = 2;

  this.minutes = 3;
  this.seconds = 0;
  this.tcounter = 0;
  this.maxtime = this.minutes * 60 + this.seconds;


  //Bullets size
  this.bsize = 12;
//Max number of bullets
  this.bmax = 10;
//Bullets speed
  this.bspeed = 12;
//Bullets life in seconds
  this.blife = 5;


//Number of shot
  this.noshot = 0;
  this.score = [];


  // this.enemiesCounter = -1;
//Time to drop Enemy
  this.tdrop = 0;


  //Minimum player position X-AXIS
  this.minx = 0;
//Maximum player position X-AXIS
  this.maxx = 99999;
//Minimum player position Y-AXIS
  this.miny = 0;
//Maximum player position Y-AXIS
  this.maxy = 999999;
//(FOR DEBUG)Maximum platform Y-AXIS
  this.maxid = 0;
//(FOR DEBUG)Minimum platform Y-AXIS
  this.minid = -1;
//(FOR DEBUG)Maximum platform X-AXIS
  this.xmaxid = -1;
//(FOR DEBUG)Minimum platform X-AXIS
  this.xminid = -1;


  // this.lastp = 0;


  this.lifePoints = function (id, number) {
    if (id === -1 && !player.nodamage) {
      player.life += number;
      player.nodamage = true;
    } else if (id >= 0) {
      oenemies[id].life += number;
    }
    if (player.life === 0) this.lose();
  };


  this.selectNotUsedEnemy = function () {
    i = 1;
    while (oenemies[i].life !== 0) {
      i++;
      if (i >= maxe[stageid]) return -1;
    }
    return i;
  };

  //Load Platforms Spikes and Enemies&Clear Bullets
  this.loadStage = function (n) {
//Load Platforms
    oplatforms = [];
    ospikes = [];
    oenemies = [];
    //Make platforms objects array
    for (i = 0; i < maxp[n]; i++) {
      oplatforms.push(new Platform(
        platforms[n][i][0],
        platforms[n][i][1],
        platforms[n][i][2],
        platforms[n][i][3]
      ))
    }

    //Load Spikes
    for (i = 0; i < maxs[n]; i++) {
      ospikes.push(new Spike(
        spikes[n][i][0],
        spikes[n][i][1],
        spikes[n][i][2]
      ))
    }

    //Load Enemies
    for (i = 0; i < maxe[n]; i++) {
      oenemies.push(new Enemy(
        enemies[n][i][0],
        enemies[n][i][1],
        enemies[n][i][2],
        enemies[n][i][3],
        enemies[n][i][4],
        enemies[n][i][5],
        enemies[n][i][6],
        enemies[n][i][7],
        enemies[n][i][8],
        enemies[n][i][9],
        enemies[n][i][10],
        enemies[n][i][11],
        enemies[n][i][12]
      ))
    }

    for (i = 0; i < 30; i++) {
      obullets[i] = new Bullet();
    }
  };

  //New Game
  this.newGame = function () {
    this.loadStage(0);
    this.restartGame();
    this.mode = 1;

  };

  this.continueGame = function () {
    var level = this.getCookieToInt("level");
    if (level > 0) {
      stageid = level;
      this.restartGame();
      this.mode = 1;
    }

  };

  this.getLastPlatform = function () {
    return platforms[stageid][maxp[stageid] - 1][0] + platforms[stageid][maxp[stageid] - 1][2] - resx / 2;
  };

  this.writeLastLevel = function () {
    //Write Last Level to Cookie
    document.cookie = "level=" + stageid + "; expires=Sat, 17 Aug 2019 10:45:00 UTC+01:00";
  };

  this.countPoints = function () {
    for (var k = 1; k <= player.life; k++) score[stageid] += 75;
    var points = (60 * this.minutes + this.seconds) * 300 / this.maxtime;
    if (this.noshot === 0) this.noshot++;
    var points2 = 350 / this.noshot;
    score[stageid] = score[stageid] + points + points2;
    score[stageid] = Math.round(score[stageid]);
  };


  this.drawTimer = function () {
    if (this.tcounter < 59) this.tcounter++;
    else if (this.tcounter === 59) {
      this.tcounter = 0;
      this.seconds--;
      if (this.minutes === 0 && this.seconds === 0) this.lose();
      if (this.seconds === -1) {
        this.seconds = 59;
        this.minutes--;
      }
    }
    text(this.minutes, 647, 65);
    text(':', 682, 65);
    if (this.seconds > 9) {
      text(this.seconds, 707, 65);
    } else {
      text('0', 707, 65);
      text(this.seconds, 732, 65);
    }
  };


  this.drawHUD = function () {
    image(heart, 25, 25);
    textSize(45);
    fill('black');
    text(player.life, 82, 65);
    this.drawTimer();
    fill('#FFFFFF');
  };

  this.drawEnemies = function () {
    var r = Math.max(this.estart - 2, 0);
    while (r < maxe[stageid] && player.pos + resx >= oenemies[r].x) {
      if (player.pos - resx / 2 > oenemies[r].x) this.estart = r;
      //OOP
      if (oenemies[r].life > 0) {
        oenemies[r].draw();
        if (oenemies[r].type === 2) {
          //Move Boss
          oenemies[r].moveBoss();
          //Drop Enemy
          if (this.tdrop > 180 && this.selectNotUsedEnemy() !== -1) {
            this.tdrop = 0;
            oenemies[this.selectNotUsedEnemy()].drop();
            // dropEnemy(this.selectNotUsedEnemy());
          } else this.tdrop++;

        } else {
          //Movie Enemies(other than Boss)
          if (emaxy > oenemies[r].y && stageid === 3) {
            //If Enemy is falling (move in X and Y Axis)
            oenemies[r].fall();
          } else
            oenemies[r].move();
        }
        //Shoot
        oenemies[r].shoot(r);

        for (j = 0; j < 30; j++) {
          if (obullets[j].drawing) obullets[j].damageEnemy(r);
        }

      }
      r++;
    }
  };


  this.restartGame = function () {
    this.writeLastLevel();
    player.x = 100;
    player.pos = 100;
    this.spos = 0;
    player.y = 100;
    player.rise = false;
    player.jumpcounter = false;
    this.rstart = 0;
    this.cstart = 0;
    this.estart = 0;
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
    for (j = 0; j < this.bmax; j++) obullets[j].drawing = 0;
    this.seconds = 0;
    this.minutes = 3;
    score[stageid] = 0;
    this.noshot = 0;
    this.lastp = this.getLastPlatform();
    this.sstart = 0;
  };


  this.lose = function () {
    textSize(50);
    fill('#FF0000');
    text("GAME OVER", resx / 2, resy / 2);
    fill('#FFFFFF');
    this.paused = true;
    this.restartGame();
  };


  this.newBullet = function (enumber) {
    for (j = 0; j < obullets.length; j++) {
      if (!obullets[j].drawing) {
        obullets[j].create(enumber);
        break;
      }
    }
  };


  this.drawBullets = function () {
    for (i = 0; i < 30; i++) {
      if (obullets[i].drawing) {
        obullets[i].draw();
      }
    }
  };

  this.physics = function () {
    player.collision();
    // debugcollision(this.maxid, this.minid, this.xmaxid, this.xminid); //Uncomment to debug collision
    player.gravity(this.maxy, this.maxid);

    if (player.rise) player.jump();

    //TODO BulletsCollision
    // this.bulletsCollision();
    // damage();


    //Damage Player
    for (j = 0; j < this.bmax; j++) {
      obullets[j].damagePlayer();
    }

    //Damage Enemies

    for (i = 0; i < maxe[stageid]; i++) {

    }

    player.enemiesCollision();
    player.spikesCollision();
    player.checkIfUnderScreen();
  };

  this.drawObjects = function () {
    player.draw();
    //Draw Platforms
    i = Math.max(this.rstart - 2, 0);
    do {
      if (player.pos - resx > oplatforms[i].x) this.rstart = i;
      if (i === maxp[stageid] - 1) fill('#00FF00'); else fill('#0000FF');
      oplatforms[i].draw();
      i++;
    } while (i < maxp[stageid] && player.pos + resx >= oplatforms[i].x);
    fill('#FFFFFF');


    this.drawEnemies();

    // Draw Spikes
    i = Math.max(this.sstart - 1, 0);
    do {
      if (player.pos - resx > spikes[stageid][i][0]) this.sstart = i;
      ospikes[i].draw();
      i++;
    } while (i < maxs[stageid] && player.pos + resx >= ospikes[i].x);

    this.drawBullets();
    this.drawHUD();
  };

  this.stageCompleted = function () {
    textSize(50);
    fill('#000000');
    text("Congratulations!!!", 500, 100);
    text("Your score:", 575, 175);
    text(score, 640, 250);
    text("Level " + (stageid + 1) + " Completed", 500, 400);
    text("Press SPACE to Continue", 500, 700);
    fill('#FFFFFF');
  };

  this.pause = function () {
    textSize(50);
    fill("#00FF00");
    text("WIP. Press Space to Continue :)", 50, 50);
    fill('#FFFFFF');
  };

  this.completed = false;
  this.paused = false;

  this.play = function () {
    if (!(this.completed || this.paused)) {
      background(200);
      this.drawObjects();
      this.physics();
    } else if (this.completed) this.stageCompleted(); else this.pause();
  };

  this.getCookieToInt = function () {
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
  };

}

var game = new Game();

function Menu() {
//***Inmenu Buttons
//Buttons' X-pos
  this.btnx = 483;
//Buttons' width
  this.btnwidth = 400;
//Buttons' height
  this.btnheight = 75;
//Buttons' Y-pos
  this.btny = [300, 400, 500, 600];
//Buttons' Text
  this.btntext = ['New Game', 'Continue', 'Controls', 'Credits'];
//Active button id
  this.btnid = 0;
//Credits X-pos
  this.creditsx = 483;
//Credits scroll variable
  this.creditsy = 800;
//Credits' strings
  this.credits = [];
  this.credits[0] = "Credits";
  this.credits[1] = "Project Manager";
  this.credits[2] = "Marcin Zasuwa";
  this.credits[3] = "Programmers";
  this.credits[4] = "Marcin Saja";
  this.credits[5] = "Jakub Mazur";
  this.credits[6] = "Level Designer";


  this.draw = function () {
    this.checkMousePos();
    background(200);
    textSize(50);
    textStyle(BOLD);

    fill("#000000");
    text("Platformer Game", 483, 100);

    this.drawButtons(this.btnid);
    textStyle(NORMAL);
  };

  this.drawCredits = function () {
    if (this.creditsy > 125)
      this.creditsy -= 2;
    background(200);
    textSize(50);
    textStyle(BOLD);
    fill("#0000FF");
    text(this.credits[0], this.creditsx, this.creditsy); //Credits
    fill("#FF0000");
    text(this.credits[1], this.creditsx, this.creditsy + 100); //Project Manager
    fill("#000000");
    text(this.credits[2], this.creditsx, this.creditsy + 150); //Marcin Zasuwa
    fill("#FF0000");
    text(this.credits[3], this.creditsx, this.creditsy + 250); //Programmers
    fill("#000000");
    text(this.credits[2], this.creditsx, this.creditsy + 300); //Marcin Zasuwa
    text(this.credits[4], this.creditsx, this.creditsy + 350); //Marcin Saja
    text(this.credits[5], this.creditsx, this.creditsy + 400); //Jakub Mazur
    fill("#FF0000");
    text(this.credits[6], this.creditsx, this.creditsy + 500); //Level Designer
    fill("#000000");
    text(this.credits[5], this.creditsx, this.creditsy + 550); //Jakub Mazur
  };

  this.selection = function (a) {
    if (game.mode === 0) {
      switch (a) {
        case 0:
          //New Game
          game.newGame();
          break;
        case 1:
          //Continue
          game.continueGame();
          break;
        case 2:
          //Tutorial
          // stageid = 2;
          // inmenu = false;
          break;
        case 3:
          //Credits
          this.creditsy = 800;
          game.mode = 2;
          break;
      }
      cursor(ARROW);
    }
  };

  this.drawButtons = function (btnid) {

    textSize(30);
    for (i = 0; i < this.btny.length; i++) {
      if (btnid === i) fill("#00FF00"); else fill("#FFFFFF");
      rect(this.btnx, this.btny[i], this.btnwidth, this.btnheight);
      fill("#000000");
      text(this.btntext[i], this.btnx + 60, this.btny[i] + 50);
      fill("#FFFFFF");
    }
  };

  this.checkMousePos = function () {
    //Check button vertical
    //Refresh cursor status
    cursor(ARROW);
    if (mouseX >= this.btnx && mouseX <= this.btnx + this.btnwidth) {
      for (i = 0; i < this.btny.length; i++) {
        if (mouseY >= this.btny[i] && mouseY <= this.btny[i] + this.btnheight) {
          cursor(HAND);
          this.btnid = i;
          return i;
        }
      }

    }
    return -1;
  }


}

var menu = new Menu();

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
  //Jump Speed
  this.jumpspeed = 20;
  //Maximum Jump
  this.maxjumpheight = 310;
  //Current Jump Height
  this.jumpcounter = 0;

  this.direction = 4;


  //Draw
  this.draw = function () {
    //Draw
    if (this.godtime % 10 === 0) {
      rect(this.x, this.y, this.sx, this.sy);
      //Draw Pistol
      switch (this.direction) {
        //DOWN-LEFT
        case 0:
          image(pistol[5], this.x - 7, this.y + 20);
          break;
        //Left
        case 1:
          image(pistol[3], this.x - 19, this.y + 20);
          break;
        //UP-LEFT
        case 2:
          image(pistol[4], this.x - 12, this.y);
          break;
        //UP-RIGHT
        case 3:
          image(pistol[1], this.x + 25, this.y);
          break;
        //Right
        case 4:
          image(pistol[0], this.x + 25, this.y + 20);
          break;
        //DOWN-RIGHT
        case 5:
          image(pistol[2], this.x + 25, this.y + 20);
          break;
      }

    }
    if (this.nodamage) {
      this.godtime++;
      if (this.godtime === 60 * 1.5) {
        this.nodamage = false;
        this.godtime = 0;
      }
    }
  };
  //Move
  this.move = function (vector) {
    if (vector === 1) {
      //--->RIGHT
      if (this.pos + this.sx - 1 < game.maxx) {
        if (game.maxx - this.pos - this.sx < this.speedx) {
          this.pos = game.maxx - this.sx - 1;
          if (game.spos <= 0) this.x = this.pos; else if (this.pos > game.lastp) this.x = resx - (oplatforms[maxp[stageid] - 1].x + oplatforms[maxp[stageid] - 1] - this.pos); else this.x = resx / 2;
        } else {
          if (game.spos <= 0 || this.pos > game.lastp) this.x += this.speedx; else this.x = resx / 2;
          this.pos += this.speedx;
        }
        if (this.pos < resx / 2) game.spos = 0; else if (this.pos <= game.lastp) game.spos = this.pos - resx / 2;
      }
    } else {
      //<--- LEFT
      if (this.pos + 1 > game.minx) {
        if (this.pos - game.minx < this.speedx) {
          this.pos = game.minx + 1;
          if (game.spos <= 0) this.x = this.pos; else if (this.pos > game.lastp) this.x = resx - (oplatforms[maxp[stageid] - 1].x + oplatforms[maxp[stageid] - 1].width - this.pos); else this.x = resx / 2;
        } else {
          this.pos -= this.speedx;
          if (this.pos > game.lastp) this.x -= this.speedx; else this.x = resx / 2
        }
        if (game.spos <= 0) this.x = this.pos;
        if (this.pos < resx / 2) game.spos = 0; else if (this.pos <= game.lastp) game.spos = this.pos - resx / 2;
      }
    }

  };
  //Jump
  this.jump = function () {
    if (this.rise && this.jumpcounter < this.maxjumpheight - this.jumpspeed) {
      if (game.miny + 1 < this.y - this.jumpspeed) {
        this.y -= this.jumpspeed;
        this.jumpcounter += this.jumpspeed;
      } else {
        this.y = game.miny + 1;
        this.rise = false;
      }
    } else this.rise = false;
    return 0;
  };

  //Gravity
  this.gravity = function (maxy, maxid) {
    if (maxy - 1 > this.y + this.sy) {
      if (maxy - 1 > this.y + this.sy + game.grav)
        this.y += game.grav;
      else
        this.y = maxy - this.sy - 1;
    } else {
      if (maxid === maxp[stageid] - 1) {
        game.completed = true;
        game.countPoints();
      }
    }
  };

  //Check if on Air
  this.onair = function () {
    return this.y + this.sy + game.grav < game.maxy;
  };

  this.checkIfUnderScreen = function () {
    if (this.y + this.sy >= resy) game.lose();
  };

  this.collision = function () {
    game.maxy = 999999;
    game.maxid = 0;
    game.miny = 0;
    game.minid = -1;
    game.maxx = 999999;
    game.xmaxid = -1;
    game.minx = 0;
    game.xminid = -1;
    i = Math.max(game.cstart - 2, 0);
    // console.log(i, maxp[stageid]);
    do {
      if (this.pos - resx / 2 > oplatforms[i].x) game.cstart = i;
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
  };

  this.spikesCollision = function () {
    i = Math.max(game.sstart - 2, 0);
    do {
      if (this.pos - resx > spikes[stageid][i][0]) game.sstart = i;
      ospikes[i].spikesCollision();
      i++;
    } while (i < maxs[stageid] && this.pos + resx >= ospikes[i].x);
  };

  this.enemiesCollision = function () {
    i = Math.max(game.estart - 2, 0);
    do {
      if (oenemies[i].life > 0) {
        if (this.pos - resx / 2 > oenemies[i].x) game.estart = i;
        oenemies[i].collision();
      }
      i++;
    } while (i < maxe[stageid] && this.pos + resx / 4 >= oenemies[i].x);

  }


}

var player = new Player();

var oplatforms = [];

function Platform(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.draw = function () {
    rect(this.x - game.spos, this.y, this.width, this.height);
  };

  this.collisionLeft = function () {
    if (this.x < game.maxx) {
      game.maxx = this.x;
      game.xmaxid = i;
    }
  };

  this.collisionRight = function () {
    if (this.x + this.width <= player.pos) {
      if (this.x >= game.minx) {
        game.minx = this.x + this.width;
        game.xminid = i;
      }
    }
  };

  this.collisionTop = function () {
    if (this.y < game.maxy) {
      game.maxy = this.y;
      game.maxid = i;
    }
  };

  this.collisionBottom = function () {
    if (this.y + this.height < player.y) {
      if (this.y + this.height > game.miny) {
        game.miny = this.y + this.height;
        // jheight = Math.min(game.miny, 150);
        game.minid = i;
      }
    }
  }
}

var ospikes = [];

function Spike(x, y, type) {
  this.x = x;
  this.y = y;
  this.type = type;


  this.draw = function () {

    switch (this.type) {
      case 0:
        triangle(this.x - game.spos - swidth, this.y, this.x - game.spos + swidth, this.y, this.x - game.spos, this.y + sheight);
        break;
      case 1:
        triangle(this.x - game.spos + swidth, this.y, this.x - game.spos - swidth, this.y, this.x - game.spos, this.y - sheight);
        break;
      case 2:
        triangle(this.x - game.spos, this.y + swidth, this.x - game.spos, this.y - swidth, this.x - game.spos - sheight, this.y);
        break;
      case 3:
        triangle(this.x - game.spos, this.y - swidth, this.x - game.spos, this.y + swidth, this.x - game.spos + sheight, this.y);
        break;
    }
  };

  this.detectBorder = function (type) {
    var a = 0;
    switch (type) {
      case 0:
        //DOWN
        if (player.pos + player.sx < this.x) {
          //LEFT
          a = this.bladeHeight(0);
          if (this.y + a > player.y)
            game.lifePoints(-1, -1);
        } else if (player.pos >= this.x) {
          //RIGHT
          a = this.bladeHeight(1);
          if (this.y + a > player.y)
            game.lifePoints(-1, -1);
        } else {
          //CENTER
          if (this.y + player.sy > player.y) {
            game.lifePoints(-1, -1);
          }
        }
        break;

      case 1:
        //UP
        if (player.pos + player.sx < this.x) {
          //LEFT
          a = this.bladeHeight(0);
          if (this.y - a < player.y + player.sy)
            game.lifePoints(-1, -1);
        } else if (player.pos >= this.x) {
          //RIGHT
          a = this.bladeHeight(1);
          if (this.y - a < player.y + player.sy)
            game.lifePoints(-1, -1);
        } else {
          //CENTER
          if (this.y - player.sy < player.y + player.sy) {
            game.lifePoints(-1, -1);
          }
        }
        break;

      case 2:
        //LEFT
        if (player.y > this.y) {
          //DOWN
          a = this.bladeHeight(2);
          if (player.pos + player.sx >= this.x - a)
            game.lifePoints(-1, -1);
        } else if (player.y + player.sy > this.y) {
          //UP
          a = this.bladeHeight(3);
          if (player.pos + player.sx >= this.x - a)
            game.lifePoints(-1, -1);
        } else {
          //CENTER
          if (player.pos + player.sx >= this.x - sheight)
            game.lifePoints(-1, -1);
        }
        break;

      case 3:
        //RIGHT
        if (player.y > this.y) {
          //DOWN
          a = this.bladeHeight(2);
          if (player.pos <= this.x + a)
            game.lifePoints(-1, -1);
        } else if (player.y + player.sy > this.y) {
          //UP
          a = this.bladeHeight(3);
          if (player.pos <= this.x + a)
            game.lifePoints(-1, -1);
        } else {
          //CENTER
          if (player.pos <= this.x + sheight)
            game.lifePoints(-1, -1);
        }
        break;
    }
  };

  this.bladeHeight = function (part) {
    switch (part) {
      case 0:
        //LEFT
        return Math.round(sheight * (swidth - this.x + player.pos + player.sx) / swidth);
      case 1:
        //RIGHT
        return Math.round(sheight * (this.x + swidth - player.pos) / swidth);
      case 2:
        //DOWN
        return Math.round(sheight * (swidth - player.y + this.y) / swidth);
      case 3:
        //UP
        return Math.round(sheight * (swidth + player.y + player.sy - this.y) / swidth);
    }
  };

  this.spikesCollision = function () {
    if ((this.type === 0 || this.type === 1) && (player.pos >= this.x - swidth - player.sx && player.pos <= this.x + swidth)) {

      switch (this.type) {
        case 0:
          //DOWN
          if (player.y > this.y) ospikes[i].detectBorder(0);
          break;
        case 1:
          //UP
          if (player.y < this.y) ospikes[i].detectBorder(1);
          break;
      }

    } else
//Spikes LEFT AND RIGHT
    if (player.y >= this.y - swidth && player.y <= this.y + swidth) {

      switch (this.type) {
        case 2:
          //LEFT
          if (player.pos >= this.x - sheight - player.sx && player.pos <= this.x + player.sx) ospikes[i].detectBorder(2);
          break;
        case 3:
          //RIGHT
          if (player.pos >= this.x && player.pos <= this.x + sheight) ospikes[i].detectBorder(3);
          break;
      }
    }
  }


}

var oenemies = [];

function Enemy(x, y, eminx, emaxx, direction, type, time, life, drawing, miny, maxy, vector, target) {
  this.x = x;
  this.y = y;
  this.minx = eminx;
  this.maxx = emaxx;
  this.direction = direction;
  this.type = type;
  this.time = time;
  this.life = life;
  this.drawing = drawing;

  if (stageid === 3) {
    this.miny = miny;
    this.maxy = maxy;
    this.vector = vector;
    this.target = target;
  }


  this.draw = function () {
    var k = 0;
    image(livebar, this.x - game.spos + 3, this.y - 19);

//Draw Life Bars
    switch (this.type) {
      case 0:
        image(enemyimg, this.x - game.spos, this.y);
        for (j = 0; j < this.life; j++) {
          image(bar2, this.x - game.spos + 6 + k, this.y - 16);
          k += 16;
        }
        break;

      case 1:
        image(enemyimg2, this.x - game.spos, this.y);
        for (j = 0; j < this.life; j++) {
          image(bar1, this.x - game.spos + 6 + k, this.y - 16);
          k += 24;
        }
        break;

      case 2:
        image(boss, this.x - game.spos, this.y);
        for (j = 0; j < this.life; j++) {
          image(bar1, this.x - game.spos + 6 + k, this.y - 16);
          k += 24;
        }
        break;
    }
  };


  this.move = function () {
    //X-AXIS
    if (this.direction) {
      //Right--->
      if (this.maxx - this.x - game.esize <= game.espeed) {
        this.x = this.maxx - game.esize;
        this.direction = false;
      } else {
        this.x += game.espeed;
      }
    } else {
      //Left <---
      if (this.x - this.minx <= game.espeed) {
        this.x = this.minx;
        this.direction = true;
      } else {
        this.x -= game.espeed;
      }
    }
  };


  this.fall = function () {
    if (this.type !== 2) {
      //Move Y-Axis
      if (this.y + vey <= emaxy) this.y += vey; else this.y = emaxy;

      //Move X-Axis
      if (this.vector > 0) {
        //Move to right--->
        if (this.x + this.vector <= this.target) {
          this.x += this.vector;
        }
      }
      //Move to left
      if (this.x - this.vector >= this.target) {
        this.x += this.vector;
      }

    }
  };
  this.moveBoss = function () {
    //X-Movement
    if (this.direction) {
      if (this.x - vbx < this.maxx) {
        this.x += vbx;
      } else {
        this.x = this.maxx;
        this.direction = false;
      }
    } else {
      if (this.x - vbx > this.minx) {
        this.x -= vbx;
      } else {
        this.x = this.minx;
        this.direction = true;
      }
    }
    //Y-Movement
    if (this.vector) {
      if (this.y + vby <= this.maxy) {
        this.y += vby;
      } else {
        this.y = this.maxy;
        this.vector = false;
      }
    } else {
      if (this.y - vby >= this.miny) {
        this.y -= vby;
      } else {
        this.y = this.miny;
        this.vector = true;
      }
    }
  };

  this.drop = function () {
    //Create new enemy under boss
    this.x = oenemies[0].x + 40;
    this.y = oenemies[0].y;
    //Random destination point
    this.target = Math.floor((Math.random() * 686) + 350);
    var x = this.target - this.x;
    var h = oplatforms[3].y - this.y - 60;
    this.vector = Math.floor((Math.sqrt(Math.pow(x, 2) + Math.pow(h, 2))) / (h / vey));
    //Random Enemy Type
    this.type = Math.floor((Math.random() * 2));
    //Invert Vector if x<0
    if (x < 0) this.vector *= -1;
    switch (this.type) {
      case 0:
        //Not shooting enemy
        this.time = -1;
        this.life = 3;
        break;
      case 1:
        //Shooting enemy
        this.time = 10;
        this.life = 2;
        break;
    }
  };

  this.collision = function () {
    if (this.type === 2) game.esize = 150; else game.esize = 60;
    if (player.y <= this.y + game.esize - player.sy && player.y >= this.y - player.sy) {
      if (player.x >= this.x - game.spos - player.sx && player.x <= this.x + game.esize - game.spos) {
        game.lifePoints(-1, -1);
      }
    }
  };

  this.shoot = function (l) {
    // console.log("Enemy shoot");
    if (this.type === 1 && this.life > 0) {
      if (player.x + game.spos >= this.x - 500 && player.x + game.spos <= this.x + 500 && this.time === 0) {
        this.time++;
        game.newBullet(l);
      } else if (this.time > 0 && this.time < 60 * game.ttshot + 1) this.time++;
      else if (this.time === 60 * game.ttshot + 1) this.time = 0;
    }
  }


}

var direction = [];
direction[0] = true;

var obullets = [];

for (i = 0; i < 30; i++) {
  obullets[i] = new Bullet();
}

function Bullet() {
  this.create = function (enumber) {
    //For Player
    if (enumber === -1) {
      game.noshot++;
      this.size = game.bsize;


      switch (player.direction) {
        //DOWN LEFT
        case 0:
          this.x = game.spos + player.x + 3;
          this.y = player.y + 45;
          this.direction = 3;
          break;
        //LEFT
        case 1:
          this.x = game.spos + player.x - 10;
          this.y = player.y + 25;
          this.direction = 5;
          break;

        //UP-LEFT
        case 2:
          this.x = game.spos + player.x;
          this.y = player.y + 10;
          this.direction = 2;
          break;

        //UP-RIGHT
        case 3:
          this.x = game.spos + player.x + player.sx;
          this.y = player.y + 10;
          this.direction = 0;
          break;

        //RIGHT
        case 4:
          this.x = game.spos + player.x + player.sx + 10;
          this.y = player.y + 25;
          this.direction = 4;
          break;
        //DOWN RIGHT
        case 5:
          this.x = game.spos + player.x + player.sx - 3;
          this.y = player.y + 45;
          this.direction = 1;
          break;
        default:

      }
      this.damage = false;
    }
    //For Enemy
    else {
      var a = oenemies[enumber].x + (game.esize / 2) - player.x - game.spos;
      var b = oenemies[enumber].y - player.y;
      var c = Math.pow(a, 2) + Math.pow(b, 2);
      var d = c / game.bspeed;
      this.speedx = Math.sqrt(Math.pow(a, 2) / d) * 3;
      this.speedy = Math.sqrt(Math.pow(b, 2) / d) * 3;

      if (oenemies[enumber].x + (game.esize / 2) - player.x - game.spos > 0 && oenemies[enumber].y - player.y > 0) this.direction = 6;
      else if (oenemies[enumber].x + (game.esize / 2) - player.x - game.spos > 0 && oenemies[enumber].y - player.y <= 0) this.direction = 7;
      else if (oenemies[enumber].x + (game.esize / 2) - player.x - game.spos <= 0 && oenemies[enumber].y - player.y > 0) this.direction = 8;
      else if (oenemies[enumber].x + (game.esize / 2) - player.x - game.spos <= 0 && oenemies[enumber].y - player.y <= 0) this.direction = 9;

      this.x = oenemies[enumber].x + (game.esize / 2);
      this.y = oenemies[enumber].y;
      this.size = game.bsize;
      this.damage = true;
    }
    this.life = 0;
    this.drawing = true;
  };

  this.draw = function () {
    // console.log("Direction: "+this.direction+" "+this.x+ " "+this.y);
    switch (this.direction) {
      case 0:
        this.x += game.bspeed;
        this.y -= game.bspeed;
        break;
      case 1:
        this.x += game.bspeed;
        this.y += game.bspeed;
        break;
      case 2:
        this.x -= game.bspeed;
        this.y -= game.bspeed;
        break;

      case 3:
        this.x -= game.bspeed;
        this.y += game.bspeed;
        break;
      case 4:
        this.x += game.bspeed;
        break;
      case 5:
        this.x -= game.bspeed;
        break;
      case 6:
        this.x -= this.speedx;
        this.y -= this.speedy;
        break;
      case 7:
        this.x -= this.speedx;
        this.y += this.speedy;
        break;
      case 8:
        this.x += this.speedx;
        this.y -= this.speedy;
        break;
      case 9:
        this.x += this.speedx;
        this.y += this.speedy;
        break;
    }


    if (this.damage === false) fill('white');
    else fill('red');
    ellipse(this.x - game.spos, this.y, this.size, this.size);
    fill('white');

    this.life++;
    if (this.life === 60 * game.blife) {
      this.drawing = false;
    }
  };

  this.damagePlayer = function () {

    if (this.damage && this.drawing) {
      if (this.y <= player.y + player.sy + this.size / 2 && this.y >= player.y - this.size / 2) {
        if (this.x >= player.x + game.spos - this.size / 2 && this.x <= player.x + game.spos + player.sx + this.size / 2) {
          this.drawing = false;
          game.lifePoints(-1, -1);
        }
      }
    }
  };
  this.damageEnemy = function (d) {
    // console.log(d);
    if (!this.damage && this.drawing && this.y <= oenemies[d].y + game.esize + this.size / 2 && this.y >= oenemies[d].y - this.size / 2) {
      if (this.x >= oenemies[d].x - this.size / 2 && this.x <= oenemies[d].x + game.esize + this.size / 2) {
        this.drawing = false;
        game.lifePoints(d, -1);
        if (oenemies[d].life === 0) {
          if (oenemies[d].type === 0) score[stageid] += 150;
          else score[stageid] += 250;
        }
      }
    }

  }


}

//Loop variables
var i = 0;
var j = 0;

var score = [];


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
  switch (game.mode) {
    case 0:
      //Menu
      menu.draw();
      break;
    case 1:
      //Game
      game.play();
      break;
    case 2:
      //Credits
      menu.drawCredits();
      break;
    case 3:
      //Controls
      break;

  }

}

function mouseClicked() {
  menu.selection(menu.checkMousePos());
}

function keyboardEvent() {
  if (keyIsDown(RIGHT_ARROW) && !game.paused) {
    player.move(1);
    player.direction = 4;

    direction[0] = true;
    direction[1] = false;
  }

  if (keyIsDown(LEFT_ARROW) && !game.paused) {
    player.move(-1);
    player.direction = 1;
    direction[1] = true;
    direction[0] = false;
  }

  if (player.direction <= 2) player.direction = 1; else player.direction = 4;


  if (keyIsDown(UP_ARROW)) {
    if (player.direction === 1) player.direction = 2; else player.direction = 3; //UPLEFT/UPRIGHT
  }
  direction[2] = keyIsDown(UP_ARROW);

  if (keyIsDown(DOWN_ARROW)) {
    if (player.direction === 1) player.direction = 0; else player.direction = 5;//DOWNLEFT/DOWNRIGHT
  }


  direction[3] = keyIsDown(DOWN_ARROW);

  return false;
}

function keyPressed() {
  //Z-JUMP
  if (keyCode === 90 && !game.paused) {
    if (!player.onair()) {
      player.jumpcounter = 0;
      player.rise = true;
    }
  }
  //X-Shoot
  if (keyCode === 88) {
    game.newBullet(-1);
  }

  //SPACE
  if (keyCode === 32) {
    if (game.mode === 2) game.mode = 0; //Go to Menu
    else if (game.completed) {
      //Continue
      stageid++;
      game.loadStage(stageid);
      game.completed = false;
      game.restartGame();
    } else if (game.mode !== 0) game.paused = !game.paused; //Pause/Unpause
  }
  //Enter-Select Menu Entry
  if (keyCode === 13 && game.mode === 0) {
    menu.selection(menu.btnid);
  }
  //UP_ARROW Pressed
  if (keyCode === 38 && game.mode === 0 && menu.btnid > 0) {
    menu.btnid--;
  }
  //DOWN_ARROW Pressed
  if (keyCode === 40 && game.mode === 0 && menu.btnid < 3) {
    menu.btnid++;
  }
}

function keyReleased() {
  if (keyCode === 90) {
    player.rise = false;
  }
}

// function bulletsCollision() {
//   // for (i = 0; i < maxp[stageid]; i++) {
//   //   for (j = 0; j < game.bmax; j++) {
//   //     if (bullets[j][5]) {
//   //       if (bullets[j][1] <= platforms[stageid][i][1] + platforms[stageid][i][3] + bullets[j][2] * 0.75 && bullets[j][1] >= platforms[stageid][i][1] - bullets[j][2] * 0.75) {
//   //         if (bullets[j][0] >= platforms[stageid][i][0] - bullets[j][2] * 0.75 && bullets[j][0] <= platforms[stageid][i][0] + platforms[stageid][i][2] + bullets[j][2] * 0.75) {
//   //           bullets[j][5] = false;
//   //         }
//   //       }
//   //     }
//   //   }
//   // }
// }

