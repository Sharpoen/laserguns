var chat="";
var lastJoin="";
//hi
var name="";

var x=0;
var y=0;

var pcc=[cx,cy];
var cx=0;
var cy=0;

var chunks = {};
var renderChunks=loadChunks(1);


function chunkPreset(image){
  this.data={
    image:image,
  }
  return this.data;
}

function loadChunks(rDist){
  var openChunks=[];
  for(let a=-(rDist+1);a<rDist;a++){
    for(let b=-(rDist+1);b<rDist;b++){
      openChunks.push([(cx-a-1),(cy-b-1)]);
    }
  }
  return openChunks;
}


var speed=0.3;

var linkPls={
  
};
var pls=[];
var blocks=[];

var settings={
  "renderDistance":2,
  "scale":1.5
}
// settings["scale"]
var debug={
  "grid":false,
  "blockoverlay":false,
  "testDebugItem2":false,
  "testDebugItem3":false,
}

var inventory={
  "hand":1,
  "sand":64,
  "sword":1,
  "shovel":1,
  "wood":16,
};

var holdingItem="hand";

// var friends={

// }

var owner="";

var health = 100;

function resetData(){
  chat="";
  lastJoin="";
  holdingItem="hand";
  // name="";

  inventory["hand"]=1;
  inventory["sand"]=64;
  inventory["sword"]=1;
  inventory["shovel"]=1;
  inventory["wood"]=16;
  // friends={};
  
  loadhudInventory();
  
  health=100;
  
  x=round(((Math.random()*-(15*10))+(Math.random()*(15*10)))/15)*15;
  y=round(((Math.random()*-(15*10))+(Math.random()*(15*10)))/15)*15;

  linkPls={
    
  };
  pls=[];
  // blocks={};
}


images={
 chunks:[],
 blocks:[]
}

function preload(){
  images.chunks[0]=loadImage("assets/assets-png/chunks/Grass/DarkerGrass.png");
  images.chunks[1]=loadImage("assets/assets-png/chunks/Grass/DarkGrass.png");
  images.chunks[2]=loadImage("assets/assets-png/chunks/Grass/LighterGrass.png");
  images.chunks[3]=loadImage("assets/assets-png/chunks/Grass/LightGrass.png");

  images.blocks[0]=loadImage("assets/assets-png/blocks/sand.png");
}