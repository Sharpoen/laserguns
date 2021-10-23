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
var gameworld = new worldV1();
var gui = new guiV1();

gameworld.setChunk("0:0",gameworld.createChunk());

var chunksToRender = gameworld.loadChunks(gui.settings["renderDistance"]);


setInterval(function(){
  chunksToRender = gameworld.loadChunks(gui.settings["renderDistance"]);
  
  gameinput.movement();
  gamescreen.setGoing(inputs["up"]);

  if(inputs["zoomIn"]){
    if(gamescreen.getScale()<50){
      gamescreen.setScale(gamescreen.getScale()+1);
      gameinput.setScale(gamescreen.getScale()+1);
    }
  }
  if(inputs["zoomOut"]){
    if(gamescreen.getScale()>30){
      gamescreen.setScale(gamescreen.getScale()-1);
      gameinput.setScale(gamescreen.getScale()-1);
    }
  }
  Send();
},50);

window.addEventListener("keydown",function(event){
  if(event.keyCode==69){
    gui.pagesOpen["inventory"]=!gui.pagesOpen["inventory"];
  }
});

setInterval(function(){
  gamescreen.playerAnimFrame+=1;
  if(gamescreen.playerAnimFrame>1){
    gamescreen.playerAnimFrame=0;
  }
},500);

function draw(){
  var mouseOver=[];
  // background(27, 77, 62);
  background(50);

  document.getElementById("fps").innerHTML="FPS: [ "+round(frameRate())+" ]<br>x: [ "+round(x)+" ]"+"<br>y: [ "+round(y)+" ]<br>cx: [ "+cx+" ]"+"<br>cy: [ "+cy+" ]";

//Player Settup


  //new stuff. yay!


  gamescreen.render_chunks(gameworld.getChunks(chunksToRender));

  //end of new stuff

  gamescreen.old_render_blocks();

  gamescreen.old_render_players();

  gamescreen.old_render_player();

  gamescreen.render_player(inputs["up"]||inputs["down"]||inputs["left"]||inputs["right"]);

  if(debug.grid){
    gamescreen.render_grid();
  }


  if(gui.pagesOpen["inventory"]||gui.pagesOpen["settings"]){
    gui.render_master();
    if(gui.pagesOpen["inventory"]){
      gui.render_inventory();
    }

  }else{
    gameinput.old_interactions();

    gui.render_hotbar();
  }

//
  
  inputs["clickL"]=false;
  inputs["clickR"]=false;
  pcc=[cx,cy];
}

setInterval(function(){

  
  Send();
},50);
