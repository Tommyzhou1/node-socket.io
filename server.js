const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT ||  3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

var temp;

io.on('connection', function(client){
  client.emit("welcome","hi"); //This is received by everyone
  client.on("message", function(data){
    temp = data;
    client.broadcast.emit("broadcast",data);
  });
});






