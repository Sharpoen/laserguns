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
  
  gameinput.movement(gameworld);
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
    for(let n in gui.pagesOpen){
      if(n!="inventory"){
        gui.pagesOpen[n]=false;
      }
    }
  }
  if([49,50,51,52,53,54,55,56,57].includes(event.keyCode)){
    gui.hotswap(event.keyCode-49);
  }
});

setInterval(function(){
  gamescreen.playerAnimFrame+=1;
  if(gamescreen.playerAnimFrame>1){
    gamescreen.playerAnimFrame=0;
  }
},500);

function draw(){
  // background(27, 77, 62);
  background(50);

//Player Settup


  //new stuff. yay!


  gamescreen.render_chunks(gameworld.getChunks(chunksToRender));

  //end of new stuff

  // gamescreen.old_render_blocks();

  gamescreen.old_render_players();
  gamescreen.render_players();

  if(!debug.hitboxes){
    gamescreen.render_player(inputs["up"]||inputs["down"]||inputs["left"]||inputs["right"]);
  }

  if(debug.grid){
    gamescreen.render_grid();
    stroke(0,0);
  }

  if(debug.hitboxes){
    // rect(-25/2,height/2-25/2, 25, 25);
    fill(255);
    let gamescale=gamescreen.getScale();
    rect(width/2-gamescale/2-x%1*gamescale+gamescale,height/2-gamescale/2-y%1*gamescale+gamescale,gamescale,gamescale);
    // if()
    //
    fill(0,50);
    ellipse(width/2,height/2,30,30);
    fill(0,255);
    ellipse(width/2,height/2,5,5);
      //
      fill(0,50);
      ellipse(width/2+speed*gamescreen.getScale(),height/2,gamescreen.getScale(),gamescreen.getScale());
      fill(0,255);
      ellipse(width/2+speed*gamescreen.getScale(),height/2,5,5);
      //
      fill(0,50);
      ellipse(width/2-speed*gamescreen.getScale(),height/2,gamescreen.getScale(),gamescreen.getScale());
      fill(0,255);
      ellipse(width/2-speed*gamescreen.getScale(),height/2,5,5);
      //
      fill(0,50);
      ellipse(width/2,height/2+speed*gamescreen.getScale(),gamescreen.getScale(),gamescreen.getScale());
      fill(0,255);
      ellipse(width/2,height/2+speed*gamescreen.getScale(),5,5);
      //
      fill(0,50);
      ellipse(width/2,height/2-speed*gamescreen.getScale(),gamescreen.getScale(),gamescreen.getScale());
      fill(0,255);
      ellipse(width/2,height/2-speed*gamescreen.getScale(),5,5);
      //

  }



  if(gui.pagesOpen.inventory||gui.pagesOpen.settings||gui.pagesOpen.debug){
    gui.render_master();
    if(gui.pagesOpen["inventory"]){
      gui.render_inventory();
    }else if(gui.pagesOpen["settings"]){
      gui.render_settings();
    }else if(gui.pagesOpen["debug"]){
      gui.render_debug();
    }

  }else{
    gameinput.use_item(gameworld);

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
