//Max number of spikes on n stage
var maxs = [3, 3];

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
