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

const world=require('./world_class.js').world;

var rooms = [];
var usernames = [];

var roomData = {};

function roomDataPreset(owner) {
  this.data = {
    "owner": owner,
    "blocks": {},
    "chunks": {},
    "initChunks":{}
  }
  return this.data;
}


io.on('connection', function(socket) {

  socket.on("joingame", function(room, username) {
    if (username != "" && username.length<15) {
      rooms[socket.id] = room;
      usernames[socket.id] = username;

      socket.leaveAll();
      socket.join(room);

      if (!(room in roomData)) {
        roomData[rooms[socket.id]] = roomDataPreset(usernames[socket.id]);
      }

      io.in(room).emit("crecieve", {
        text: "Server : " + username + " has entered the chat.",
        blocks: roomData[rooms[socket.id]]["blocks"],
        owner: roomData[rooms[socket.id]]["owner"],
        chunks: roomData[rooms[socket.id]]["chunks"],
      });
      socket.emit("join", {
        room:rooms[socket.id],
        initChunks:roomData[rooms[socket.id]]["initChunks"],
      });
    }
  })

  socket.on("send", function(message) {
    io.in(rooms[socket.id]).emit("recieve", [usernames[socket.id], message]);

  });

  socket.on("block", function(block) {
    io.in(rooms[socket.id]).emit("block", block);
    if (!(rooms[socket.id] in roomData)) {
      roomData[rooms[socket.id]] = roomDataPreset(usernames[socket.id]);
    }
    roomData[rooms[socket.id]]["initChunks"][block.blockat] = block.newblock;
  });

  socket.on("recieve", function(message) {
    socket.emit("recieve", message);
  });
  socket.on("interact", function(message) {
    io.in(rooms[socket.id]).emit("interact", message);
  });
  socket.on("playerChat", function(message) {
    io.in(rooms[socket.id]).emit("playerChat", message);
  });
});
