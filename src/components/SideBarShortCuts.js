const { html, $ } = require('@forgjs/noframework');
const Icon = require('./Icon');

const SideBarShortCuts = (eventManager) => {
  const DomElement = html`<div class="shortcuts">
    <div class="me user" style="background-image:url(https://randomuser.me/api/portraits/men/71.jpg)"></div>
    <div class="last-users">
      <div class="user badge" style="background-image:url(https://randomuser.me/api/portraits/men/72.jpg)"></div>
      <div class="user" style="background-image:url(https://randomuser.me/api/portraits/women/22.jpg)"></div>
      <div class="user" style="background-image:url(https://randomuser.me/api/portraits/women/88.jpg)"></div>
    </div>

    <div class="show-all-contacts">
      <div class="closed">${Icon('users')}</div>
      <div class="opened">${Icon('chevron-left')}</div>
    </div>
  </div>`;


  $('.show-all-contacts', DomElement).addEventListener('click', () => {
    eventManager.emit('toggle-open');
  });

  return DomElement;
};

module.exports = SideBarShortCuts;
