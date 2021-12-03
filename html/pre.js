var chat="";
var lastJoin="";
//hi
var name="";

var x=0;
var y=0;

var st=0;
var wk=0;

var pcc=[cx,cy];
var cx=0;
var cy=0;


var messages=[];


var speed=0.2;

var linkPls={
  
};
var pls=[];
var blocks=[];

var settings={
  "scale":30,
}
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
        block:{
          blockType:"sand",
          solid:true,
          invisible:false,
          transparent:false,
          image:"nblocks-sand",
          hp:10,
          maxhp:10,
        },
        tile:{
          ignore:true,
        }
      }
    }
  },s:{}},
  "dirt":{amount:64,image:"nblocks-dirt",p:{
    "placeblock":{
      block:{
        block:{
          blockType:"dirt",
          solid:true,
          invisible:false,
          transparent:false,
          image:"nblocks-dirt",
          hp:15,
          maxhp:15,
        },
        tile:{
          ignore:true,
        }
      }
    }
  },s:{}},
  "cobble_stone":{amount:64,image:"nblocks-cobble_stone",p:{
    "placeblock":{
      block:{
        block:{
          blockType:"cobble_stone",
          solid:true,
          invisible:false,
          transparent:false,
          image:"nblocks-cobble_stone",
          hp:15,
          maxhp:15,
        },
        tile:{
          ignore:true,
        }
      }
    }
  },s:{}},
  "grass":{amount:64,image:"nblocks-grass",p:{
    "placeblock":{
      block:{
        block:{
          blockType:"grass",
          solid:true,
          invisible:false,
          transparent:false,
          image:"nblocks-grass",
          hp:15,
          maxhp:15,
        },
        tile:{
          ignore:true,
        }
      }
    }
  },s:{}},
  "log":{amount:64,image:"nblocks-log",p:{
    "placeblock":{
      block:{
        block:{
          blockType:"log",
          solid:true,
          invisible:false,
          transparent:false,
          image:"nblocks-log",
          hp:15,
          maxhp:15,
        },
        tile:{
          ignore:true,
        }
      }
    }
  },s:{}},
  "redblue":{amount:64,image:"nblocks-redblue",p:{
    "placeblock":{
      block:{
        block:{
          blockType:"debug",
          solid:false,
          invisible:false,
          transparent:true,
          image:"nblocks-redblue",
          hp:1,
          maxhp:1,
        },
        tile:{
          ignore:true,
        }
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
  // friends={};
    
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
  images["tiles-grass-4"]=loadImage("assets/assets-png/tiles/Grass/MediumGrass.png");

  images["tiles-holes-grass"]=loadImage("assets/assets-png/tiles/holes/grass.png");
  images["tiles-holes-dirt"]=loadImage("assets/assets-png/tiles/holes/dirt.png");

  images["blocks-air"]=loadImage("assets/assets-png/blocks/air.png");
  // images["blocks-sand"]=loadImage("assets/assets-png/b/sand.png");
  // images["blocks-grass"]=loadImage("assets/assets-png/blocks/grass.png");

  images["nblocks-sand"]=loadImage("assets/assets-png/newBlocks/b/sand.png");
  images["nblocks-dirt"]=loadImage("assets/assets-png/newBlocks/a/dirt.png");
  images["nblocks-cobble_stone"]=loadImage("assets/assets-png/newBlocks/a/cobble_stone.png");
  images["nblocks-grass"]=loadImage("assets/assets-png/newBlocks/a/grass.png");
  images["nblocks-log"]=loadImage("assets/assets-png/newBlocks/a/log.png");
  images["nblocks-grass"]=loadImage("assets/assets-png/newBlocks/b/grass.png");
  
  images["nblocks-redblue"]=loadImage("assets/assets-png/redblue.png");

  images["items-protosword"]=loadImage("assets/assets-png/items/swords/sword1.png");

  images["items-protoshovel"]=loadImage("assets/assets-png/items/shovels/shovel1.png");

  images["items-hand"]=loadImage("assets/assets-jpg/hand.jpg");

  images["items-wood"]=loadImage("assets/assets-png/items/wooditem.png");

  images["player-lite"]=loadImage("assets/assets-png/man.png");
  images["player-full"]=loadImage("assets/assets-png/Hoodie.png");
  images["player-full-male"]=loadImage("assets/assets-png/Man.png");
  images["player-full-female"]=loadImage("assets/assets-png/Woman.png");
  images["player-full-hoodie"]=loadImage("assets/assets-png/Hoodie.png");
  
  images["player-new-male"]=loadImage("assets/Man.png");

  images["cursor"]=loadImage("assets/assets-png/uno.png");

}

/* https://betterprogramming.pub/how-to-obtain-random-numbers-within-a-range-using-javascript-83d3f9b0cd51 */
const randomNumber = (min, max) => { 
    //Use below if final number doesn't need to be whole number
    //return Math.random() * (max - min) + min;
    return Math.floor(Math.random() * (max - min) + min);
}
