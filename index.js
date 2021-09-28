const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const path = require("path");

const app = express();
const httpserver = http.Server(app);
const io = socketio(httpserver);

const gamedirectory = path.join(__dirname, "html");

app.use(express.static(gamedirectory));

httpserver.listen(3000);

var rooms = [];
var usernames = [];

var roomData={};

function roomDataPreset(){
  this.data={
    "blocks":{

    },
    "chunks":{
      "0:0":{

      },
      "1:0":{

      },
      "1:1":{

      },
      "0:1":{

      },
      "-1:1":{

      },
      "-1:0":{

      },
      "-1:-1":{

      },
      "0:-1":{
        
      },
      "1:-1":{

      },
    }
  }
  return this.data;
}


io.on('connection', function(socket){

  socket.on("joingame", function(room, username){
    if (username != ""){
      rooms[socket.id] = room;
      usernames[socket.id] = username;

      socket.leaveAll();
      socket.join(room);

      if(!(room in roomData)){
        roomData[room]=roomDataPreset();
      }

      io.in(room).emit("crecieve", {
        text:"Server : " + username + " has entered the chat.",
        blocks:roomData[room]["blocks"]
      });
      socket.emit("join", room);
    }
  })

  socket.on("send", function(message){
    io.in(rooms[socket.id]).emit("recieve", [usernames[socket.id],message]);
    // console.log(rooms[socket.id]);
    // console.log("Recieved. "+message.x);
  });

  socket.on("block",function(block){
    io.in(rooms[socket.id]).emit("block",block);
      if(!(rooms[socket.id] in roomData)){
        roomData[rooms[socket.id]]=roomDataPreset();
      }
    roomData[rooms[socket.id]]["blocks"][block.id]=block;
  });

  socket.on("recieve", function(message){
    socket.emit("recieve", message);
  })
})
