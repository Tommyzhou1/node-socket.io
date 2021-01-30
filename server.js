'use strict';

const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT ||  3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.emit('hi', "hi man");

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

io.on('send_message', (data) => {
  setInterval(() => io.emit('time', data, 1000));
});

