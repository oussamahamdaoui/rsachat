const { html } = require('@forgjs/noframework');
const feather = require('feather-icons');

const Icon = (name) => {
  const DomElement = html`${feather.icons[name].toSvg()}`;

  return DomElement;
};

module.exports = Icon;
