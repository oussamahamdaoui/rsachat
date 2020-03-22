const { html } = require('@forgjs/noframework');
const socketIo = require('socket.io-client');
const { Component } = require('./rooter');
const globalEvents = require('./GlobalEvents');


const App = () => {
  const DomElement = html`<div class="app">
    ${Component}
  </div>`;

  const io = socketIo('http://localhost:3000');
  return DomElement;
};

document.body.appendChild(App());

globalEvents.emit('reroute', '/');
