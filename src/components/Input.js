const { html, $ } = require('@forgjs/noframework');
const Icon = require('./Icon');

const Input = ({
  props: {
    type = 'text',
    placeholder = '',
  },
  icon,
  onInput = () => { },
}) => {
  const DomElement = html`<div class="input">
    ${icon ? Icon(icon) : ''}
    <input type=${type} placeholder="${placeholder}">
  
  </div>`;
  const inputEl = $('input', DomElement);

  inputEl.addEventListener('input', (e) => {
    onInput(e, inputEl.value);
    DomElement.value = inputEl.value;
  });

  return DomElement;
};

module.exports = Input;
