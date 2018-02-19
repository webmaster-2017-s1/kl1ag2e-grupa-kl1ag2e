//Max number of spikes on n stage
var maxs = [50, 50];

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

