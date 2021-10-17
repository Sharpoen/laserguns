class outV1{
  #game_scale = 50;
  constructor(){
  }

  setScale(game_scale){
    this.#game_scale = game_scale;
  }

  test(){
    alert("!");
  }
  render_grid(){
    strokeWeight(2);
    stroke(255,100);
    for(let i=0;i<128;i++){
      line(round((i*15-width/2+x)/15)*15+width/2-x-7.5,0,round((i*15-width/2+x)/15)*15+width/2-x-7.5,height);
    }
    for(let i=0;i<64;i++){
      line(0,round((i*15-height/2+y)/15)*15+height/2-y-7.5,width,round((i*15-height/2+y)/15)*15+height/2-y-7.5);
    }
    strokeWeight(2);
    stroke(255,0,0,255);


    for(let i=0;i<16;i++){
      line(round((i*15*16-width/2+x)/(15*16))*15*16+width/2-x-7.5,0,round((i*15*16-width/2+x)/(15*16))*15*16+width/2-x-7.5,height);
    }
    for(let i=0;i<16;i++){
      line(0,round((i*15*16-height/2+y)/(15*16))*15*16+height/2-y-7.5,width,round((i*15*16-height/2+y)/(15*16))*15*16+height/2-y-7.5);
    }
  }

  render_block(img,chunk_name,at){
    
  }

  render_chunk(chunk_data){
    
  }
  
}

class outinV2{
  
}