const { html } = require('@forgjs/noframework');
const { OpenPeeps } = require('./components/openPeeps');

const OpenPeepsComponent = () => {
  const DomElement = html`<div>
    ${OpenPeeps({})}
  </div>`;
  return DomElement;
};

module.exports = OpenPeepsComponent;
