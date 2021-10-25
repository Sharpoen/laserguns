var socket; 
var usernameInput
var chatIDInput;
var chatInput;
var messageIn;
var chatRoom="none";
var dingSound;
var messages = [];
var delay = true;
var room_temp;

function onload(){
  socket = io();
  usernameInput = document.getElementById("NameInput");
  chatIDInput = document.getElementById("IDInput");
  chatIn = document.getElementById("chatIn");
  messageInput = document.getElementById("ComposedMessage");

  socket.on("join", function(data){
    chatRoom = data.room;
    gameworld=new worldV1();
      console.log(data["initChunks"]);
      for(let i in data["initChunks"]){
        console.log(i.split(','));
        gameworld.placeblock(data["initChunks"][i],i.split(','));
      }console.log(gameworld.getChunk("0:0"));    
  });

  socket.on("recieve", function(message){
      if(!(message[0] in linkPls)){
        linkPls[message[0]]=pls.length;
        pls[linkPls[message[0]]]=message[1];
      }else{
        pls[linkPls[message[0]]]=message[1];
      }

      lastJoin=message[1];

    });
  socket.on("crecieve", function(data){

      // console.log(data);
      owner = data["owner"];
    });

  socket.on("block",function(data){
    console.log("aaaa")
    gameworld.placeblock(data.newblock,data.blockat);
    console.log("blockData:"+data);
  });

  socket.on("interact",function(data){
    if(data["attack"]!=undefined && data["damage"]!=undefined){
      if(data["attack"].includes(name)){
        updateHealth(data["damage"]);
      }
    }
  });

  socket.on("playerChat",function(data){
    chat+="[ "+data.name+" ] ~ "+data.chat+"<br>";
    document.getElementById("chatDiv").innerHTML=chat;
    document.getElementById("endOfChat").scrollIntoView();
  });


}


function Connect(){
  socket.emit("joingame", chatIDInput.value, usernameInput.value);
  name=usernameInput.value;
  resetData();
}
function SubmitChat(){
  socket.emit("playerChat", {chat:chatIn.value,name:name});
  chatIn.value="";
}

function Send(){
  socket.emit("send", {x:x,y:y,name:name});
}

function tellServerBlock(newblock,blockat){
  console.log("sending block data:"+newblock);
  socket.emit("block", {
    newblock:newblock,
    blockat:blockat
  });
}

function delayReset(){
  delay = true;
}