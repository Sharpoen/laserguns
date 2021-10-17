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

  var playersListMoniterString = "Players Online : ";

  for(n in linkPls){
    playersListMoniterString+=n+", ";
  }

  document.getElementById("Gamewindow").innerHTML=playersListMoniterString;

},2000);

var gamescreen = new outV1();


// gamescreen.test();

function draw(){
  var mouseOver=[];
  background(27, 77, 62);

  document.getElementById("fps").innerHTML="FPS: [ "+round(frameRate())+" ]<br>x: [ "+round(x)+" ]"+"<br>y: [ "+round(y)+" ]<br>cx: [ "+cx+" ]"+"<br>cy: [ "+cy+" ]";

  
  if(cx!=pcc[0]||cy!=pcc[1]){
    renderChunks = loadChunks(settings["renderDistance"]);
  }
  var renderChunksU=renderChunks;
  for(let i=0;i<renderChunksU.length;i++){

    if(
      chunks[renderChunksU[i][0]+":"+renderChunksU[i][1]]==undefined
    ){
      chunks[renderChunksU[i][0]+":"+renderChunksU[i][1]]=chunkPreset(images.chunks[Math.floor(Math.random() * images.chunks.length)]);
    }

    image(chunks[renderChunksU[i][0]+":"+renderChunksU[i][1]].image,-x+width/2-7.5+renderChunksU[i][0]*240,-y+height/2-7.5+renderChunksU[i][1]*240,240,240);
  }


  if(debug.grid){
    gamescreen.render_grid();
  }

//Player Settup
  gamescreen.old_render_player();

  gamescreen.old_render_blocks();
  
  var plsU=pls;
  fill(255,0,0);
  for(let i=0;i<plsU.length;i++){
    if(plsU[i].name!=name){
      fill(0);
      text(plsU[i].name,plsU[i].x+width/2-x,plsU[i].y+height/2-y-10);

      fill(255,0,0,25);
      if(dist(mouseX,mouseY,plsU[i].x+width/2-x,plsU[i].y+height/2-y)<15){
        fill(0,2555,0,50);
        mouseOver.push(plsU[i].name);
      }
      ellipse(plsU[i].x+width/2-x,plsU[i].y+height/2-y,30,30);

      fill(255,0,0);
      ellipse(plsU[i].x+width/2-x,plsU[i].y+height/2-y,15,15);
    }
  }

  if(dist(mouseX,mouseY,width/2,height/2)<75){
    fill(25,0,0,75);
    rect(round((mouseX+x-width/2)/15)*15+width/2-x-10,round((mouseY+y-height/2)/15)*15+height/2-y-10,20,20);
    if(inputs["clickL"]){
      if(holdingItem=="sand"){
        if(inventory[holdingItem]>0){
          var newBlock={x:round((mouseX+x-width/2)/15)*15,y:round((mouseY+y-height/2)/15)*15,id:round((mouseX+x-width/2)/15)*15+":"+round((mouseY+y-height/2)/15)*15,type:"sand",hp:10,maxhp:10,solid:true};
          blocks[newBlock.id]=newBlock;
          socket.emit("block",newBlock);
          
          inventory[holdingItem]-=1;
          loadhudInventory();
        }
      }
      if(holdingItem=="shovel"){
        if(round((mouseX+x-width/2)/15)*15+":"+round((mouseY+y-height/2)/15)*15 in blocks){
          var newBlock=blocks[round((mouseX+x-width/2)/15)*15+":"+round((mouseY+y-height/2)/15)*15];
          
          if(newBlock.type=="sand"){
            newBlock.hp-=6;
          }

          if(newBlock.hp>0){
            blocks[round((mouseX+x-width/2)/15)*15+":"+round((mouseY+y-height/2)/15)*15]=newBlock;
          }else{
            if(newBlock.type in inventory){
              inventory[newBlock.type]+=1;
            }else{
              inventory[newBlock.type]=1;
            }
            loadhudInventory();
            newBlock={x:round((mouseX+x-width/2)/15)*15,y:round((mouseY+y-height/2)/15)*15,id:round((mouseX+x-width/2)/15)*15+":"+round((mouseY+y-height/2)/15)*15,type:"air",hp:10,maxhp:10,solid:false};
            blocks[newBlock.id]=newBlock;
          }
          socket.emit("block",newBlock);

        }
      }
      if(holdingItem=="hand"){
        if(round((mouseX+x-width/2)/15)*15+":"+round((mouseY+y-height/2)/15)*15 in blocks){
          var newBlock=blocks[round((mouseX+x-width/2)/15)*15+":"+round((mouseY+y-height/2)/15)*15];

          newBlock.hp-=1;

          if(newBlock.hp>0){
            blocks[round((mouseX+x-width/2)/15)*15+":"+round((mouseY+y-height/2)/15)*15]=newBlock;
          }else{
            newBlock={x:round((mouseX+x-width/2)/15)*15,y:round((mouseY+y-height/2)/15)*15,id:round((mouseX+x-width/2)/15)*15+":"+round((mouseY+y-height/2)/15)*15,type:"air",hp:10,maxhp:10,solid:false};
            blocks[newBlock.id]=newBlock;
          }
          socket.emit("block",newBlock);

        }
      }
      if(holdingItem=="sword"){
        socket.emit("interact",{"attack":mouseOver,"damage":-10})
      }
    }
  }

  inputs["clickL"]=false;
  inputs["clickR"]=false;
  pcc=[cx,cy];
}