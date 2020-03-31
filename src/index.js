const { html } = require('@forgjs/noframework');
require('babel-polyfill');
// const socketIo = require('socket.io-client');
const { Component } = require('./rooter');
const GlobalEvents = require('./GlobalEvents');
const api = require('./api');


const App = () => {
  const DomElement = html`<div class="app">
    ${Component}
  </div>`;

  return DomElement;
};

document.body.appendChild(App());

api.init();
