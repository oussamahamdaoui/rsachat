const { html } = require('@forgjs/noframework');

const TopBar = () => {
  const DomElement = html`<div class="nav-bar">
    <img src="/assets/logo.svg">
  </div>`;

  return DomElement;
};

module.exports = TopBar;
