const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const api = require('./Routes');
const { verifyJWTToken } = require('./utils');

const app = express();
const httpServer = http.createServer(app);
const io = socketIo(httpServer);

const connectedUsers = new Map();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token');
  next();
});

app.use(express.json());
app.use('/api', api);


const DB_URL = process.env.DB_URL || 'mongodb://localhost/rsaChat';

io.set('authorization', (handshakeData, callback) => {
  const { token } = handshakeData;
  verifyJWTToken(token);
  callback(null, verifyJWTToken(token));
});

io.on('connection', (socket) => {
  connectedUsers.set(socket, {
    socket,
    userName: null,
  });

  socket.on('disconnect', () => {
    connectedUsers.delete(socket);
  });
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
