function setup(){
  let renderer = createCanvas(windowWidth/100*65, windowHeight/100*65);
  renderer.parent("nestCanvas");
  frameRate(60);
  noSmooth();
}

function windowResized() {
  resizeCanvas(windowWidth/100*65, windowHeight/100*65);
}


function updateHealth(add){
  health+=add;
  document.getElementById("health").innerHTML="[ "+health+" ]";
  if(health<=0){
    resetData();
  }
}


setInterval(function(){

  var playersListMoniterString = "Server : " + chatRoom + " | Players Online : ";

  for(n in linkPls){
    playersListMoniterString+=n+", ";
  }
 
  document.getElementById("Gamewindow").innerHTML=playersListMoniterString;

},2000);

var gamescreen = new outV1();
var gameinput = new inV1(gamescreen.getScale());
var gamephysics = new physicsV1(gamescreen.getScale());
var gameworld = new worldV1();

gameworld.setChunk("0:0",gameworld.createChunk());

setInterval(function(){
  gameinput.movement();
  Send();
},50);

function draw(){
  var mouseOver=[];
  // background(27, 77, 62);
  background(50);

  document.getElementById("fps").innerHTML="FPS: [ "+round(frameRate())+" ]<br>x: [ "+round(x)+" ]"+"<br>y: [ "+round(y)+" ]<br>cx: [ "+cx+" ]"+"<br>cy: [ "+cy+" ]";

  
  // gamescreen.temp_render_chunks_img();

  if(debug.grid){
    gamescreen.render_grid();
  }

//Player Settup


  //new stuff. yay!

  var chunksToRender = gameworld.loadChunks(settings["renderDistance"]);

  gamescreen.render_chunks(gameworld.getChunks(chunksToRender));

  //end of new stuff

  gamescreen.old_render_player();

  gamescreen.old_render_blocks();

  gamescreen.old_render_players();

  gameinput.old_interactions();

//
  
  inputs["clickL"]=false;
  inputs["clickR"]=false;
  pcc=[cx,cy];
}

setInterval(function(){

  
  Send();
},50);
