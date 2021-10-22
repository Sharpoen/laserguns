class inV1{
  #game_scale;
  constructor(game_scale){
    this.#game_scale=game_scale;
  }

  setScale(game_scale){
    this.#game_scale = game_scale;
  }
  getScale(){
    return this.#game_scale;
  }

  movement(){
    if(inputs["up"]){
      y-=speed;
      cy=floor(y/16);
    }
    if(inputs["down"]){
      y+=speed;
      cy=floor(y/16);
    }
    if(inputs["left"]){
      x-=speed;
      cx=floor(x/16);
    }
    if(inputs["right"]){
      x+=speed;
      cx=floor(x/16);
    }
  }

  old_interactions(){
    if(dist(mouseX,mouseY,width/2,height/2)<5*this.#game_scale){
      fill(25,0,0,75);
      rect(round((mouseX-width/2)/this.#game_scale+x)*this.#game_scale+width/2-x*this.#game_scale-(this.#game_scale*1.3)/2,round((mouseY-height/2)/this.#game_scale+y)*this.#game_scale+height/2-y*this.#game_scale-(this.#game_scale*1.3)/2,this.#game_scale*1.3,this.#game_scale*1.3);
      if(inputs["clickL"]){
        if(holdingItem=="sand"){
          if(inventory[holdingItem]["amount"]>0){
            var newBlock={x:round((mouseX-width/2)/this.#game_scale+x),y:round((mouseY-height/2)/this.#game_scale+y),id:round((mouseX-width/2)/this.#game_scale+x)+":"+round((mouseY-height/2)/this.#game_scale+y),type:"sand",hp:10,maxhp:10,solid:true};
            blocks[newBlock.id]=newBlock;
            socket.emit("block",newBlock);
            
            inventory[holdingItem]["amount"]-=1;
            loadhudInventory();
          }
        }
        if(holdingItem=="shovel"){
          if(round((mouseX-width/2)/this.#game_scale+x)+":"+round((mouseY-height/2)/this.#game_scale+y) in blocks){
            var newBlock=blocks[round((mouseX-width/2)/this.#game_scale+x)+":"+round((mouseY-height/2)/this.#game_scale+y)];
            
            if(newBlock.type=="sand"){
              newBlock.hp-=6;
            }

            if(newBlock.hp>0){
              blocks[round((mouseX-width/2)/this.#game_scale+x)+":"+round((mouseY-height/2)/this.#game_scale+y)]=newBlock;
            }else{
              if(newBlock.type in inventory){
                inventory[newBlock.type]+=1;
              }else{
                inventory[newBlock.type]=1;
              }
              loadhudInventory();
              newBlock={x:round((mouseX-width/2)/this.#game_scale+x),y:round((mouseY-height/2)/this.#game_scale+y),id:round((mouseX-width/2)/this.#game_scale+x)+":"+round((mouseY-height/2)/this.#game_scale+y),type:"air",hp:10,maxhp:10,solid:false};
              blocks[newBlock.id]=newBlock;
            }
            socket.emit("block",newBlock);

          }
        }
        if(holdingItem=="hand"){
          if(round((mouseX-width/2)/this.#game_scale+x)*this.#game_scale+":"+round((mouseY-height/2)/this.#game_scale+y)*this.#game_scale in blocks){
            var newBlock=blocks[round((mouseX-width/2)/this.#game_scale+x)+":"+round((mouseY-height/2)/this.#game_scale+y)];

            newBlock.hp-=1;

            if(newBlock.hp>0){
              blocks[round((mouseX-width/2)/this.#game_scale+x)+":"+round((mouseY-height/2)/this.#game_scale+y)]=newBlock;
            }else{
              newBlock={x:round((mouseX-width/2)/this.#game_scale+x),y:round((mouseY-height/2)/this.#game_scale+y),id:round((mouseX-width/2)/this.#game_scale+x)+":"+round((mouseY-height/2)/this.#game_scale+y),type:"air",hp:10,maxhp:10,solid:false};
              blocks[newBlock.id]=newBlock;
            }
            socket.emit("block",newBlock);

          }
        }
        // if(holdingItem=="sword"){
        //   socket.emit("interact",{"attack":mouseOver,"damage":-10})
        // }
      }
    }
  }
}