var chat="";
var lastJoin="";
//hi
var name="";

var x=0;
var y=0;

var pcc=[cx,cy];
var cx=0;
var cy=0;




var speed=0.2;

var linkPls={
  
};
var pls=[];
var blocks=[];


var debug={
  "grid":false,
  "hitboxes":false,
  "blockoverlay":false,
  "testDebugItem2":false,
  "testDebugItem3":false,
}
/*
p:primary
s:secondary
*/
var inventory={
  "hand":{amount:1,image:"items-hand",p:{},s:{}},
  "sand":{amount:64,image:"nblocks-sand",p:{
    "placeblock":{
      block:{
        blockType:"sand",
        solid:true,
        transparent:false,
        image:"nblocks-sand",
        hp:10,
        maxhp:10
      }
    }
  },s:{}},
  "sword":{amount:1,image:"items-protosword",p:{
    "sword":{
      strength:1
    }
  },s:{}},
  "shovel":{amount:1,image:"items-protoshovel",p:{
    "shovel":{
      strength:1
    }
  },s:{}},
  "wood":{amount:16,image:"items-wood",p:{},s:{}},
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

  inventory["hand"].amount=1;
  inventory["sand"].amount=64;
  inventory["sword"].amount=1;
  inventory["shovel"].amount=1;
  inventory["wood"].amount=16;
  // friends={};
  
  loadhudInventory();
  
  health=100;
  
  x=round((Math.random()*-(10))+(Math.random()*(10)));
  y=round((Math.random()*-(10))+(Math.random()*(10)));

  linkPls={
    
  };
  pls=[];
  // blocks={};
}


images={
 chunks:[],
 blocks:[],
 tiles:[]
}

function preload(){
  images["tiles-grass-0"]=loadImage("assets/assets-png/tiles/Grass/DarkerGrass.png");
  images["tiles-grass-1"]=loadImage("assets/assets-png/tiles/Grass/DarkGrass.png");
  images["tiles-grass-2"]=loadImage("assets/assets-png/tiles/Grass/LighterGrass.png");
  images["tiles-grass-3"]=loadImage("assets/assets-png/tiles/Grass/LightGrass.png");

  images["blocks-air"]=loadImage("assets/assets-png/blocks/air.png");
  images["blocks-sand"]=loadImage("assets/assets-png/blocks/sand.png");
  images["blocks-grass"]=loadImage("assets/assets-png/blocks/grass.png");

  images["nblocks-sand"]=loadImage("assets/assets-png/newBlocks/sand.png");

  images["items-protosword"]=loadImage("assets/assets-png/items/swords/sword1.png");

  images["items-protoshovel"]=loadImage("assets/assets-png/items/shovels/shovel1.png");

  images["items-hand"]=loadImage("assets/assets-png/items/handart1.png");

  images["items-wood"]=loadImage("assets/assets-png/items/wooditem.png");

  images["player-lite"]=loadImage("assets/assets-png/man.png");
  images["player-full"]=loadImage("assets/assets-png/Man.png");

  images["cursor"]=loadImage("assets/assets-png/uno.png");

}

/* https://betterprogramming.pub/how-to-obtain-random-numbers-within-a-range-using-javascript-83d3f9b0cd51 */
const randomNumber = (min, max) => { 
    //Use below if final number doesn't need to be whole number
    //return Math.random() * (max - min) + min;
    return Math.floor(Math.random() * (max - min) + min);
}
