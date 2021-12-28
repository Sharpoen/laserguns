function setup(){
  let renderer = createCanvas(windowWidth, windowHeight);
  frameRate(60);
  noSmooth();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function updateHealth(add){
  health+=add;
  if(health<=0){
    resetData();
  }
}


var gamescreen = new outV1();
var gs = new outV2();
var gameinput = new inV1(gamescreen.getScale());
var gameworld = new worldV1();
// var gui = new guiV1();
var g2 = new guiV2();

gameworld.setChunk("0:0",gameworld.createChunk());

var chunksToRender = gameworld.loadChunks(g2.settings["renderDistance"]);


setInterval(function(){
  chunksToRender = gameworld.loadChunks(g2.settings["renderDistance"]);
  
  gameinput.movement(gameworld);
  gamescreen.setGoing(inputs["up"]);

  if(inputs["zoomIn"]){
    if(gamescreen.getScale()<95){
      gamescreen.setScale(gamescreen.getScale()+1);
      gameinput.setScale(gamescreen.getScale()+1);
    }
  }
  if(inputs["zoomOut"]){
    if(gamescreen.getScale()>20){
      gamescreen.setScale(gamescreen.getScale()-2);
      gameinput.setScale(gamescreen.getScale()-2);
    }
  }
  Send();
},50);

window.addEventListener("keydown",function(event){
  g2.keypressed(event.keyCode,event.key);
});

setInterval(function(){
  if(inputs["up"]||inputs["down"]||inputs["left"]||inputs["right"]){
      if(wk==16){
        wk=32;
      }else{
        wk=16;
      }
  }else{
    wk=0;
  }
},500);

function aaaa(){};


function draw(){
  textFont(fonts["Ubuntu"]);
  render_scene();
  //inputs
  gameinput.use_item(gameworld);
  // ui_overlay();


  g2.tasks();


  aaaa();

//
  
  inputs["clickL"]=false;
  inputs["clickR"]=false;
  pcc=[cx,cy];
}