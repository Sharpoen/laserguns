class outV1{
  #game_scale = 30;
  #chunksImages={};
  #openChunks={};
  playerAnimFrame=0;
  
  #goingUoD=1;

  constructor(){
    this.old_mouseOver=[];
  }

  setScale(game_scale){
    this.#game_scale = game_scale;
  }
  getScale(){
    return this.#game_scale;
  }

  setGoing(up){
    this.#goingUoD=2;
    if(up){
      this.#goingUoD=1;
    }
  }
  render_grid(){
    var adjustWidth=(width/2)%this.#game_scale;
    var adjustHeight=(height/2)%this.#game_scale;
    var cAdjustWidth=((width/32)%this.#game_scale)*16-this.#game_scale;
    var cAdjustHeight=((height/32)%this.#game_scale)*16-this.#game_scale;
    var adjustX=((x*this.#game_scale)%this.#game_scale);
    var adjustY=((y*this.#game_scale)%this.#game_scale);
    var adjustCX=((x/16*this.#game_scale)%this.#game_scale)*16;
    var adjustCY=((y/16*this.#game_scale)%this.#game_scale)*16;

    strokeWeight(2);
    stroke(255,100);

    for(let i=0;i<128;i++){
      line(i*this.#game_scale+adjustWidth-adjustX+this.#game_scale/2,0,i*this.#game_scale+adjustWidth-adjustX+this.#game_scale/2,height);
    }
    for(let i=0;i<128;i++){
      line(0,i*this.#game_scale+adjustHeight-adjustY+this.#game_scale/2,width,i*this.#game_scale+adjustHeight-adjustY+this.#game_scale/2);
    }

    stroke(255, 0, 0);
    for(let i=0;i<64;i++){
      line(i*16*this.#game_scale+cAdjustWidth-adjustCX+this.#game_scale/2,0,i*16*this.#game_scale+cAdjustWidth-adjustCX+this.#game_scale/2,height);
    }
    for(let i=0;i<64;i++){
      line(0,i*16*this.#game_scale+cAdjustHeight-adjustCY+this.#game_scale/2,width,i*16*this.#game_scale+cAdjustHeight-adjustCY+this.#game_scale/2);
    }
  }

  old_render_blocks(){
    var blocksU=blocks;

    for(n in blocksU){

      var b=blocksU[n]

      //collision used to be here

      if(b.type=="sand"){
        image(images["blocks-sand"],b.x*this.#game_scale-x*this.#game_scale+width/2-this.#game_scale/2,b.y*this.#game_scale-y*this.#game_scale+height/2-this.#game_scale/2,this.#game_scale,this.#game_scale);
      }
    }
  }

  old_render_player(){
    fill(256,256,256);
    stroke(0,0);
    rect(width/2-this.#game_scale/2,height/2-this.#game_scale/2, this.#game_scale, this.#game_scale);
  }

  render_player(walking){
    var moving = 0;
    if(walking){
      moving=this.#goingUoD;
    }

    if(moving==1){
      if(this.playerAnimFrame==0){
        image(images["player-full"],width/2-(this.#game_scale*1.5)/2,height/2-(this.#game_scale*1.5)/1.5, (this.#game_scale*1.5), (this.#game_scale*1.5),0,32,16,16);
      }else{
        image(images["player-full"],width/2-(this.#game_scale*1.5)/2,height/2-(this.#game_scale*1.5)/1.5, (this.#game_scale*1.5), (this.#game_scale*1.5),16,32,16,16);
      }
    }else if(moving == 2){
      if(this.playerAnimFrame==0){
        image(images["player-full"],width/2-(this.#game_scale*1.5)/2,height/2-(this.#game_scale*1.5)/1.5, (this.#game_scale*1.5), (this.#game_scale*1.5),16,0,16,16);
      }else{
        image(images["player-full"],width/2-(this.#game_scale*1.5)/2,height/2-(this.#game_scale*1.5)/1.5, (this.#game_scale*1.5), (this.#game_scale*1.5),0,16,16,16);
      }
    }else{
      image(images["player-full"],width/2-(this.#game_scale*1.5)/2,height/2-(this.#game_scale*1.5)/1.5, (this.#game_scale*1.5), (this.#game_scale*1.5),0,0,16,16);
    }
  }

  old_render_players(){
    var plsU=pls;
    fill(255,0,0);
    for(let i=0;i<plsU.length;i++){
      if(plsU[i].name!=name){
        
        fill(255,0,0);
        rect(plsU[i].x*this.#game_scale+width/2-x*this.#game_scale-this.#game_scale/2,plsU[i].y*this.#game_scale+height/2-y*this.#game_scale-this.#game_scale/2,this.#game_scale,this.#game_scale);


        fill(0);
        text(plsU[i].name,plsU[i].x*this.#game_scale+width/2-x*this.#game_scale,plsU[i].y*this.#game_scale+height/2-y*this.#game_scale-10);

      }
    }
  }

  render_chunk(chunk_data,atx,aty,qbt){
    for(let i=0;i<256;i++){
      if(chunk_data[i].block.transparent&&qbt=="tiles"){
        if(images[chunk_data[i].tile.image]){
          image(images[chunk_data[i].tile.image],-x*this.#game_scale+width/2-this.#game_scale/2+atx*this.#game_scale+floor(i%16)*this.#game_scale,-y*this.#game_scale+height/2-this.#game_scale/2+aty*this.#game_scale+floor(i/16)*this.#game_scale,this.#game_scale,this.#game_scale);
        }
      }
      if(!chunk_data[i].block.invisible&&qbt=="blocks"){
        if(images[chunk_data[i].block.image]){
          image(images[chunk_data[i].block.image],-x*this.#game_scale+width/2-this.#game_scale/2+atx*this.#game_scale+floor(i%16)*this.#game_scale,-y*this.#game_scale+height/2-this.#game_scale/2+aty*this.#game_scale+floor(i/16)*this.#game_scale-this.#game_scale/4,this.#game_scale,this.#game_scale*1.25);
        }
      }
    }
  }
  render_chunks(chunk_data){
    var vertOrder=[];
    for(var n in chunk_data){
      if(vertOrder[n.split(":")[1]]==undefined){
        vertOrder[n.split(":")[1]]=[];
      }
      vertOrder[n.split(":")[1]].push(n);
    }

    var rev_vert_order=[];
    var vert_order=[];
    
    for(let a in vertOrder){
      for(let b in vertOrder[a]){
        if(vertOrder[a][b].split(":")[1]<0){
          rev_vert_order.push(vertOrder[a][b]);
        }else{
          vert_order.push(vertOrder[a][b]);
        }
      }
    }
    var revd_rev_vert_order=[];
    for(let i=rev_vert_order.length-1;i>=0;i--){
      revd_rev_vert_order.push(rev_vert_order[i]);
    }
    for(let i=0;i<vert_order.length;i++){
      revd_rev_vert_order.push(vert_order[i]);
    }

    vert_order=revd_rev_vert_order;
    for(let i in vert_order){
      var n=vert_order[i];
      var atx=n.split(":")[0]*16;
      var aty=n.split(":")[1]*16;

      // this.render_chunk(chunk_data[n],atx,aty);
      this.render_chunk(chunk_data[n],atx,aty,"tiles");
    }
    for(let i in vert_order){
      var n=vert_order[i];
      var atx=n.split(":")[0]*16;
      var aty=n.split(":")[1]*16;

      // this.render_chunk(chunk_data[n],atx,aty);
      this.render_chunk(chunk_data[n],atx,aty,"blocks");
    }
  }
  
}

class outinV2{
  
}