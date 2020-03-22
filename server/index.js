const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const httpServer = http.createServer(app);
const io = socketIo(httpServer);

const DB_URL = process.env.DB_URL || 'mongodb://localhost/rsaChat';


io.on('connection', (socket) => {
  console.log('a user connected');
});

mongoose.connect(DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  }, () => {
    httpServer.listen(3000, () => {
      console.log('listening on *:3000');
    });
  });
