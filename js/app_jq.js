// kod projektu Gra Platformowa
$(document).ready(function(){
  $("#btn1").click(function() {
    player.life++;
  });
  $("#btn2").click(function() {
    if (player.life > 1) player.life--;
  });
  $("#btn3").click(function() {
    player.jumpspeed++;
  });
  $("#btn4").click(function() {
    player.jumpspeed--;
  });
  $("#btn5").click(function() {
    if (stageid < 3) {
      stageid++;
      game.loadStage(stageid);
      game.completed = false;
      game.restartGame();
    }
  });
  $("#btn6").click(function() {
    if (stageid > 0) {
      stageid--;
      game.loadStage(stageid);
      game.completed = false;
      game.restartGame();
    }
  });
  $("#btn7").click(function() {
    player.speedx++;
  });
  $("#btn8").click(function() {
    player.speedx--;
  });
  $("#btn9").click(function() {
    game.grav++;
  });
  $("#btn10").click(function() {
    game.grav--;
  });
  $("#btn11").click(function() {
    player.maxjumpheight = player.maxjumpheight + 5;
  });
  $("#btn12").click(function() {
    player.maxjumpheight = player.maxjumpheight - 5;
  });
});
