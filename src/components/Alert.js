const { html, $ } = require('@forgjs/noframework');

const Alert = ({
  message,
  yes,
  no,
  timeout,
}) => {
  const DomElement = html`<div class="alert">
    <div class="content">
      <div class="message">${message}</div>
      <div class="buttons">
        ${yes ? html`<button class="yes button">${yes}</button>` : ''}
        ${no ? html`<button class="no button">${no}</button>` : ''}
      </div>
    </div>
  </div>`;

  document.body.appendChild(DomElement);

  return new Promise((resolve) => {
    if (yes) {
      $('.yes', DomElement).addEventListener('click', () => {
        DomElement.remove();
        resolve(true);
      });
    }
    if (no) {
      $('.no', DomElement).addEventListener('click', () => {
        DomElement.remove();
        resolve(false);
      });
    }
    if (timeout) {
      setTimeout(() => {
        DomElement.remove();
      }, timeout);
    }
  });
};

module.exports = Alert;
