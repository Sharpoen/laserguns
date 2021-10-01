var chatd = [];
var chat="";
var lastJoin="";

var name="";

var x=0;
var y=0;

var speed=3;

var linkPls={
  
};
var pls=[];
var blocks=[];

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

var friends={

}

var owner="";

var health = 100;

function resetData(){
  chat="empty";
  lastJoin="";
  holdingItem="hand";
  // name="";

  inventory["hand"]=1;
  inventory["sand"]=64;
  inventory["sword"]=1;
  inventory["shovel"]=1;
  inventory["wood"]=16;
  friends={};
  
  loadhudInventory();
  
  health=100;
  
  x=round(((Math.random()*-(15*10))+(Math.random()*(15*10)))/15)*15;
  y=round(((Math.random()*-(15*10))+(Math.random()*(15*10)))/15)*15;

  linkPls={
    
  };
  pls=[];
  // blocks={};
}
