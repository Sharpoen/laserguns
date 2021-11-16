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

  movement(world){
      // let pat=Array.from([]); 

      // pat[0]=Math.floor(x/16);
      // pat[1]=Math.floor(y/16);

      // pat[2]=Math.floor(x)-pat[0]*16;
      // pat[3]=Math.floor(y)-pat[1]*16;
      // pat[5]=pat[2]+pat[3]*16;
      let newpos=Array.from([x,y]);

      if(inputs["left"]){
        newpos[0]-=speed;
      }
      if(inputs["right"]){
        newpos[0]+=speed;
      }
      if(inputs["up"]){
        newpos[1]-=speed;
      }
      if(inputs["down"]){
        newpos[1]+=speed;
      }

      let tl=[round(newpos[0]-0.4),round(newpos[1]-0.4)];
      let tr=[round(newpos[0]+0.4),round(newpos[1]-0.4)];
      let bl=[round(newpos[0]-0.4),round(newpos[1]+0.4)];
      let br=[round(newpos[0]+0.4),round(newpos[1]+0.4)];

      tl[2]=!world.getblock(world.modpos(tl[0],tl[1])).block.solid;
      tr[2]=!world.getblock(world.modpos(tr[0],tr[1])).block.solid;
      bl[2]=!world.getblock(world.modpos(bl[0],bl[1])).block.solid;
      br[2]=!world.getblock(world.modpos(br[0],br[1])).block.solid;
      
      let htl=[round(x-0.4),round(newpos[1]-0.4)];
      let htr=[round(x+0.4),round(newpos[1]-0.4)];
      let hbl=[round(x-0.4),round(newpos[1]+0.4)];
      let hbr=[round(x+0.4),round(newpos[1]+0.4)];

      htl[2]=!world.getblock(world.modpos(htl[0],htl[1])).block.solid;
      htr[2]=!world.getblock(world.modpos(htr[0],htr[1])).block.solid;
      hbl[2]=!world.getblock(world.modpos(hbl[0],hbl[1])).block.solid;
      hbr[2]=!world.getblock(world.modpos(hbr[0],hbr[1])).block.solid;
      
      let vtl=[round(newpos[0]-0.4),round(y-0.4)];
      let vtr=[round(newpos[0]+0.4),round(y-0.4)];
      let vbl=[round(newpos[0]-0.4),round(y+0.4)];
      let vbr=[round(newpos[0]+0.4),round(y+0.4)];

      vtl[2]=!world.getblock(world.modpos(vtl[0],vtl[1])).block.solid;
      vtr[2]=!world.getblock(world.modpos(vtr[0],vtr[1])).block.solid;
      vbl[2]=!world.getblock(world.modpos(vbl[0],vbl[1])).block.solid;
      vbr[2]=!world.getblock(world.modpos(vbr[0],vbr[1])).block.solid;

      if(vtl[2]&&vtr[2]&&vbl[2]&&vbr[2]){
        x=newpos[0];
      }

      if(htl[2]&&htr[2]&&hbl[2]&&hbr[2]){
        y=newpos[1];
      }

    cx=floor(x/16);
    cy=floor(y/16);

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
        let action;
        if(inventory[holdingItem]){
          action = inventory[holdingItem].p;
        }else{
          action = {};
        }
        if(action.placeblock){
          world.placeblock(action.placeblock.block.block,blockat);
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
                image:"tiles-holes-dirt",
              }
            }
          }else{
            if(["sand", "gravel", "dirt", "grass"].includes(newBlock.block.blockType)){
              newBlock.block.hp-=action.shovel.strength*5
            }else if(!(["stone","obsidian","iron_ore","coal_ore","obamium_ore"].includes(newBlock.block.blockType))){
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