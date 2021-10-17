class outV1{
  #game_scale = 15;
  #chunksImages={};
  #openChunks={};
  
  constructor(){
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
    strokeWeight(2);
    stroke(255,100);
    for(let i=0;i<128;i++){
      line(round((i*this.#game_scale-width/2+x)/this.#game_scale)*this.#game_scale+width/2-x-7.5,0,round((i*this.#game_scale-width/2+x)/this.#game_scale)*this.#game_scale+width/2-x-7.5,height);
    }
    for(let i=0;i<64;i++){
      line(0,round((i*this.#game_scale-height/2+y)/this.#game_scale)*this.#game_scale+height/2-y-7.5,width,round((i*this.#game_scale-height/2+y)/this.#game_scale)*this.#game_scale+height/2-y-7.5);
    }
    strokeWeight(2);
    stroke(255,0,0,255);


    for(let i=0;i<16;i++){
      line(round((i*this.#game_scale*16-width/2+x)/(this.#game_scale*16))*this.#game_scale*16+width/2-x-7.5,0,round((i*this.#game_scale*16-width/2+x)/(this.#game_scale*16))*this.#game_scale*16+width/2-x-7.5,height);
    }
    for(let i=0;i<16;i++){
      line(0,round((i*this.#game_scale*16-height/2+y)/(this.#game_scale*16))*this.#game_scale*16+height/2-y-7.5,width,round((i*this.#game_scale*16-height/2+y)/(this.#game_scale*16))*this.#game_scale*16+height/2-y-7.5);
    }
  }

  old_render_blocks(){
    var blocksU=blocks;

    for(n in blocksU){

      var b=blocksU[n]
      if(b.solid){
        if(dist(x,y,b.x,b.y)<this.#game_scale){
          x-=(b.x-x)/2;
          y-=(b.y-y)/2;
            //temporary collision patch
              x=round(x/this.#game_scale)*this.#game_scale
              y=round(y/this.#game_scale)*this.#game_scale
        }
      }
      if(b.type=="sand"){
        image(images.blocks[0],b.x-x+width/2-this.#game_scale/2,b.y-y+height/2-this.#game_scale/2,this.#game_scale,this.#game_scale);
      }
    }
  }

  old_render_player(){
    fill(256,256,256);
    stroke(0,0);
    rect(width/2-this.#game_scale/2,height/2-this.#game_scale/2, this.#game_scale, this.#game_scale);
  }

  set_img(img,chunk_name,at){
    
  }

  render_chunk(chunk_data){
    
  }

  render_chunk_imgs(){
    
  }
  
}

class outinV2{
  
}