//Stage id
var stageid = 0;

//Quantity of platforms on stages
var maxp = [38, 55];

var platforms = [];

for (var i = 0; i < maxp.length; i++) {
  platforms[i] = [];
  for (var j = 0; j <= maxp[i]; j++) {
    platforms[i][j] = [];
  }
}

//[stage_id][platform_id][platform_dim]
//Platforms' dimensions
//0-X pos
//1-Y pos
//2-Width
//3-Height

//STAGE0
platforms[0][0][0] = 0;
platforms[0][0][1] = 0;
platforms[0][0][2] = 30;
platforms[0][0][3] = 2000;

platforms[0][1][0] = 30;
platforms[0][1][1] = 370;
platforms[0][1][2] = 320;
platforms[0][1][3] = 50;

platforms[0][2][0] = 240;
platforms[0][2][1] = 280;
platforms[0][2][2] = 270;
platforms[0][2][3] = 70;

platforms[0][3][0] = 650;
platforms[0][3][1] = 440;
platforms[0][3][2] = 160;
platforms[0][3][3] = 70;

platforms[0][4][0] = 990;
platforms[0][4][1] = 390;
platforms[0][4][2] = 320;
platforms[0][4][3] = 50;

platforms[0][5][0] = 1200;
platforms[0][5][1] = 290;
platforms[0][5][2] = 90;
platforms[0][5][3] = 100;

platforms[0][6][0] = 1500;
platforms[0][6][1] = 240;
platforms[0][6][2] = 520;
platforms[0][6][3] = 70;

platforms[0][7][0] = 1790;
platforms[0][7][1] = 210;
platforms[0][7][2] = 230;
platforms[0][7][3] = 30;

platforms[0][8][0] = 2240;
platforms[0][8][1] = 410;
platforms[0][8][2] = 610;
platforms[0][8][3] = 70;

platforms[0][9][0] = 2480;
platforms[0][9][1] = 350;
platforms[0][9][2] = 100;
platforms[0][9][3] = 60;

platforms[0][10][0] = 2620;
platforms[0][10][1] = 350;
platforms[0][10][2] = 100;
platforms[0][10][3] = 60;

platforms[0][11][0] = 2990;
platforms[0][11][1] = 240;
platforms[0][11][2] = 50;
platforms[0][11][3] = 180;

platforms[0][12][0] = 2990;
platforms[0][12][1] = 240;
platforms[0][12][2] = 50;
platforms[0][12][3] = 180;

platforms[0][13][0] = 3280;
platforms[0][13][1] = 400;
platforms[0][13][2] = 100;
platforms[0][13][3] = 100;

platforms[0][14][0] = 3610;
platforms[0][14][1] = 450;
platforms[0][14][2] = 320;
platforms[0][14][3] = 40;

platforms[0][15][0] = 3730;
platforms[0][15][1] = 330;
platforms[0][15][2] = 70;
platforms[0][15][3] = 120;

platforms[0][16][0] = 3870;
platforms[0][16][1] = 280;
platforms[0][16][2] = 60;
platforms[0][16][3] = 170;

platforms[0][17][0] = 4060;
platforms[0][17][1] = 330;
platforms[0][17][2] = 10;
platforms[0][17][3] = 150;

platforms[0][18][0] = 4140;
platforms[0][18][1] = 430;
platforms[0][18][2] = 40;
platforms[0][18][3] = 10;

platforms[0][19][0] = 4350;
platforms[0][19][1] = 330;
platforms[0][19][2] = 30;
platforms[0][19][3] = 150;

platforms[0][20][0] = 4380;
platforms[0][20][1] = 450;
platforms[0][20][2] = 70;
platforms[0][20][3] = 30;

platforms[0][21][0] = 4510;
platforms[0][21][1] = 580;
platforms[0][21][2] = 10;
platforms[0][21][3] = 60;

platforms[0][22][0] = 4640;
platforms[0][22][1] = 560;
platforms[0][22][2] = 90;
platforms[0][22][3] = 20;

platforms[0][23][0] = 4680;
platforms[0][23][1] = 470;
platforms[0][23][2] = 10;
platforms[0][23][3] = 90;

platforms[0][24][0] = 4690;
platforms[0][24][1] = 340;
platforms[0][24][2] = 120;
platforms[0][24][3] = 20;

platforms[0][25][0] = 4840;
platforms[0][25][1] = 250;
platforms[0][25][2] = 20;
platforms[0][25][3] = 90;

platforms[0][26][0] = 4940;
platforms[0][26][1] = 510;
platforms[0][26][2] = 60;
platforms[0][26][3] = 10;

platforms[0][27][0] = 5090;
platforms[0][27][1] = 410;
platforms[0][27][2] = 20;
platforms[0][27][3] = 110;

platforms[0][28][0] = 5110;
platforms[0][28][1] = 410;
platforms[0][28][2] = 80;
platforms[0][28][3] = 20;

