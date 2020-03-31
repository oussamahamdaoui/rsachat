const { html } = require('@forgjs/noframework');
const { genCharArray } = require('../utils');

const ContactAlphabet = () => {
  const alphabet = genCharArray('a', 'z').map((char) => html`<span class="letter-${char}">${char}</span>`);
  alphabet[0].classList.add('current');
  return alphabet;
};

module.exports = ContactAlphabet;
