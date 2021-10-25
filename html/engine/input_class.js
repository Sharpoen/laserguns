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

  use_item(world){
    stroke(0,0);
    if(dist(mouseX,mouseY,width/2,height/2)<5*this.#game_scale){
      fill(0,100,0,75);
      rect(round((mouseX-width/2)/this.#game_scale+x)*this.#game_scale+width/2-x*this.#game_scale-(this.#game_scale*1.3)/2,round((mouseY-height/2)/this.#game_scale+y)*this.#game_scale+height/2-y*this.#game_scale-(this.#game_scale*1.3)/2,this.#game_scale*1.3,this.#game_scale*1.3);
      image(images["cursor"],round((mouseX-width/2)/this.#game_scale+x)*this.#game_scale+width/2-x*this.#game_scale-(this.#game_scale*1.3)/2,round((mouseY-height/2)/this.#game_scale+y)*this.#game_scale+height/2-y*this.#game_scale-(this.#game_scale*1.3)/2,this.#game_scale*1.3,this.#game_scale*1.3);
      
      let mouseat=round((mouseX-width/2)/this.#game_scale+x)+":"+round((mouseY-height/2)/this.#game_scale+y);
      let blockat=[]; 

      blockat[0]=Math.floor(mouseat.split(":")[0]/16)
      blockat[1]=Math.floor(mouseat.split(":")[1]/16)

      blockat[2]=Math.floor(mouseat.split(":")[0])-blockat[0]*16;
      blockat[3]=Math.floor(mouseat.split(":")[1])-blockat[1]*16;
      blockat[5]=blockat[2]+blockat[3]*16;

      if(inputs["clickL"]){
        let action = inventory[holdingItem].p;
        if(action.placeblock){
          world.placeblock(action.placeblock.block,blockat);
          tellServerBlock(action.placeblock.block,blockat);
        }
        if(action.shovel){
          let newChunk=world.getChunk(blockat[0]+":"+blockat[1]);
          let newBlock=newChunk[blockat[5]];
          if(inputs["query"]){
            console.log(newChunk);
            console.log(newBlock);
          }

          if(newBlock.block.blockType=="air"){
            if(newBlock.tile.tileType="grass"){
              newBlock.tile={
                tileType:"air",
                solid:false,
              }
            }
          }else{
            if(["sand", "gravel", "dirt", "grass"].includes(newBlock.block.blockType)){
              newBlock.block.hp-=action.shovel.strength*5
            }else if(!["stone","wood","obsidian","iron_ore","coal_ore","obamium_ore"].includes(newBlock.block.blockType)){
              newBlock.block.hp-=1;
            }
            if(newBlock.block.hp<=0){
              newBlock.block={
                blockType:"air",
                maxhp:1,
                hp:1,
                solid:false,
                transparent:true,
                invisible:true
              }
            }
          }
          tellServerBlock(newBlock,blockat);
          world.placeblock(newBlock.block,blockat);
          world.placetile(newBlock.tile,blockat);
        }

      }
      if(inputs["clickR"]){
        let action = inventory[holdingItem].s;
      }

    }
  }
}