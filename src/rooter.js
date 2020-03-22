const { html } = require('@forgjs/noframework');
const routerEvents = require('./GlobalEvents');
const LoggedIn = require('./LoggedIn');
const LogIn = require('./LogIn');


const ROUTES = {
  '/': LoggedIn(),
  '/log-in-sign-up': LogIn(),
};
routerEvents.current = html`<div></div>`;

routerEvents.subscribe('reroute', (url, ...params) => {
  const rUrl = ROUTES[url] ? url : '/404';
  if (routerEvents.current !== ROUTES[rUrl]) {
    routerEvents.current.replaceWith(ROUTES[rUrl]);
    routerEvents.current = ROUTES[rUrl];
    routerEvents.emit('rerouted', rUrl, ROUTES[rUrl], ...params);
  }
});

module.exports = {
  Component: routerEvents.current,
  ROUTES,
};
