var chatd = [];
var chat="empty";
var lastJoin="";

var name="";

var x=0;
var y=0;

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

inventory = {
  "hand":1,
  "sand":32,
  "sword":1
};

var holdingItem="hand";

function resetData(){
  chat="empty";
  lastJoin="";
  holdingItem="hand";
  // name="";
  inventory = {
    "hand":1,
    "sand":32,
    "sword":1
  };
  
  loadhudInventory();

  
  x=round(((Math.random()*-(15*10))+(Math.random()*(15*10)))/15)*15;
  y=round(((Math.random()*-(15*10))+(Math.random()*(15*10)))/15)*15;

  linkPls={
    
  };
  pls=[];
  blocks={};
}