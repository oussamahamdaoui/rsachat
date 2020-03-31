const { html, $ } = require('@forgjs/noframework');
const Icon = require('./Icon');

const ContactListElement = ({
  type = 'search',
  username,
  _id,
}, eventManager) => {
  let DomElement = null;

  if (type === 'search') {
    DomElement = html`<div>
    <div class="username">${username}</div>
      <div class="actions">
        <div class="add">${Icon('plus')}</div>
      </div>
    </div>`;

    $('.add', DomElement).addEventListener('click', () => {
      eventManager.emit('send-event-request', _id);
    });
  } else {
    DomElement = html`<div>
    <div class="username">${username}</div>
      <div class="actions">
        <div class="remove">${Icon('trash')}</div>
      </div>
    </div>`;
  }


  return DomElement;
};

module.exports = ContactListElement;