platforms[0][29][0] = 5170;
platforms[0][29][1] = 320;
platforms[0][29][2] = 20;
platforms[0][29][3] = 90;

platforms[0][30][0] = 5290;
platforms[0][30][1] = 470;
platforms[0][30][2] = 10;
platforms[0][30][3] = 70;

platforms[0][31][0] = 5370;
platforms[0][31][1] = 360;
platforms[0][31][2] = 10;
platforms[0][31][3] = 190;

platforms[0][32][0] = 5430;
platforms[0][32][1] = 300;
platforms[0][32][2] = 40;
platforms[0][32][3] = 10;

platforms[0][33][0] = 5500;
platforms[0][33][1] = 360;
platforms[0][33][2] = 10;
platforms[0][33][3] = 50;

platforms[0][34][0] = 5520;
platforms[0][34][1] = 550;
platforms[0][34][2] = 30;
platforms[0][34][3] = 10;

platforms[0][35][0] = 5620;
platforms[0][35][1] = 550;
platforms[0][35][2] = 10;
platforms[0][35][3] = 20;

platforms[0][36][0] = 5640;
platforms[0][36][1] = 410;
platforms[0][36][2] = 10;
platforms[0][36][3] = 160;

platforms[0][37][0] = 5760;
platforms[0][37][1] = 500;
platforms[0][37][2] = 300;
platforms[0][37][3] = 10;

platforms[0][38][0] = 6100;
platforms[0][38][1] = 400;
platforms[0][38][2] = 300;
platforms[0][38][3] = 10;

//STAGE1
platforms[1][1][0] = 10;
platforms[1][1][1] = 510;
platforms[1][1][2] = 40;
platforms[1][1][3] = 100;

platforms[1][2][0] = 270;
platforms[1][2][1] = 460;
platforms[1][2][2] = 230;
platforms[1][2][3] = 20;

platforms[1][3][0] = 440;
platforms[1][3][1] = 420;
platforms[1][3][2] = 60;
platforms[1][3][3] = 40;

platforms[1][4][0] = 650;
platforms[1][4][1] = 210;
platforms[1][4][2] = 20;
platforms[1][4][3] = 330;

platforms[1][5][0] = 830;
platforms[1][5][1] = 310;
platforms[1][5][2] = 20;
platforms[1][5][3] = 120;

platforms[1][6][0] = 910;
platforms[1][6][1] = 400;
platforms[1][6][2] = 60;
platforms[1][6][3] = 10;

platforms[1][7][0] = 1040;
platforms[1][7][1] = 510;
platforms[1][7][2] = 250;
platforms[1][7][3] = 30;

platforms[1][8][0] = 1250;
platforms[1][8][1] = 410;
platforms[1][8][2] = 40;
platforms[1][8][3] = 100;

platforms[1][9][0] = 1370;
platforms[1][9][1] = 340;
platforms[1][9][2] = 90;
platforms[1][9][3] = 10;

platforms[1][10][0] = 1510;
platforms[1][10][1] = 220;
platforms[1][10][2] = 10;
platforms[1][10][3] = 90;

platforms[1][11][0] = 1610;
platforms[1][11][1] = 170;
platforms[1][11][2] = 10;
platforms[1][11][3] = 80;

platforms[1][12][0] = 1670;
platforms[1][12][1] = 250;
platforms[1][12][2] = 40;
platforms[1][12][3] = 10;

platforms[1][13][0] = 1770;
platforms[1][13][1] = 520;
platforms[1][13][2] = 180;
platforms[1][13][3] = 10;

platforms[1][14][0] = 1810;
platforms[1][14][1] = 480;
platforms[1][14][2] = 20;
platforms[1][14][3] = 40;

platforms[1][15][0] = 2030;
platforms[1][15][1] = 580;
platforms[1][15][2] = 160;
platforms[1][15][3] = 20;

platforms[1][16][0] = 2070;
platforms[1][16][1] = 510;
platforms[1][16][2] = 20;
platforms[1][16][3] = 70;

platforms[1][17][0] = 2290;
platforms[1][17][1] = 500;
platforms[1][17][2] = 10;
platforms[1][17][3] = 110;

platforms[1][18][0] = 2330;
platforms[1][18][1] = 480;
platforms[1][18][2] = 60;
platforms[1][18][3] = 10;

platforms[1][19][0] = 2430;
platforms[1][19][1] = 350;
platforms[1][19][2] = 10;
platforms[1][19][3] = 120;

platforms[1][20][0] = 2480;
platforms[1][20][1] = 280;
platforms[1][20][2] = 100;
platforms[1][20][3] = 10;

platforms[1][21][0] = 2650;
platforms[1][21][1] = 500;
platforms[1][21][2] = 230;
platforms[1][21][3] = 20;

platforms[1][22][0] = 2970;
platforms[1][22][1] = 350;
platforms[1][22][2] = 20;
platforms[1][22][3] = 70;

