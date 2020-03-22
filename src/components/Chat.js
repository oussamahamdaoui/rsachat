const { html } = require('@forgjs/noframework');
const Input = require('./Input');
const Icon = require('./Icon');

const Chat = () => {
  const DomElement = html`<div class="chat">
    <div class="head">John Doe</div>
    <div class="messages">
      <div class="message me first">
        Hello!
      </div>
      <div class="message me">
        whats up
      </div>
      <div class="message me last">
        I have stuff to do
      </div>
      <div class="message first">
        Hey
      </div>
      <div class="message last">
        Oh, tell me
      </div>
    </div>

    <div class="input-message">
      ${Input({ props: { type: 'text', placeholder: 'Message' } })}
      <button class="send-button">${Icon('send')}</button>
    </div>
  
  </div>`;

  return DomElement;
};

module.exports = Chat;
