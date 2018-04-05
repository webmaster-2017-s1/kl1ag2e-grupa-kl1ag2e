// kod projektu Gra Platformowa
//Canvas Resolution
var resx = 1366;
var resy = 768;

function Game() {
  //Screen rendering
  this.mode = 0;
  //Gravitation
  this.grav = 7;

  this.rstart = 0;
  this.sstart = 0;
  this.estart = 0;

  //Enemy size
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
  this.noshot = 1;
  this.score = 0;
  this.points = 0;
  this.points2 = 0;
  this.currentscore = 0;
  this.generalscore = 0;
  //Game ended
  this.ended = false;

  this.enemiescounter = 0;
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
      ));
    }

    for (i = 0; i < 30; i++) {
      obullets[i] = new Bullet();
    }
  };

  //New Game
  this.newGame = function () {
    stageid = 0;
    this.loadStage(0);
    this.restartGame();
    this.mode = 1;
  };

  this.continueGame = function () {
    var level = this.getCookieToInt("level");
    var lastresult = this.getCookieToInt("lastresult");
    if (level > 0) {
      stageid = level;
      this.generalscore = lastresult;
      this.loadStage(stageid);
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

  this.countPoints = function (type) {
    switch (type) {
      case 0:
        this.points = (60 * this.minutes + this.seconds) * 600 / this.maxtime;
        this.points2 = 500 / this.noshot;
        this.currentscore = Math.round(this.points + this.points2 + this.score);
        return this.currentscore + this.generalscore;
      case 1:
        this.generalscore += this.currentscore;
        document.cookie = "lastresult=" + this.generalscore + "; expires=Sat, 17 Aug 2019 10:45:00 UTC+01:00";
        break;
    }
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
    textAlign(CENTER);
    text(this.minutes, resx / 2 - 25, 65);
    text(':', resx / 2, 65);
    if (this.seconds > 9) {
      text(this.seconds, resx / 2 + 35, 65);
    } else {
      text('0', resx / 2 + 24, 65);
      text(this.seconds, resx / 2 + 49, 65);
    }
  };


  this.drawHUD = function () {
    image(heart, 25, 25);
    textSize(45);
    fill('black');
    textAlign(LEFT);
    text(player.life, 82, 65);
    this.drawTimer();
    textAlign(RIGHT);
    text(game.countPoints(0), 1325, 65);
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
    this.estart = 0;
    this.cstart = 0;
    player.life = 3;
    player.nodamage = false;
    player.godtime = 0;
    this.enemiescounter = 0;
    for (j = 0; j < maxe[stageid]; j++) {
      this.enemiescounter++;
      switch (oenemies[j].type) {
        case 0:
          oenemies[j].life = 3;
          break;
        case 1:
          oenemies[j].life = 2;
          break;
        case 2:
          oenemies[j].life = 75;
          break;
        default:
      }
    }
    for (j = 0; j < this.bmax; j++) obullets[j].drawing = 0;
    this.seconds = 0;
    this.minutes = 3;
    this.score = 0;
    this.noshot = 1;
    this.lastp = this.getLastPlatform();
    this.sstart = 0;
    this.newrecord = false;
  };


  this.lose = function () {
    textSize(50);
    fill('#FF0000');
    textAlign(CENTER);
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
    player.gravity(this.maxy, this.maxid);
    if (player.rise) player.jump();
    this.bulletsCollision();
    //Damage Player
    for (j = 0; j < this.bmax; j++) {
      obullets[j].damagePlayer();
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
      if (i === maxp[stageid] - 1) fill('#00FF00'); else fill('#1A791C');
      // text(i, oplatforms[i].x - game.spos, oplatforms[i].y - 20);
      oplatforms[i].draw();
      i++;
    } while (i < maxp[stageid] && player.pos + resx >= oplatforms[i].x);
    fill('#FFFFFF');


    this.drawEnemies();

    // Draw Spikes
    i = Math.max(this.sstart - 1, 0);
    do {
      fill('#B81111');
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
    textAlign(CENTER);
    text("Congratulations!!!", resx / 2, 125);
    text("Level " + (stageid + 1) + " Completed", resx / 2, 200);
    text("Your current score:", resx / 2, 365);
    text(this.generalscore, resx / 2, 420);
    text("Press SPACE to Continue", resx / 2, 750);
    fill('#FFFFFF');
  };

  this.ending = function () {
    background(200);
    textSize(50);
    textAlign(CENTER);
    fill('#000000');
    text("Congratulations you have completed the game!", resx / 2, 250);
    if (this.newrecord) {
      text("You beat your record!", resx / 2, 350);
      text("Your new record: " + this.generalscore, resx / 2, 450);
    } else {
      text("Your result: " + this.generalscore, resx / 2, 350);
      text("Your the best result: " + this.thebestresult, resx / 2, 450);
    }
    text("Press SPACE to Continue", resx / 2, 750);
    fill('#FFFFFF');
  };

  this.pause = function () {
    textAlign(CENTER);
    textSize(50);
    fill("#000000");
    text("Press Space to Continue", resx / 2, 750);
    fill('#FFFFFF');
  };

  this.completed = false;
  this.paused = false;

  this.play = function () {
    if (!(this.completed || this.paused || this.ended)) {
      background('#FFFCB6');
      this.drawObjects();
      this.physics();
    } else if (this.completed) this.stageCompleted(); else if (this.ended) this.ending(); else this.pause();
  };

  this.getCookieToInt = function (name) {
    var cookies = document.cookie.split(";");
    for (i = 0; i < cookies.length; i++) {
      if (cookies[i].charAt(0) === " ") {
        cookies[i] = cookies[i].substring(1);
      }
      if (cookies[i].indexOf(name) === 0) {
        return parseInt(cookies[i].substring(name.length + 1, cookies[i].length));
      }
    }
    return -1;
  };

  this.bulletsCollision = function () {
    for (i = 0; i < maxp[stageid]; i++) {
      for (j = 0; j < 30; j++) {
        obullets[j].collision(i);

      }
    }
  };

  this.newrecord = false;
  this.thebestresult = this.getCookieToInt("thebestresult");

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
  this.creditsx = resx / 2;
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
    textAlign(CENTER);
    text("Platformer Game", resx / 2, 100);

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
          //Controls
          game.mode = 3;
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
      textAlign(CENTER);
      text(this.btntext[i], resx / 2 - 10, this.btny[i] + 50);
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
  };

  this.drawControls = function () {
    background(200);
    fill("#000000");
    textAlign(CENTER);
    textStyle(BOLD);
    text("ARROW LEFT/RIGHT - Move Left/Right", resx / 2, 175);
    text("Z - Jump (Hold to jump higher)", resx / 2, 275);
    text("X - Shoot", resx / 2, 375);
    text("ARROW UP/DOWN - Aim", resx / 2, 475);
    text("SPACE - Continue/Pause", resx / 2, 575);
    textStyle(NORMAL);
    fill("#FFFFFF");
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
          if (game.spos <= 0) this.x = this.pos; else if (this.pos > game.lastp) this.x = resx - (oplatforms[maxp[stageid] - 1].x + oplatforms[maxp[stageid] - 1].y - this.pos); else this.x = resx / 2;
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
        game.countPoints(1);
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
    game.maxx = 999999;
    game.minx = 0;
    i = Math.max(game.cstart - 2, 0);
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
    }
  };

  this.collisionRight = function () {
    if (this.x + this.width <= player.pos) {
      if (this.x >= game.minx) {
        game.minx = this.x + this.width;
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


//Draw Life Bars
    switch (this.type) {
      case 0:
        image(lifebar, this.x - game.spos + 3, this.y - 19);
        image(enemyimg, this.x - game.spos, this.y);
        for (j = 0; j < this.life; j++) {
          image(bar2, this.x - game.spos + 6 + k, this.y - 16);
          k += 16;
        }
        break;

      case 1:
        image(lifebar, this.x - game.spos + 3, this.y - 19);
        image(enemyimg2, this.x - game.spos, this.y);
        for (j = 0; j < this.life; j++) {
          image(bar1, this.x - game.spos + 6 + k, this.y - 16);
          k += 24;
        }
        break;

      case 2:
        image(boss, this.x - game.spos, this.y);
        image(lifebar2, 383, 80);
        for (j = 0; j < this.life; j++) {
          image(bar3, 386 + k, 83);
          k += 8;
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
    game.enemiescounter++;
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
    if (this.type === 1 && this.life > 0) {
      if (player.x + game.spos >= this.x - 500 && player.x + game.spos <= this.x + 500 && this.time === 0) {
        this.time++;
        game.newBullet(l);
      } else if (this.time > 0 && this.time < 60 * game.ttshot + 1) this.time++;
      else if (this.time === 60 * game.ttshot + 1) this.time = 0;
    }
  }


}

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
    if (oenemies[d].type === 2) game.esize = 150; else game.esize = 60;
    if (!this.damage && this.drawing && this.y <= oenemies[d].y + game.esize + this.size / 2 && this.y >= oenemies[d].y - this.size / 2) {
      if (this.x >= oenemies[d].x - this.size / 2 && this.x <= oenemies[d].x + game.esize + this.size / 2) {
        this.drawing = false;
        game.lifePoints(d, -1);
        if (oenemies[d].life === 0) {
          game.enemiescounter--;
          if (stageid === 3 && game.enemiescounter === 0) {
            game.ended = true;
            game.countPoints(1);
            if (game.thebestresult < game.generalscore) {
              document.cookie = "level=0; expires=Sat, 17 Aug 2019 10:45:00 UTC+01:00";
              game.newrecord = true;
              game.thebestresult = game.generalscore;
              document.cookie = "thebestresult=" + game.thebestresult + "; expires=Sat, 17 Aug 2019 10:45:00 UTC+01:00";
            }
          }
          switch (oenemies[d].type) {
            case 0:
              game.score += 150;
              break;
            case 1:
              game.score += 250;
              break;
            case 2:
              game.score += 500;
              break;
          }
        }
      }
    }
  };


  this.collision = function (i) {
    if (this.drawing) {
      if (this.y <= oplatforms[i].y + oplatforms[i].height + this.size * 0.75 && this.y >= oplatforms[i].y - this.size * 0.75) {
        if (this.x >= oplatforms[i].x - this.size * 0.75 && this.x <= oplatforms[i].x + oplatforms[i].width + this.size * 0.75) {
          this.drawing = false;
        }
      }
    }
  };

}

//Loop variables
var i = 0;
var j = 0;

var score = [];

//Images
var enemyimg;
var enemyimg2;
var lifebar;
var lifebar2;
var bar1;
var bar2;
var bar3;
var heart;
var boss;
var pistol = [];

//Load Images
function preload() {
  enemyimg = loadImage('./assets/enemy.png');
  enemyimg2 = loadImage('./assets/enemy2.png');
  lifebar = loadImage('./assets/lifebar.png');
  lifebar2 = loadImage('./assets/lifebar2.png');
  bar1 = loadImage('./assets/bar1.png');
  bar2 = loadImage('./assets/bar2.png');
  bar3 = loadImage('./assets/bar3.png');
  heart = loadImage('./assets/heart.png');
  boss = loadImage('./assets/boss.png');
  for (i = 0; i < 6; i++) {
    pistol[i] = loadImage('./assets/pistol' + i + '.png');
  }
}

function setup() {
  frameRate(60);
  var cnv = createCanvas(resx, resy);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight + 50 - height) / 2;
  cnv.position(x, y);
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
      menu.drawControls();
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
  }

  if (keyIsDown(LEFT_ARROW) && !game.paused) {
    player.move(-1);
    player.direction = 1;
  }

  if (player.direction <= 2) player.direction = 1; else player.direction = 4;


  if (keyIsDown(UP_ARROW)) {
    if (player.direction === 1) player.direction = 2; else player.direction = 3; //UPLEFT/UPRIGHT
  }

  if (keyIsDown(DOWN_ARROW)) {
    if (player.direction === 1) player.direction = 0; else player.direction = 5;//DOWNLEFT/DOWNRIGHT
  }
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
    if (game.mode === 2 || game.mode === 3) game.mode = 0; //Go to Menu
    else if (game.completed) {
      //Continue
      stageid++;
      game.loadStage(stageid);
      game.completed = false;
      game.restartGame();
    } else if (game.ended) {
      game.ended = false;
      game.generalscore = 0;
      game.mode = 2;

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
