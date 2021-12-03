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
  if(gui.pagesOpen["chat"]){
    if(event.keyCode==8){
      let z=chatIn.split("");
      z.splice(z.length-1,1);
      chatIn=z.join("");
    }
    if(event.key.toString().length==1){
      chatIn+=event.key.toString();
    }
  }
  if(event.keyCode==69&&!gui.freeze_keys){
    gui.pagesOpen["inventory"]=!gui.pagesOpen["inventory"];
    for(let n in gui.pagesOpen){
      if(n!="inventory"){
        gui.pagesOpen[n]=false;
      }
    }
  }
  if(event.keyCode==84&&!gui.freeze_keys){
    gui.freeze_keys=true;
    for(let n in inputs){
      inputs[n]=false;
    }
    gui.pagesOpen["chat"]=true;
  }
  if(event.keyCode==13){
    if(gui.pagesOpen["chat"]==true){
      if(!(chatIn=="")){
        SubmitChat();
      }else{
        gui.pagesOpen["chat"]=false;
        gui.freeze_keys=false;
      }
    }
  }
  if([49,50,51,52,53,54,55,56,57].includes(event.keyCode)){
    gui.hotswap(event.keyCode-49);
  }
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

function draw(){

  background(50);

  gamescreen.render_chunks(gameworld.getChunks(chunksToRender),"tiles");

  if(!debug.hitboxes){
    gamescreen.mrp();
    gamescreen.rp("player-new-male",st,wk);
  }

  gamescreen.render_chunks(gameworld.getChunks(chunksToRender),"blocks");

  if(true){
    let x = mouseX-width/2;
    let y = mouseY-height/2;
    if(abs(y)>abs(x)&&y<0){
      st=16;
    }  
    if(abs(x)>abs(y)&&x>=0){
      st=48;
    }
    if(abs(y)>abs(x)&&y>=0){
      st=0;
    }
    if(abs(x)>abs(y)&&x<0){
      st=32;
    }
  }

  // gamescreen.render_players();

  if(debug.testDebugItem2){
    gamescreen.track_players();
  }

  if(!debug.hitboxes){
    // gamescreen.render_player_top(inputs["up"]||inputs["down"]||inputs["left"]||inputs["right"]);
    gamescreen.mrpt();
    gamescreen.rpt("player-new-male",st,wk);
  }

  if(debug.grid){
    gamescreen.render_grid();
    stroke(0,0);
  }

  if(debug.hitboxes){
    fill(255);
    let gamescale=gamescreen.getScale();

    if(true){
      fill(255);
      
      // if(inputs["query"]){
      //   console.log("n"+pos[0]+"x"+x);
      //   console.log(rect(width/2-gamescale/2-pos[0]*gamescale+round(pos[0])*gamescale,height/2-pos[1]*gamescale+round(pos[1])*gamescale-gamescale/2,gamescale,gamescale));
      // }
      // rect(width/2-gamescale/2-pos[0]*gamescale+round(pos[0])*gamescale,height/2-pos[1]*gamescale+round(pos[1])*gamescale-gamescale/2,gamescale,gamescale);
      gamescreen.square_on(round(x),round(y));
      fill(0,0,255,100);
      gamescreen.square_on(round(x-0.4),round(y-0.4));
      fill(0,255,0,100);
      gamescreen.square_on(round(x+0.4),round(y-0.4));
      fill(255,0,0,100);
      gamescreen.square_on(round(x-0.4),round(y+0.4));
      fill(255,255,0,100);
      gamescreen.square_on(round(x+0.4),round(y+0.4));
      // y=pos[1]+0.5;
      // fill(255,0,0,100);
      // rect(width/2-gamescale/2-x*gamescale+round(x)*gamescale,height/2-y*gamescale+round(y)*gamescale-gamescale/2,gamescale,gamescale);
    }
  }


  if(gui.pagesOpen.chat){
    gui.render_chat();
  }else if(gui.pagesOpen.inventory||gui.pagesOpen.settings||gui.pagesOpen.debug){
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
    gui.render_bar(color(0,255,0),health,100,0,0,(width+height)/2/5,(width+height)/2/40);
  }

  if(gui.pagesOpen.connect){
    gui.render_connect();
  }
  fill(150);
  if(gui.box(0,0,15,15)){
    fill(75);
    if(inputs.clickL){
      gui.pagesOpen.connect=!gui.pagesOpen.connect;
    }
  }
  rect(0,0,15,15);
//
  
  inputs["clickL"]=false;
  inputs["clickR"]=false;
  pcc=[cx,cy];
}

setInterval(function(){

  
  Send();
},50);
