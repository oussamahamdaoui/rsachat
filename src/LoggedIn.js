const { html } = require('@forgjs/noframework');
const SideBar = require('./components/SideBar');
const Chat = require('./components/Chat');

const LoggedIn = () => {
  const DomElement = html`
    <div style="display:contents">
    ${SideBar()}
    ${Chat()}
    </div>
  `;

  return DomElement;
};

module.exports = LoggedIn;
