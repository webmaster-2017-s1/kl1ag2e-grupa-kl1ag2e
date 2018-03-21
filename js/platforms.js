//Stage id
var stageid = 0;

//Quantity of platforms on stages
var maxp = [40, 55, 69, 5];

var platforms = [];

for (var i = 0; i < maxp.length; i++) {
  platforms[i] = [];
  for (var j = 0; j < maxp[i]; j++) {
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

platforms[0][39][0] = 6500;
platforms[0][39][1] = 300;
platforms[0][39][2] = 300;
platforms[0][39][3] = 10;



//STAGE1

platforms[1][0][0] = 0;
platforms[1][0][1] = 0;
platforms[1][0][2] = 0;
platforms[1][0][3] = 0;

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
platforms[1][4][1] = 230;
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

platforms[1][44][0] = 5430;
platforms[1][44][1] = 100;
platforms[1][44][2] = 10;
platforms[1][44][3] = 90;

platforms[1][45][0] = 5540;
platforms[1][45][1] = 270;
platforms[1][45][2] = 130;
platforms[1][45][3] = 20;

platforms[1][46][0] = 5730;
platforms[1][46][1] = 330;
platforms[1][46][2] = 30;
platforms[1][46][3] = 90;

platforms[1][47][0] = 5800;
platforms[1][47][1] = 500;
platforms[1][47][2] = 90;
platforms[1][47][3] = 10;

platforms[1][48][0] = 5950;
platforms[1][48][1] = 560;
platforms[1][48][2] = 170;
platforms[1][48][3] = 10;

platforms[1][49][0] = 6150;
platforms[1][49][1] = 420;
platforms[1][49][2] = 20;
platforms[1][49][3] = 140;

platforms[1][50][0] = 6260;
platforms[1][50][1] = 300;
platforms[1][50][2] = 10;
platforms[1][50][3] = 110;

platforms[1][51][0] = 6390;
platforms[1][51][1] = 220;
platforms[1][51][2] = 10;
platforms[1][51][3] = 140;

platforms[1][52][0] = 6450;
platforms[1][52][1] = 220;
platforms[1][52][2] = 130;
platforms[1][52][3] = 10;

platforms[1][53][0] = 6680;
platforms[1][53][1] = 110;
platforms[1][53][2] = 10;
platforms[1][53][3] = 110;

platforms[1][54][0] = 6760;
platforms[1][54][1] = 110;
platforms[1][54][2] = 230;
platforms[1][54][3] = 20;

//STAGE 2

platforms[2][0][0] = 0;
platforms[2][0][1] = 0;
platforms[2][0][2] = 0;
platforms[2][0][3] = 0;

platforms[2][1][0] = 60;
platforms[2][1][1] = 530;
platforms[2][1][2] = 450;
platforms[2][1][3] = 30;

platforms[2][2][0] = 580;
platforms[2][2][1] = 420;
platforms[2][2][2] = 260;
platforms[2][2][3] = 10;

platforms[2][3][0] = 860;
platforms[2][3][1] = 300;
platforms[2][3][2] = 250;
platforms[2][3][3] = 10;

platforms[2][4][0] = 1200;
platforms[2][4][1] = 510;
platforms[2][4][2] = 220;
platforms[2][4][3] = 10;

platforms[2][5][0] = 1310;
platforms[2][5][1] = 470;
platforms[2][5][2] = 110;
platforms[2][5][3] = 40;

platforms[2][6][0] = 1280;
platforms[2][6][1] = 160;
platforms[2][6][2] = 30;
platforms[2][6][3] = 100;

platforms[2][7][0] = 1480;
platforms[2][7][1] = 140;
platforms[2][7][2] = 270;
platforms[2][7][3] = 20;

platforms[2][8][0] = 1650;
platforms[2][8][1] = 450;
platforms[2][8][2] = 40;
platforms[2][8][3] = 50;

platforms[2][9][0] = 1790;
platforms[2][9][1] = 330;
platforms[2][9][2] = 40;
platforms[2][9][3] = 110;

platforms[2][10][0] = 1930;
platforms[2][10][1] = 270;
platforms[2][10][2] = 160;
platforms[2][10][3] = 30;

platforms[2][11][0] = 2260;
platforms[2][11][1] = 190;
platforms[2][11][2] = 70;
platforms[2][11][3] = 80;

platforms[2][12][0] = 2460;
platforms[2][12][1] = 130;
platforms[2][12][2] = 270;
platforms[2][12][3] = 20;

platforms[2][13][0] = 2420;
platforms[2][13][1] = 440;
platforms[2][13][2] = 270;
platforms[2][13][3] = 30;

platforms[2][14][0] = 2750;
platforms[2][14][1] = 350;
platforms[2][14][2] = 120;
platforms[2][14][3] = 10;

platforms[2][15][0] = 2980;
platforms[2][15][1] = 250;
platforms[2][15][2] = 20;
platforms[2][15][3] = 280;

platforms[2][16][0] = 3110;
platforms[2][16][1] = 370;
platforms[2][16][2] = 20;
platforms[2][16][3] = 60;

platforms[2][17][0] = 3260;
platforms[2][17][1] = 320;
platforms[2][17][2] = 20;
platforms[2][17][3] = 200;

platforms[2][18][0] = 3440;
platforms[2][18][1] = 290;
platforms[2][18][2] = 270;
platforms[2][18][3] = 20;

platforms[2][19][0] = 3520;
platforms[2][19][1] = 230;
platforms[2][19][2] = 60;
platforms[2][19][3] = 60;

platforms[2][20][0] = 3810;
platforms[2][20][1] = 380;
platforms[2][20][2] = 30;
platforms[2][20][3] = 70;

platforms[2][21][0] = 3950;
platforms[2][21][1] = 540;
platforms[2][21][2] = 320;
platforms[2][21][3] = 40;

platforms[2][22][0] = 4100;
platforms[2][22][1] = 410;
platforms[2][22][2] = 30;
platforms[2][22][3] = 130;

platforms[2][23][0] = 4250;
platforms[2][23][1] = 410;
platforms[2][23][2] = 110;
platforms[2][23][3] = 10;

platforms[2][24][0] = 4300;
platforms[2][24][1] = 340;
platforms[2][24][2] = 30;
platforms[2][24][3] = 70;

platforms[2][25][0] = 4360;
platforms[2][25][1] = 220;
platforms[2][25][2] = 270;
platforms[2][25][3] = 20;

platforms[2][26][0] = 4670;
platforms[2][26][1] = 400;
platforms[2][26][2] = 90;
platforms[2][26][3] = 20;

platforms[2][27][0] = 4790;
platforms[2][27][1] = 150;
platforms[2][27][2] = 30;
platforms[2][27][3] = 50;

platforms[2][28][0] = 4880;
platforms[2][28][1] = 450;
platforms[2][28][2] = 50;
platforms[2][28][3] = 120;

platforms[2][29][0] = 5000;
platforms[2][29][1] = 190;
platforms[2][29][2] = 270;
platforms[2][29][3] = 30;

platforms[2][30][0] = 5150;
platforms[2][30][1] = 470;
platforms[2][30][2] = 140;
platforms[2][30][3] = 30;

platforms[2][31][0] = 5460;
platforms[2][31][1] = 480;
platforms[2][31][2] = 300;
platforms[2][31][3] = 20;

platforms[2][32][0] = 5580;
platforms[2][32][1] = 370;
platforms[2][32][2] = 20;
platforms[2][32][3] = 110;

platforms[2][33][0] = 5640;
platforms[2][33][1] = 300;
platforms[2][33][2] = 260;
platforms[2][33][3] = 10;

platforms[2][34][0] = 5920;
platforms[2][34][1] = 440;
platforms[2][34][2] = 50;
platforms[2][34][3] = 40;

platforms[2][35][0] = 5990;
platforms[2][35][1] = 140;
platforms[2][35][2] = 20;
platforms[2][35][3] = 130;

platforms[2][36][0] = 6120;
platforms[2][36][1] = 160;
platforms[2][36][2] = 50;
platforms[2][36][3] = 10;

platforms[2][37][0] = 6150;
platforms[2][37][1] = 460;
platforms[2][37][2] = 250;
platforms[2][37][3] = 20;

platforms[2][38][0] = 6310;
platforms[2][38][1] = 210;
platforms[2][38][2] = 270;
platforms[2][38][3] = 20;

platforms[2][39][0] = 6530;
platforms[2][39][1] = 500;
platforms[2][39][2] = 30;
platforms[2][39][3] = 50;

platforms[2][40][0] = 6680;
platforms[2][40][1] = 290;
platforms[2][40][2] = 40;
platforms[2][40][3] = 100;

platforms[2][41][0] = 6700;
platforms[2][41][1] = 480;
platforms[2][41][2] = 30;
platforms[2][41][3] = 80;

platforms[2][42][0] = 6860;
platforms[2][42][1] = 350;
platforms[2][42][2] = 250;
platforms[2][42][3] = 20;

platforms[2][43][0] = 6960;
platforms[2][43][1] = 270;
platforms[2][43][2] = 30;
platforms[2][43][3] = 80;

platforms[2][44][0] = 7160;
platforms[2][44][1] = 490;
platforms[2][44][2] = 120;
platforms[2][44][3] = 10;

platforms[2][45][0] = 7170;
platforms[2][45][1] = 160;
platforms[2][45][2] = 150;
platforms[2][45][3] = 20;

platforms[2][46][0] = 7450;
platforms[2][46][1] = 140;
platforms[2][46][2] = 70;
platforms[2][46][3] = 20;

platforms[2][47][0] = 7420;
platforms[2][47][1] = 480;
platforms[2][47][2] = 40;
platforms[2][47][3] = 70;

platforms[2][48][0] = 7580;
platforms[2][48][1] = 420;
platforms[2][48][2] = 90;
platforms[2][48][3] = 20;

platforms[2][49][0] = 7690;
platforms[2][49][1] = 210;
platforms[2][49][2] = 30;
platforms[2][49][3] = 110;

platforms[2][50][0] = 7750;
platforms[2][50][1] = 520;
platforms[2][50][2] = 90;
platforms[2][50][3] = 10;

platforms[2][51][0] = 7790;
platforms[2][51][1] = 290;
platforms[2][51][2] = 90;
platforms[2][51][3] = 20;

platforms[2][52][0] = 7950;
platforms[2][52][1] = 390;
platforms[2][52][2] = 30;
platforms[2][52][3] = 100;

platforms[2][53][0] = 8040;
platforms[2][53][1] = 440;
platforms[2][53][2] = 40;
platforms[2][53][3] = 50;

platforms[2][54][0] = 8160;
platforms[2][54][1] = 520;
platforms[2][54][2] = 130;
platforms[2][54][3] = 20;

platforms[2][55][0] = 8230;
platforms[2][55][1] = 450;
platforms[2][55][2] = 60;
platforms[2][55][3] = 70;

platforms[2][56][0] = 8340;
platforms[2][56][1] = 320;
platforms[2][56][2] = 240;
platforms[2][56][3] = 20;

platforms[2][57][0] = 8440;
platforms[2][57][1] = 240;
platforms[2][57][2] = 50;
platforms[2][57][3] = 80;

platforms[2][58][0] = 8580;
platforms[2][58][1] = 470;
platforms[2][58][2] = 230;
platforms[2][58][3] = 10;

platforms[2][59][0] = 8590;
platforms[2][59][1] = 130;
platforms[2][59][2] = 240;
platforms[2][59][3] = 20;

platforms[2][60][0] = 8850;
platforms[2][60][1] = 350;
platforms[2][60][2] = 20;
platforms[2][60][3] = 60;

platforms[2][61][0] = 8980;
platforms[2][61][1] = 230;
platforms[2][61][2] = 20;
platforms[2][61][3] = 100;

platforms[2][62][0] = 9120;
platforms[2][62][1] = 140;
platforms[2][62][2] = 270;
platforms[2][62][3] = 20;

platforms[2][63][0] = 9110;
platforms[2][63][1] = 300;
platforms[2][63][2] = 150;
platforms[2][63][3] = 20;

platforms[2][64][0] = 9400;
platforms[2][64][1] = 370;
platforms[2][64][2] = 20;
platforms[2][64][3] = 90;

platforms[2][65][0] = 9480;
platforms[2][65][1] = 220;
platforms[2][65][2] = 50;
platforms[2][65][3] = 60;

platforms[2][66][0] = 9710;
platforms[2][66][1] = 310;
platforms[2][66][2] = 250;
platforms[2][66][3] = 20;

platforms[2][67][0] = 9800;
platforms[2][67][1] = 220;
platforms[2][67][2] = 70;
platforms[2][67][3] = 90;

platforms[2][68][0] = 10004;
platforms[2][68][1] = 140;
platforms[2][68][2] = 450;
platforms[2][68][3] = 30;

//STAGEBOSS

// LEFT BORDER
platforms[3][0][0] = 0;
platforms[3][0][1] = 30;
platforms[3][0][2] = 30;
platforms[3][0][3] = 708;
//DOWN BORDER
platforms[3][1][0] = 0;
platforms[3][1][1] = 738;
platforms[3][1][2] = 1500;
platforms[3][1][3] = 30;
//UP BORDER
platforms[3][2][0] = 0;
platforms[3][2][1] = 0;
platforms[3][2][2] = 1500;
platforms[3][2][3] = 30;

//PLAYER PLATFORM
platforms[3][3][0] = 330;
platforms[3][3][1] = 600;
platforms[3][3][2] = 706;
platforms[3][3][3] = 30;

//RIGHT BORDER
platforms[3][4][0] = 1336;
platforms[3][4][1] = 30;
platforms[3][4][2] = 30;
platforms[3][4][3] = 708;
