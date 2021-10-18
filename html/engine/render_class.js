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
    var adjustX=((x*this.#game_scale)%this.#game_scale);
    var adjustY=((y*this.#game_scale)%this.#game_scale);
    var adjustCX=((x*this.#game_scale*16)%this.#game_scale*16);
    var adjustCY=((y*this.#game_scale*16)%this.#game_scale*16);

    strokeWeight(2);
    stroke(255,100);

    for(let i=0;i<128;i++){
      line(i*this.#game_scale+adjustWidth-adjustX+this.#game_scale/2,0,i*this.#game_scale+adjustWidth-adjustX+this.#game_scale/2,height);
    }
    for(let i=0;i<128;i++){
      line(0,i*this.#game_scale+adjustHeight-adjustY+this.#game_scale/2,width,i*this.#game_scale+adjustHeight-adjustY+this.#game_scale/2);
    }

    // stroke(255, 0, 0);
    // for(let i=0;i<64;i++){
    //   line(i*16*this.#game_scale+adjustWidth-adjustCX+this.#game_scale/2,0,i*16*this.#game_scale+adjustWidth-adjustCX+this.#game_scale/2,height);
    // }
    // for(let i=0;i<64;i++){
    //   line(0,i*16*this.#game_scale+adjustHeight-adjustCY+this.#game_scale/2,width,i*16*this.#game_scale+adjustHeight-adjustCY+this.#game_scale/2);
    // }
  }

  old_render_blocks(){
    var blocksU=blocks;

    for(n in blocksU){

      var b=blocksU[n]

      //collision used to be here

      if(b.type=="sand"){
        image(images.blocks[0],b.x*this.#game_scale-x*this.#game_scale+width/2-this.#game_scale/2,b.y*this.#game_scale-y*this.#game_scale+height/2-this.#game_scale/2,this.#game_scale,this.#game_scale);
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
        fill(0);
        text(plsU[i].name,plsU[i].x+width/2-x,plsU[i].y+height/2-y-10);

        fill(255,0,0,25);
        ellipse(plsU[i].x+width/2-x,plsU[i].y+height/2-y,30,30);

        fill(255,0,0);
        ellipse(plsU[i].x+width/2-x,plsU[i].y+height/2-y,15,15);
      }
    }
  }

  set_img(img,chunk_name,at){
    
  }

  render_chunk(chunk_data){
    
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