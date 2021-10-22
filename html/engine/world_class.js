
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
        tileType:true,
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

  loadChunks(rDist){
    var openChunks=[];
    for(let a=-(rDist+1);a<rDist;a++){
      for(let b=-(rDist+1);b<rDist;b++){
        openChunks.push((cx-a-1).toString()+":"+(cy-b-1).toString());
      }
    }
    return openChunks;
  }

  getChunks(chunks){
    var gotChunks={};
    for(let i=0;i<chunks.length;i++){
      gotChunks[chunks[i]]=this.getChunk(chunks[i]);
    }
    return gotChunks;
  }

}