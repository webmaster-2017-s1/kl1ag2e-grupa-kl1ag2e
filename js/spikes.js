//Max number of spikes on n stage
var maxs = [11, 8, 5, 22];

//Spike's 1/2 width
var swidth = 30;
//Spike's height
var sheight = 65;

var spikes = [];

for (var i = 0; i < maxs.length; i++) {
  spikes[i] = [];
  for (var j = 0; j < maxs[i]; j++) {
    spikes[i][j] = [];
  }
}

//[stage_id][spike_id][spike_pos]
//Spike pos
//0-X pos
//1-Y pos
//2-Spike Direction
//**** 0-DOWN
//**** 1-UP
//**** 2-LEFT
//**** 3-RIGHT


//STAGE0

spikes[0][0][0] = 480;
spikes[0][0][1] = 280;
spikes[0][0][2] = 1;

spikes[0][1][0] = 510;
spikes[0][1][1] = 310;
spikes[0][1][2] = 3;

spikes[0][2][0] = 1200;
spikes[0][2][1] = 320;
spikes[0][2][2] = 2;

spikes[0][3][0] = 1760;
spikes[0][3][1] = 240;
spikes[0][3][2] = 1;

spikes[0][4][0] = 1820;
spikes[0][4][1] = 210;
spikes[0][4][2] = 1;

spikes[0][5][0] = 2480;
spikes[0][5][1] = 380;
spikes[0][5][2] = 2;

spikes[0][6][0] = 2750;
spikes[0][6][1] = 410;
spikes[0][6][2] = 1;

spikes[0][7][0] = 3730;
spikes[0][7][1] = 410;
spikes[0][7][2] = 2;

spikes[0][8][0] = 3830;
spikes[0][8][1] = 450;
spikes[0][8][2] = 1;

spikes[0][9][0] = 4410;
spikes[0][9][1] = 450;
spikes[0][9][2] = 1;

spikes[0][10][0] = 5900;
spikes[0][10][1] = 500;
spikes[0][10][2] = 1;

//Stage 1

spikes[1][0][0] = 410;
spikes[1][0][1] = 460;
spikes[1][0][2] = 1;

spikes[1][1][0] = 1860;
spikes[1][1][1] = 520;
spikes[1][1][2] = 1;

spikes[1][2][0] = 2120;
spikes[1][2][1] = 580;
spikes[1][2][2] = 1;

spikes[1][3][0] = 3450;
spikes[1][3][1] = 170;
spikes[1][3][2] = 1;

spikes[1][4][0] = 4270;
spikes[1][4][1] = 290;
spikes[1][4][2] = 1;

spikes[1][5][0] = 5400;
spikes[1][5][1] = 190;
spikes[1][5][2] = 1;

spikes[1][6][0] = 6090;
spikes[1][6][1] = 560;
spikes[1][6][2] = 1;

//Stage 2

spikes[2][0][0] = 30;
spikes[2][0][1] = 560;
spikes[2][0][2] = 1;

spikes[2][1][0] = 1360;
spikes[2][1][1] = 470;
spikes[2][1][2] = 1;

spikes[2][2][0] = 2460;
spikes[2][2][1] = 440;
spikes[2][2][2] = 1;

spikes[2][3][0] = 1960;
spikes[2][3][1] = 270;
spikes[2][3][2] = 1;

spikes[2][4][0] = 1960;
spikes[2][4][1] = 270;
spikes[2][4][2] = 1;

//BOSS STAGE
spikes[3][0][0] = 60;
spikes[3][0][1] = 738;
spikes[3][0][2] = 1;

spikes[3][1][0] = 120;
spikes[3][1][1] = 738;
spikes[3][1][2] = 1;

spikes[3][2][0] = 180;
spikes[3][2][1] = 738;
spikes[3][2][2] = 1;

spikes[3][3][0] = 240;
spikes[3][3][1] = 738;
spikes[3][3][2] = 1;

spikes[3][4][0] = 300;
spikes[3][4][1] = 738;
spikes[3][4][2] = 1;

spikes[3][5][0] = 360;
spikes[3][5][1] = 738;
spikes[3][5][2] = 1;

spikes[3][6][0] = 420;
spikes[3][6][1] = 738;
spikes[3][6][2] = 1;

spikes[3][7][0] = 480;
spikes[3][7][1] = 738;
spikes[3][7][2] = 1;

spikes[3][8][0] = 540;
spikes[3][8][1] = 738;
spikes[3][8][2] = 1;

spikes[3][9][0] = 600;
spikes[3][9][1] = 738;
spikes[3][9][2] = 1;

spikes[3][10][0] = 660;
spikes[3][10][1] = 738;
spikes[3][10][2] = 1;

spikes[3][11][0] = 720;
spikes[3][11][1] = 738;
spikes[3][11][2] = 1;

spikes[3][12][0] = 780;
spikes[3][12][1] = 738;
spikes[3][12][2] = 1;

spikes[3][13][0] = 840;
spikes[3][13][1] = 738;
spikes[3][13][2] = 1;

spikes[3][14][0] = 900;
spikes[3][14][1] = 738;
spikes[3][14][2] = 1;

spikes[3][15][0] = 960;
spikes[3][15][1] = 738;
spikes[3][15][2] = 1;

spikes[3][16][0] = 1020;
spikes[3][16][1] = 738;
spikes[3][16][2] = 1;

spikes[3][17][0] = 1080;
spikes[3][17][1] = 738;
spikes[3][17][2] = 1;

spikes[3][18][0] = 1140;
spikes[3][18][1] = 738;
spikes[3][18][2] = 1;

spikes[3][19][0] = 1200;
spikes[3][19][1] = 738;
spikes[3][19][2] = 1;

spikes[3][20][0] = 1260;
spikes[3][20][1] = 738;
spikes[3][20][2] = 1;

spikes[3][21][0] = 1320;
spikes[3][21][1] = 738;
spikes[3][21][2] = 1;
