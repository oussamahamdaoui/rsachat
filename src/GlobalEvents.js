const { EventManager } = require('@forgjs/noframework');

window.addEventListener('popstate', () => {
  EventManager.emit('reroute', document.location.pathname);
});

module.exports = new EventManager();
