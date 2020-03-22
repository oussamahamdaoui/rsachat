const { html, EventManager } = require('@forgjs/noframework');
const Contacts = require('./Contacts');
const SideBarShortCuts = require('./SideBarShortCuts');

const SideBar = () => {
  const eventManager = new EventManager();


  const DomElement = html`<div class="side-bar">
    ${Contacts()}
    ${SideBarShortCuts(eventManager)}
  </div>`;

  eventManager.subscribe('toggle-open', () => {
    DomElement.classList.toggle('open');
  });

  return DomElement;
};

module.exports = SideBar;
