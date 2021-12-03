class outV1{
  #game_scale = 31;
  #chunksImages={};
  #openChunks={};
  playerAnimFrame=0;
  
  #goingUoD=1;

  constructor(){
    this.old_mouseOver=[];
  }

  setScale(game_scale){
    this.#game_scale = game_scale;
    if(this.#game_scale%2==0){
      this.#game_scale+=1;
    }
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
  
  rp(img,st,wk){
    if(images[img]){
        image(images[img],width/2-(this.#game_scale*1.5)/2,height/2-(this.#game_scale*1.5)/1.5, (this.#game_scale*1.5), (this.#game_scale*1.5),wk,st,16,16);
    }
  }
  rpt(img,st,wk){
    if(images[img]){
        image(images[img],width/2-(this.#game_scale*1.5)/2,height/2-(this.#game_scale*1.5)/1.5, (this.#game_scale*1.5), (this.#game_scale*1.5)/2,wk,st,16,8);
    }
  }

  mrp(){
    let plsU=pls;
    textSize(20);
    for(let i=0;i<plsU.length;i++){
      if(plsU[i].name!=name){
        let img=plsU[i].img;
        if(!(images[img])){
          img="player-new-male";
        }

        fill(0);
        text(plsU[i].name,plsU[i].x*this.#game_scale+width/2-x*this.#game_scale,plsU[i].y*this.#game_scale+height/2-y*this.#game_scale-this.#game_scale*1.5);

        image(images[img],plsU[i].x*this.#game_scale-x*this.#game_scale+width/2-this.#game_scale*1.5/2,plsU[i].y*this.#game_scale-y*this.#game_scale+height/2-this.#game_scale, (this.#game_scale*1.5), (this.#game_scale*1.5),plsU[i].wk,plsU[i].st,16,16);
      }
    }
  }
  mrpt(){
    let plsU=pls;
    textSize(20);
    for(let i=0;i<plsU.length;i++){
      if(plsU[i].name!=name){
        let img=plsU[i].img;
        if(!(images[img])){
          img="player-new-male";
        }

        fill(0);
        text(plsU[i].name,plsU[i].x*this.#game_scale+width/2-x*this.#game_scale,plsU[i].y*this.#game_scale+height/2-y*this.#game_scale-this.#game_scale*1.5);

        image(images[img],plsU[i].x*this.#game_scale-x*this.#game_scale+width/2-this.#game_scale*1.5/2,plsU[i].y*this.#game_scale-y*this.#game_scale+height/2-this.#game_scale, (this.#game_scale*1.5), (this.#game_scale*1.5)/2,plsU[i].wk,plsU[i].st,16,8);
      }
    }
  }
  track_players(){
    let plsU=pls;
    stroke(255,0,0,255);
    strokeWeight(5);
    for(let i=0;i<plsU.length;i++){
      if(plsU[i].name!=name){
        line(width/2,height/2-this.#game_scale,plsU[i].x*this.#game_scale+width/2-x*this.#game_scale,plsU[i].y*this.#game_scale+height/2-y*this.#game_scale-this.#game_scale*1.5);
        fill(0);
      }
    }
    strokeWeight(1);
    stroke(0,0);
  }

  square_on(x_,y_){
    rect(x_*this.#game_scale-x*this.#game_scale+width/2-this.#game_scale/2,y_*this.#game_scale-y*this.#game_scale+height/2-this.#game_scale/2,this.#game_scale,this.#game_scale);
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
          image(images[chunk_data[i].block.image],-x*this.#game_scale+width/2-this.#game_scale/2+atx*this.#game_scale+floor(i%16)*this.#game_scale,-y*this.#game_scale+height/2-this.#game_scale/2+aty*this.#game_scale+floor(i/16)*this.#game_scale-this.#game_scale/16*4,this.#game_scale,this.#game_scale/16*20);
        }
      }
    }
  }
  render_chunks(chunk_data,qbt){
    
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
    if(qbt=="both"||qbt=="tiles"){
      for(let i in vert_order){
        var n=vert_order[i];
        var atx=n.split(":")[0]*16;
        var aty=n.split(":")[1]*16;

        // this.render_chunk(chunk_data[n],atx,aty);
        this.render_chunk(chunk_data[n],atx,aty,"tiles");
      }
    }
    if(qbt=="both"||qbt=="blocks"){
      for(let i in vert_order){
        var n=vert_order[i];
        var atx=n.split(":")[0]*16;
        var aty=n.split(":")[1]*16;

        // this.render_chunk(chunk_data[n],atx,aty);
        this.render_chunk(chunk_data[n],atx,aty,"blocks");
      }
    }
  }
  
}

class outV2{
  
}