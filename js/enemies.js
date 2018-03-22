//Number on Enemies on n stage
var maxe = [3, 2, 11, 3];

var enemies = [];

for (var i = 0; i < maxe.length; i++) {
  enemies[i] = [];
  for (var j = 0; j < maxe[i]; j++) {
    enemies[i][j] = [];
  }
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
//7-Life points
//8-True if enemy is drawing
//----------ONLY BOSS STAGE------------
//9 Min y
//10 Max y
//11 BOSS Enemy Y direction || Enemy Falling vector

enemies[0][0][0] = 650;
enemies[0][0][1] = 380;
enemies[0][0][2] = 650;
enemies[0][0][3] = 810;
enemies[0][0][4] = true;
enemies[0][0][5] = 0;
enemies[0][0][6] = -1;
enemies[0][0][7] = 3;
enemies[0][0][8] = false;

enemies[0][1][0] = 2260;
enemies[0][1][1] = 350;
enemies[0][1][2] = 2260;
enemies[0][1][3] = 2440;
enemies[0][1][4] = true;
enemies[0][1][5] = 0;
enemies[0][1][6] = -1;
enemies[0][1][7] = 3;
enemies[0][1][8] = false;

enemies[0][2][0] = 4690;
enemies[0][2][1] = 280;
enemies[0][2][2] = 4690;
enemies[0][2][3] = 4810;
enemies[0][2][4] = true;
enemies[0][2][5] = 1;
enemies[0][2][6] = 0;
enemies[0][2][7] = 2;
enemies[0][2][8] = false;

enemies[1][0][0] = 1050;
enemies[1][0][1] = 450;
enemies[1][0][2] = 1050;
enemies[1][0][3] = 1240;
enemies[1][0][4] = true;
enemies[1][0][5] = 1;
enemies[1][0][6] = 0;
enemies[1][0][7] = 2;
enemies[1][0][8] = false;

enemies[1][1][0] = 2660;
enemies[1][1][1] = 440;
enemies[1][1][2] = 2660;
enemies[1][1][3] = 2870;
enemies[1][1][4] = true;
enemies[1][1][5] = 0;
enemies[1][1][6] = -1;
enemies[1][1][7] = 3;
enemies[1][1][8] = false;

enemies[2][0][0] = 590;
enemies[2][0][1] = 360;
enemies[2][0][2] = 590;
enemies[2][0][3] = 840;
enemies[2][0][4] = true;
enemies[2][0][5] = 0;
enemies[2][0][6] = -1;
enemies[2][0][7] = 3;
enemies[2][0][8] = false;

enemies[2][1][0] = 2450;
enemies[2][1][1] = 380;
enemies[2][1][2] = 2450;
enemies[2][1][3] = 2700;
enemies[2][1][4] = true;
enemies[2][1][5] = 0;
enemies[2][1][6] = 0;
enemies[2][1][7] = 3;
enemies[2][1][8] = false;

enemies[2][2][0] = 2490;
enemies[2][2][1] = 70;
enemies[2][2][2] = 2490;
enemies[2][2][3] = 2740;
enemies[2][2][4] = true;
enemies[2][2][5] = 0;
enemies[2][2][6] = 0;
enemies[2][2][7] = 3;
enemies[2][2][8] = false;

enemies[2][3][0] = 4360;
enemies[2][3][1] = 160;
enemies[2][3][2] = 4360;
enemies[2][3][3] = 4620;
enemies[2][3][4] = true;
enemies[2][3][5] = 1;
enemies[2][3][6] = 0;
enemies[2][3][7] = 3;
enemies[2][3][8] = false;

enemies[2][4][0] = 5010;
enemies[2][4][1] = 130;
enemies[2][4][2] = 5010;
enemies[2][4][3] = 5250;
enemies[2][4][4] = true;
enemies[2][4][5] = 1;
enemies[2][4][6] = 0;
enemies[2][4][7] = 3;
enemies[2][4][8] = false;

enemies[2][5][0] = 5650;
enemies[2][5][1] = 240;
enemies[2][5][2] = 5650;
enemies[2][5][3] = 5890;
enemies[2][5][4] = true;
enemies[2][5][5] = 0;
enemies[2][5][6] = 0;
enemies[2][5][7] = 2;
enemies[2][5][8] = false;

enemies[2][6][0] = 6160;
enemies[2][6][1] = 400;
enemies[2][6][2] = 6160;
enemies[2][6][3] = 6390;
enemies[2][6][4] = true;
enemies[2][6][5] = 0;
enemies[2][6][6] = 0;
enemies[2][6][7] = 2;
enemies[2][6][8] = false;

enemies[2][7][0] = 6320;
enemies[2][7][1] = 150;
enemies[2][7][2] = 6320;
enemies[2][7][3] = 6560;
enemies[2][7][4] = true;
enemies[2][7][5] = 1;
enemies[2][7][6] = 0;
enemies[2][7][7] = 3;
enemies[2][7][8] = false;

enemies[2][8][0] = 8610;
enemies[2][8][1] = 70;
enemies[2][8][2] = 8610;
enemies[2][8][3] = 8820;
enemies[2][8][4] = true;
enemies[2][8][5] = 1;
enemies[2][8][6] = 0;
enemies[2][8][8] = false;

enemies[2][9][0] = 8600;
enemies[2][9][1] = 410;
enemies[2][9][2] = 8600;
enemies[2][9][3] = 8790;
enemies[2][9][4] = true;
enemies[2][9][5] = 1;
enemies[2][9][6] = -1;
enemies[2][9][7] = 2;
enemies[2][9][8] = false;

enemies[2][10][0] = 9140;
enemies[2][10][1] = 80;
enemies[2][10][2] = 9140;
enemies[2][10][3] = 9360;
enemies[2][10][4] = true;
enemies[2][10][5] = 1;
enemies[2][10][6] = 0;
enemies[2][10][7] = 3;
enemies[2][10][8] = false;

//STAGE BOSS
//BOSS
enemies[3][0][0] = 590;
enemies[3][0][1] = 360;
enemies[3][0][2] = 30;
enemies[3][0][3] = 1186;
enemies[3][0][4] = true;
enemies[3][0][5] = 2;
enemies[3][0][6] = -1;
enemies[3][0][7] = 50;
enemies[3][0][8] = false;
enemies[3][0][9] = 30;
enemies[3][0][10] = 450;
enemies[3][0][11] = false; //DOWN
//ENEMIES
enemies[3][1][0] = 590;
enemies[3][1][1] = 540;
enemies[3][1][2] = 330;
enemies[3][1][3] = 1030;
enemies[3][1][4] = true;
enemies[3][1][5] = 0;
enemies[3][1][6] = -1;
enemies[3][1][7] = 3;
enemies[3][1][8] = false;
enemies[3][1][9] = 30;
enemies[3][1][10] = 450;
enemies[3][1][11] = 0;


enemies[3][2][0] = 590;
enemies[3][2][1] = 540;
enemies[3][2][2] = 330;
enemies[3][2][3] = 1030;
enemies[3][2][4] = true;
enemies[3][2][5] = 1;
enemies[3][2][6] = 3;
enemies[3][2][7] = 3;
enemies[3][2][8] = false;
enemies[3][2][9] = 30;
enemies[3][2][10] = 450;
enemies[3][2][11] = 0;






//Vector boss x
var vbx = 4;
//Vector boss y
var vby = 4;

//Vector y Falling enemies
var vey = 3;
