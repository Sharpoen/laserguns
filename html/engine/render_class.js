class outV1{
  #game_scale = 20;
  #chunksImages={};
  #openChunks={};
  
  constructor(){
    this.old_mouseOver=[];
  }

  setScale(game_scale){
    this.#game_scale = game_scale;
  }
  getScale(){
    return this.#game_scale;
  }

  test(){
    alert("!");
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

  set_img(img,chunk_name,at){
    
  }

  render_chunk(chunk_data,atx,aty){
    for(let i=0;i<256;i++){
      image(images[chunk_data[i].tile.image],-x*this.#game_scale+width/2-this.#game_scale/2+atx*this.#game_scale+floor(i/16)*this.#game_scale,-y*this.#game_scale+height/2-this.#game_scale/2+aty*this.#game_scale+floor(i%16)*this.#game_scale,this.#game_scale,this.#game_scale);
    }
  }
  render_chunks(chunk_data){
    for(var n in chunk_data){
      var atx=n.split(":")[0]*16;
      var aty=n.split(":")[1]*16;
      for(let i=0;i<256;i++){
        image(images[chunk_data[n][i].tile.image],-x*this.#game_scale+width/2-this.#game_scale/2+atx*this.#game_scale+floor(i/16)*this.#game_scale,-y*this.#game_scale+height/2-this.#game_scale/2+aty*this.#game_scale+floor(i%16)*this.#game_scale,this.#game_scale,this.#game_scale);
      }
    }
  }

  render_chunk_imgs(){
    
  }

  temp_render_chunks_img(){
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

      image(chunks[renderChunksU[i][0]+":"+renderChunksU[i][1]].image,-x*this.#game_scale+width/2-this.#game_scale/2+renderChunksU[i][0]*this.#game_scale*16,-y*this.#game_scale+height/2-this.#game_scale/2+renderChunksU[i][1]*this.#game_scale*16,this.#game_scale*16,this.#game_scale*16);
    }
  }

  
}

class outinV2{
  
}