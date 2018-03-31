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

  //Gravity
  this.gravity = function (maxy, maxid) {
    if (maxy - 1 > this.y + this.sy) {
      if (maxy - 1 > this.y + this.sy + grav)
        this.y += grav;
      else
        this.y = maxy - this.sy - 1;
    } else {
      if (maxid === maxp[stageid] - 1) {
        completed = true;
        countPoints();
      }
    }
  };

  //Check if on Air
  this.onair = function () {
    return this.y + this.sy + grav < maxy;
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
  };

  this.spikesCollision = function () {
    i = Math.max(sstart - 2, 0);
    do {
      if (this.pos - resx > spikes[stageid][i][0]) sstart = i;
      ospikes[i].spikesCollision();
      i++;
    } while (i < maxs[stageid] && this.pos + resx >= ospikes[i].x);
  };

  this.enemiesCollision = function () {
    i = Math.max(estart - 2, 0);
    do {
      if (oenemies[i].life > 0) {
        if (this.pos - resx / 2 > oenemies[i].x) estart = i;
        oenemies[i].collision();
      }
      i++;
    } while (i < maxe[stageid] && this.pos + resx / 4 >= oenemies[i].x);

  }


}

var oplatforms = [];


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

var ospikes = [];


function Spike(x, y, type) {
  this.x = x;
  this.y = y;
  this.type = type;


  this.draw = function () {

    switch (this.type) {
      case 0:
        triangle(this.x - spos - swidth, this.y, this.x - spos + swidth, this.y, this.x - spos, this.y + sheight);
        break;
      case 1:
        triangle(this.x - spos + swidth, this.y, this.x - spos - swidth, this.y, this.x - spos, this.y - sheight);
        break;
      case 2:
        triangle(this.x - spos, this.y + swidth, this.x - spos, this.y - swidth, this.x - spos - sheight, this.y);
        break;
      case 3:
        triangle(this.x - spos, this.y - swidth, this.x - spos, this.y + swidth, this.x - spos + sheight, this.y);
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
            lifePoints(-1, -1);
        } else if (player.pos >= this.x) {
          //RIGHT
          a = this.bladeHeight(1);
          if (this.y + a > player.y)
            lifePoints(-1, -1);
        } else {
          //CENTER
          if (this.y + player.sy > player.y) {
            lifePoints(-1, -1);
          }
        }
        break;

      case 1:
        //UP
        if (player.pos + player.sx < this.x) {
          //LEFT
          a = this.bladeHeight(0);
          if (this.y - a < player.y + player.sy)
            lifePoints(-1, -1);
        } else if (player.pos >= this.x) {
          //RIGHT
          a = this.bladeHeight(1);
          if (this.y - a < player.y + player.sy)
            lifePoints(-1, -1);
        } else {
          //CENTER
          if (this.y - player.sy < player.y + player.sy) {
            lifePoints(-1, -1);
          }
        }
        break;

      case 2:
        //LEFT
        if (player.y > this.y) {
          //DOWN
          a = this.bladeHeight(2);
          if (player.pos + player.sx >= this.x - a)
            lifePoints(-1, -1);
        } else if (player.y + player.sy > this.y) {
          //UP
          a = this.bladeHeight(3);
          if (player.pos + player.sx >= this.x - a)
            lifePoints(-1, -1);
        } else {
          //CENTER
          if (player.pos + player.sx >= this.x - sheight)
            lifePoints(-1, -1);
        }
        break;

      case 3:
        //RIGHT
        if (player.y > this.y) {
          //DOWN
          a = this.bladeHeight(2);
          if (player.pos <= this.x + a)
            lifePoints(-1, -1);
        } else if (player.y + player.sy > this.y) {
          //UP
          a = this.bladeHeight(3);
          if (player.pos <= this.x + a)
            lifePoints(-1, -1);
        } else {
          //CENTER
          if (player.pos <= this.x + sheight)
            lifePoints(-1, -1);
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
    image(livebar, this.x - spos + 3, this.y - 19);

//Draw Life Bars
    switch (this.type) {
      case 0:
        image(enemyimg, this.x - spos, this.y);
        for (j = 0; j < this.life; j++) {
          image(bar2, this.x - spos + 6 + k, this.y - 16);
          k += 16;
        }
        break;

      case 1:
        image(enemyimg2, this.x - spos, this.y);
        for (j = 0; j < this.life; j++) {
          image(bar1, this.x - spos + 6 + k, this.y - 16);
          k += 24;
        }
        break;

      case 2:
        image(boss, this.x - spos, this.y);
        for (j = 0; j < this.life; j++) {
          image(bar1, this.x - spos + 6 + k, this.y - 16);
          k += 24;
        }
        break;
    }
  };


  this.move = function () {
    //X-AXIS
    if (this.direction) {
      //Right--->
      if (this.maxx - this.x - esize <= espeed) {
        this.x = this.maxx - esize;
        this.direction = false;
      } else {
        this.x += espeed;
      }
    } else {
      //Left <---
      if (this.x - this.minx <= espeed) {
        this.x = this.minx;
        this.direction = true;
      } else {
        this.x -= espeed;
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
    if (this.type === 2) esize = 150; else esize = 60;
    if (player.y <= this.y + esize - player.sy && player.y >= this.y - player.sy) {
      if (player.x >= this.x - spos - player.sx && player.x <= this.x + esize - spos) {
        lifePoints(-1, -1);
      }
    }
  };

  this.shoot = function (l) {
    // console.log("Enemy shoot");
    if (this.type === 1 && this.life > 0) {
      if (player.x + spos >= this.x - 500 && player.x + spos <= this.x + 500 && this.time === 0) {
        this.time++;
        newBullet(l);
      } else if (this.time > 0 && this.time < 60 * ttshot + 1) this.time++;
      else if (this.time === 60 * ttshot + 1) this.time = 0;
    }
  }


}

//Load Level
function loadStage(n) {
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
    obullets[i] = new Bullet(0, 0, 0, 0, 0, 0, 0, 0, 0);
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


var obullets = [];

for (i = 0; i < 30; i++) {
  obullets[i] = new Bullet(0, 0, 0, 0, 0, 0, 0, 0, 0);
}

function Bullet(x, y, size, direction, life, drawing, damage, speedx, speedy) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.direction = direction;
  this.life = life;
  this.drawing = drawing;
  this.damage = damage;
  this.speedx = speedx;
  this.speedy = speedy;

  this.create = function (enumber) {
    //For Player
    if (enumber === -1) {
      noshot++;
      this.size = bsize;


      switch (player.direction) {
        //DOWN LEFT
        case 0:
          this.x = spos + player.x + 3;
          this.y = player.y + 45;
          this.direction = 3;
          break;
        //LEFT
        case 1:
          this.x = spos + player.x - 10;
          this.y = player.y + 25;
          this.direction = 5;
          break;

        //UP-LEFT
        case 2:
          this.x = spos + player.x;
          this.y = player.y + 10;
          this.direction = 2;
          break;

        //UP-RIGHT
        case 3:
          this.x = spos + player.x + player.sx;
          this.y = player.y + 10;
          this.direction = 0;
          break;

        //RIGHT
        case 4:
          this.x = spos + player.x + player.sx + 10;
          this.y = player.y + 25;
          this.direction = 4;
          break;
        //DOWN RIGHT
        case 5:
          this.x = spos + player.x + player.sx - 3;
          this.y = player.y + 45;
          this.direction = 1;
          break;
        default:

      }
      this.damage = false;
    }
    //For Enemy
    else {
      var a = oenemies[enumber].x + (esize / 2) - player.x - spos;
      var b = oenemies[enumber].y - player.y;
      var c = Math.pow(a, 2) + Math.pow(b, 2);
      var d = c / bspeed;
      this.speedx = Math.sqrt(Math.pow(a, 2) / d) * 3;
      this.speedy = Math.sqrt(Math.pow(b, 2) / d) * 3;

      if (oenemies[enumber].x + (esize / 2) - player.x - spos > 0 && oenemies[enumber].y - player.y > 0) this.direction = 6;
      else if (oenemies[enumber].x + (esize / 2) - player.x - spos > 0 && oenemies[enumber].y - player.y <= 0) this.direction = 7;
      else if (oenemies[enumber].x + (esize / 2) - player.x - spos <= 0 && oenemies[enumber].y - player.y > 0) this.direction = 8;
      else if (oenemies[enumber].x + (esize / 2) - player.x - spos <= 0 && oenemies[enumber].y - player.y <= 0) this.direction = 9;

      this.x = oenemies[enumber].x + (esize / 2);
      this.y = oenemies[enumber].y;
      this.size = bsize;
      this.damage = true;
    }
    this.life = 0;
    this.drawing = true;
  };

  this.draw = function () {
    // console.log("Direction: "+this.direction+" "+this.x+ " "+this.y);
    switch (this.direction) {
      case 0:
        this.x += bspeed;
        this.y -= bspeed;
        break;
      case 1:
        this.x += bspeed;
        this.y += bspeed;
        break;
      case 2:
        this.x -= bspeed;
        this.y -= bspeed;
        break;

      case 3:
        this.x -= bspeed;
        this.y += bspeed;
        break;
      case 4:
        this.x += bspeed;
        break;
      case 5:
        this.x -= bspeed;
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
    ellipse(this.x - spos, this.y, this.size, this.size);
    fill('white');

    this.life++;
    if (this.life === 60 * blife) {
      this.drawing = false;
    }
  };

  this.damagePlayer = function () {

    if (this.damage && this.drawing) {
      if (this.y <= player.y + player.sy + this.size / 2 && this.y >= player.y - this.size / 2) {
        if (this.x >= player.x + spos - this.size / 2 && this.x <= player.x + spos + player.sx + this.size / 2) {
          this.drawing = false;
          lifePoints(-1, -1);
        }
      }
    }
  };
  this.damageEnemy = function (d) {
    // console.log(d);
    if (!this.damage && this.drawing && this.y <= oenemies[d].y + esize + this.size / 2 && this.y >= oenemies[d].y - this.size / 2) {
      if (this.x >= oenemies[d].x - this.size / 2 && this.x <= oenemies[d].x + esize + this.size / 2) {
        this.drawing = false;
        lifePoints(d, -1);
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

//Start rendering platforms from rstart platform
var rstart = 0;

//Start collision checking platforms from cstart platform;
var cstart = 0;

//Spikes' render and collision starting spike
var sstart = 0;
//Enemy render and collision starting
var estart = 0;
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
  loadStage(0);
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
    player.direction = 4;

    direction[0] = true;
    direction[1] = false;
  }

  if (keyIsDown(LEFT_ARROW) && !paused) {
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
  if (keyCode === 90 && !paused) {
    if (!player.onair()) {
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
      loadStage(stageid);
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

  // Draw Spikes
  i = Math.max(sstart - 1, 0);
  do {
    if (player.pos - resx > spikes[stageid][i][0]) sstart = i;
    ospikes[i].draw();
    i++;
  } while (i < maxs[stageid] && player.pos + resx >= ospikes[i].x);


  drawBullets();
  drawHUD();
}

function physics() {
  player.collision();
  // debugcollision(maxid, minid, xmaxid, xminid); //Uncomment to debug collision
  player.gravity(maxy, maxid);

  if (player.rise) player.jump();
  bulletsCollision();
  // damage();


  //Damage Player
  for (j = 0; j < bmax; j++) {
    obullets[j].damagePlayer();
  }

  //Damage Enemies

  for (i = 0; i < maxe[stageid]; i++) {

  }



  player.enemiesCollision();
  player.spikesCollision();
  checkIfUnderScreen();
}

function bulletsCollision() {
  // for (i = 0; i < maxp[stageid]; i++) {
  //   for (j = 0; j < bmax; j++) {
  //     if (bullets[j][5]) {
  //       if (bullets[j][1] <= platforms[stageid][i][1] + platforms[stageid][i][3] + bullets[j][2] * 0.75 && bullets[j][1] >= platforms[stageid][i][1] - bullets[j][2] * 0.75) {
  //         if (bullets[j][0] >= platforms[stageid][i][0] - bullets[j][2] * 0.75 && bullets[j][0] <= platforms[stageid][i][0] + platforms[stageid][i][2] + bullets[j][2] * 0.75) {
  //           bullets[j][5] = false;
  //         }
  //       }
  //     }
  //   }
  // }
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

function drawBullets() {
  for (i = 0; i < 30; i++) {
    if (obullets[i].drawing) {
      obullets[i].draw();
    }
  }
}

function newBullet(enumber) {
  for (j = 0; j < obullets.length; j++) {
    if (!obullets[j].drawing) {
      obullets[j].create(enumber);
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
  player.rise = false;
  player.jumpcounter = false;
  rstart = 0;
  cstart = 0;
  estart = 0;
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

function drawEnemies() {
  var r = Math.max(estart - 2, 0);
  while (r < maxe[stageid] && player.pos + resx >= oenemies[r].x) {
    if (player.pos - resx / 2 > oenemies[r].x) estart = r;
    //OOP
    if (oenemies[r].life > 0) {
      oenemies[r].draw();
      if (oenemies[r].type === 2) {
        //Move Boss
        oenemies[r].moveBoss();
        //Drop Enemy
        if (tdrop > 180 && selectNotUsedEnemy() !== -1) {
          tdrop = 0;
          oenemies[selectNotUsedEnemy()].drop();
          // dropEnemy(selectNotUsedEnemy());
        } else tdrop++;

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
}

function selectNotUsedEnemy() {
  i = 1;
  while (oenemies[i].life !== 0) {
    i++;
    if (i >= maxe[stageid]) return -1;
  }
  return i;
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

  for (var l = 0; l <= maxe[stageid]; l++) {
    // //Boss or standard Enemy
    // if (enemies[stageid][drawingenemies[l][2]][5] === 2) esize = 150; else esize = 60;

    //Shoot

    for (i = 0; i < bmax; i++) {
      if (oenemies[i].life > 0 && obullets[i].drawing && !obullets[i].damage) {


      }


    }


    //
    //   for (j = 0; j < bmax; j++) {
    //     if (enemies[stageid][drawingenemies[l][2]][7] > 0 && bullets[j][5] && !bullets[j][6]) {
    //       if (bullets[j][1] <= drawingenemies[l][1] + esize + bullets[j][2] / 2 && bullets[j][1] >= drawingenemies[l][1] - bullets[j][2] / 2) {
    //         if (bullets[j][0] >= drawingenemies[l][0] - bullets[j][2] / 2 && bullets[j][0] <= drawingenemies[l][0] + esize + bullets[j][2] / 2) {
    //           bullets[j][5] = false;
    //           lifePoints(drawingenemies[l][2], -1);
    //           if (enemies[stageid][drawingenemies[l][2]][7] === 0) {
    //             if (enemies[stageid][drawingenemies[l][2]][5] === 0) score[stageid] += 150;
    //             else score[stageid] += 250;
    //           }
    //         }
    //       }
    //     }
    //   }
    // }

  }
}

function lifePoints(id, number) {
  if (id === -1 && !player.nodamage) {
    player.life += number;
    player.nodamage = true;
  } else if (id >= 0) {
    oenemies[id].life += number;
  }
  if (player.life === 0) lose();
}

function countPoints() {
  for (var k = 1; k <= player.life; k++) score[stageid] += 75;
  var points = (60 * minutes + seconds) * 300 / maxtime;
  if (noshot === 0) noshot++;
  var points2 = 350 / noshot;
  score[stageid] = score[stageid] + points + points2;
  score[stageid] = Math.round(score[stageid]);
}

