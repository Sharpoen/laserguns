function setup(){
  let renderer = createCanvas(700, 350);
  renderer.parent("nestCanvas");
  frameRate(60);
}

function updateHealth(add){
  health+=add;
  document.getElementById("health").innerHTML="[ "+health+" ]";
  if(health<=0){
    resetData();
  }
}

// setInterval(function(){
//   updateHealth(-1);
// },500);


setInterval(function(){

  var playersListMoniterString = "Players Online : ";

  for(n in linkPls){
    playersListMoniterString+=n+", ";
  }

  document.getElementById("Gamewindow").innerHTML=playersListMoniterString;
  // console.log(playersListMoniterString);
},2000);



function draw(){
  var mouseOver=[];
  background(100,100,255);

  document.getElementById("fps").innerHTML="FPS: [ "+round(frameRate())+" ]";

  var max;
  // if(width>height){
  //   max=25;
  // }else{
  //   max=25;
  // }
  max=25;
  var min=-max;

  if(debug.grid){
    strokeWeight(2);
    stroke(255,100);

    for(let i=0;i<64;i++){
      line(i*15-x+round(x/15)*15+width/2-round(width/15)/2*15,0,i*15-x+round(x/15)*15+width/2-round(width/15)/2*15,height);
      // line(0,i,width,i);
    }
    for(let i=0;i<64;i++){
      line(0,i*15-y+round(y/15)*15+height/2-round(height/15)/2*15,width,i*15-y+round(y/15)*15+height/2-round(height/15)/2*15);
      // line(i,0,i,height);
    }
  }

  line(max-x+width/2,max-y+height/2,min-x+width/2,min-y+height/2);
  line(max-x+width/2,min-y+height/2,min-x+width/2,max-y+height/2);


  fill(0,255,0);
  stroke(0,0);
  ellipse(width/2,height/2,15,15);

  var blocksU=blocks;
  // var testStr="";
  for(n in blocksU){
    // testStr+=n+", ";
    var b=blocksU[n]
    if(b.solid){
      if(dist(x,y,b.x,b.y)<15){
        x-=(b.x-x)/3.14;//nothing to do with pi, just optimal for collision
        y-=(b.y-y)/3.14;
          //temporary collision patch
            x=round(x/15)*15
            y=round(y/15)*15
      }
    }
    if(b.type=="sand"){
      fill((255/b.maxhp)*b.hp,(255/b.maxhp)*b.hp,0);
      rect(b.x-x+width/2-7.5,b.y-y+height/2-7.5,15,15);
      

    }
  }
  // chat=testStr;
  // chat+=" ["+Object.keys(blocks).length+"] " + chatd[0];

  var plsU=pls;
  fill(255,0,0);
  for(let i=0;i<plsU.length;i++){
    if(plsU[i].name!=name){
      fill(0);
      // stroke(0,255);
      text(plsU[i].name,plsU[i].x+width/2-x,plsU[i].y+height/2-y-10);
      // if(dist(x,y,plsU[i].x,plsU[i].y)<15){
      //   // fill(60,255,225);
      //   x-=(plsU[i].x-x)/4;
      //   y-=(plsU[i].y-y)/4;
      //     //temporary collision patch
      //       x=round(x/15)*15
      //       y=round(y/15)*15
      // }
  
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
    fill(255,0,0,75);
    ellipse(round((mouseX+x-width/2)/15)*15+width/2-x,round((mouseY+y-height/2)/15)*15+height/2-y,20,20);
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
        // alert(mouseOver);
        socket.emit("interact",{"attack":mouseOver,"damage":-10})
      }
    }
  }

  inputs["clickL"]=false;
  inputs["clickR"]=false;
}