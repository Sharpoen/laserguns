
class worldV1{
  
  #chunks = {}


  constructor(){
    
  }

  createBlock(){
    var newBlock={
      block:{
        solid:false,
        blockType:"air",
        transparent:true,
        invisible:true,
        image:"blocks-air",
        hp:1,
        maxhp:1,
      },
      tile:{
        solid:true,
        tileType:"grass",
        image:"tiles-grass-"+randomNumber(0,3).toString(),
      }
    };

    return newBlock;
  }

  createChunk(){
    
    var newChunk=[];

    for(let i=0;i<256;i++){
      newChunk[i]=this.createBlock();
    }
    
    return newChunk;

  }
  
  setChunk(chunkPos,chunk){
    this.#chunks[chunkPos]=chunk;
  }

  getChunk(chunkPos){

    if(this.#chunks[chunkPos]==undefined){
      this.setChunk(chunkPos, this.createChunk());
    }
    
    return this.#chunks[chunkPos];

  }

  placeblock(new_block,placeat){
    this.getChunk(placeat[0]+":"+placeat[1]);
    this.#chunks[placeat[0]+":"+placeat[1]][placeat[5]].block=new_block;
  }
  placetile(new_tile,placeat){
    this.getChunk(placeat[0]+":"+placeat[1]);
    this.#chunks[placeat[0]+":"+placeat[1]][placeat[5]].tile=new_tile;
  }

  getblock(placeat){
    return this.getChunk(placeat[0]+":"+placeat[1])[placeat[5]];
  }

  loadChunks(rDist){
    var openChunks=[];
    for(let a=-(rDist+1);a<rDist;a++){
      for(let b=-(rDist+1);b<rDist;b++){
        openChunks.push((cx-a-1).toString()+":"+(cy-b-1).toString());
      }
    }
    return openChunks;
  }

  pointInChunk(fx,fy){
    return [floor(fx/16),floor(fy/16)];
  }
  pointAtBlock(fx,fy){
    let inchunk=this.pointInChunk(fx,fy);

    let pointat=inchunk[0]+":"+inchunk[1]+":";



    return pointat;
  }

  getChunks(chunks){
    var gotChunks={};
    for(let i=0;i<chunks.length;i++){
      gotChunks[chunks[i]]=this.getChunk(chunks[i]);
    }
    return gotChunks;
  }

}