platforms[1][23][0] = 3100;
platforms[1][23][1] = 230;
platforms[1][23][2] = 20;
platforms[1][23][3] = 100;

platforms[1][24][0] = 3210;
platforms[1][24][1] = 120;
platforms[1][24][2] = 20;
platforms[1][24][3] = 110;

platforms[1][25][0] = 3360;
platforms[1][25][1] = 170;
platforms[1][25][2] = 220;
platforms[1][25][3] = 20;

platforms[1][26][0] = 3410;
platforms[1][26][1] = 90;
platforms[1][26][2] = 10;
platforms[1][26][3] = 80;

platforms[1][27][0] = 3630;
platforms[1][27][1] = 90;
platforms[1][27][2] = 10;
platforms[1][27][3] = 40;

platforms[1][28][0] = 3640;
platforms[1][28][1] = 120;
platforms[1][28][2] = 80;
platforms[1][28][3] = 10;

platforms[1][29][0] = 3810;
platforms[1][29][1] = 450;
platforms[1][29][2] = 10;
platforms[1][29][3] = 60;

platforms[1][30][0] = 3900;
platforms[1][30][1] = 430;
platforms[1][30][2] = 70;
platforms[1][30][3] = 10;

platforms[1][31][0] = 4060;
platforms[1][31][1] = 360;
platforms[1][31][2] = 10;
platforms[1][31][3] = 50;

platforms[1][32][0] = 4160;
platforms[1][32][1] = 290;
platforms[1][32][2] = 170;
platforms[1][32][3] = 10;

platforms[1][33][0] = 4230;
platforms[1][33][1] = 240;
platforms[1][33][2] = 10;
platforms[1][33][3] = 50;

platforms[1][34][0] = 4430;
platforms[1][34][1] = 180;
platforms[1][34][2] = 20;
platforms[1][34][3] = 90;

platforms[1][35][0] = 4530;
platforms[1][35][1] = 100;
platforms[1][35][2] = 50;
platforms[1][35][3] = 60;

platforms[1][36][0] = 4680;
platforms[1][36][1] = 100;
platforms[1][36][2] = 140;
platforms[1][36][3] = 10;

platforms[1][37][0] = 4740;
platforms[1][37][1] = 80;
platforms[1][37][2] = 10;
platforms[1][37][3] = 20;

platforms[1][38][0] = 4890;
platforms[1][38][1] = 300;
platforms[1][38][2] = 20;
platforms[1][38][3] = 120;

platforms[1][39][0] = 5010;
platforms[1][39][1] = 370;
platforms[1][39][2] = 20;
platforms[1][39][3] = 70;

platforms[1][40][0] = 5100;
platforms[1][40][1] = 410;
platforms[1][40][2] = 20;
platforms[1][40][3] = 40;

platforms[1][41][0] = 5190;
platforms[1][41][1] = 320;
platforms[1][41][2] = 20;
platforms[1][41][3] = 140;

platforms[1][42][0] = 5260;
platforms[1][42][1] = 270;
platforms[1][42][2] = 50;
platforms[1][42][3] = 10;

platforms[1][43][0] = 5310;
platforms[1][43][1] = 190;
platforms[1][43][2] = 180;
platforms[1][43][3] = 10;

platforms[1][45][0] = 5430;
platforms[1][45][1] = 100;
platforms[1][45][2] = 10;
platforms[1][45][3] = 90;

platforms[1][46][0] = 5540;
platforms[1][46][1] = 270;
platforms[1][46][2] = 130;
platforms[1][46][3] = 20;

platforms[1][47][0] = 5730;
platforms[1][47][1] = 330;
platforms[1][47][2] = 30;
platforms[1][47][3] = 90;

platforms[1][48][0] = 5800;
platforms[1][48][1] = 500;
platforms[1][48][2] = 90;
platforms[1][48][3] = 10;

platforms[1][49][0] = 5950;
platforms[1][49][1] = 560;
platforms[1][49][2] = 170;
platforms[1][49][3] = 10;

platforms[1][50][0] = 6150;
platforms[1][50][1] = 420;
platforms[1][50][2] = 20;
platforms[1][50][3] = 140;

platforms[1][51][0] = 6260;
platforms[1][51][1] = 300;
platforms[1][51][2] = 10;
platforms[1][51][3] = 110;

platforms[1][52][0] = 6390;
platforms[1][52][1] = 220;
platforms[1][52][2] = 10;
platforms[1][52][3] = 140;

platforms[1][53][0] = 6450;
platforms[1][53][1] = 220;
platforms[1][53][2] = 130;
platforms[1][53][3] = 10;

platforms[1][54][0] = 6680;
platforms[1][54][1] = 110;
platforms[1][54][2] = 10;
platforms[1][54][3] = 110;

platforms[1][55][0] = 6760;
platforms[1][55][1] = 110;
platforms[1][55][2] = 230;
platforms[1][55][3] = 20;
