//Max number of spikes on n stage
var maxs = [10, 10];

//Spike's 1/2 width
var swidth = 30;
//Spike's height
var sheight = 65;

var spikes = [];

for (var i = 0; i < maxs.length; i++) {
  spikes[i] = [];
  for (var j = 0; j <= maxs[i]; j++) {
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

spikes[0][5][0] = 2750;
spikes[0][5][1] = 410;
spikes[0][5][2] = 1;

spikes[0][6][0] = 3730;
spikes[0][6][1] = 410;
spikes[0][6][2] = 2;

spikes[0][7][0] = 3830;
spikes[0][7][1] = 450;
spikes[0][7][2] = 1;

spikes[0][8][0] = 4410;
spikes[0][8][1] = 450;
spikes[0][8][2] = 1;

spikes[0][9][0] = 5900;
spikes[0][9][1] = 500;
spikes[0][9][2] = 1;
