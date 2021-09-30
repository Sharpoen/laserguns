var socket;
var usernameInput
var chatIDInput;
var messageInput;
var chatRoom;
var dingSound;
var messages = [];
var delay = true;

function onload(){
  socket = io();
  usernameInput = document.getElementById("NameInput");
  chatIDInput = document.getElementById("IDInput");
  messageInput = document.getElementById("ComposedMessage");
  chatRoom = document.getElementById("RoomID");

  socket.on("join", function(room){
    chatRoom.innerHTML = "Gameroom : " + room;
  })

  socket.on("recieve", function(message){
    // chat+=message[0];
    // chat+=  ;
      if(!(message[0] in linkPls)){
        linkPls[message[0]]=pls.length;
        pls[linkPls[message[0]]]=message[1];
      }else{
        pls[linkPls[message[0]]]=message[1];
      }

      // chat+=message;
      lastJoin=message[1];
      // lastJoin+="0";

    });
  socket.on("crecieve", function(message){
      // chat+=message;
      // lastJoin=message[1];
      // lastJoin+="0";
      blocks = message["blocks"];
      owner = message["owner"];

    });

  socket.on("block",function(block){
    blocks[block.id]=block;
    chatd[0]=block.id;
  });
}

function Connect(){
  socket.emit("joingame", chatIDInput.value, usernameInput.value);
  name=usernameInput.value;
  resetData();
}

function Send(){
  socket.emit("send", {x:x,y:y,name:name});
}

function delayReset(){
  delay = true;
}