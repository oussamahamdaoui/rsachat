const { html, $ } = require('@forgjs/noframework');
const Input = require('./components/Input');
const NavBar = require('./components/NavBar');
const GlobalEvents = require('./GlobalEvents');
const api = require('./api');

const LogIn = () => {
  const logInElement = Input({ props: { type: 'text', placeholder: 'Email or username' } });
  const passwordElement = Input({ props: { type: 'password', placeholder: 'Password' } });
  const DomElement = html`
    <div class="log-in">
      ${NavBar()}
      <h2>Log in</h2>
      <form>
        ${logInElement}
        ${passwordElement}
        <button class="login-button button">Login</button>
        <div> Don't have an account? <button class="to-sign-up">sign up</button></div>
      </form>
    </div>
  `;

  $('form', DomElement).addEventListener('submit', async (e) => {
    e.preventDefault();
    await api.logIn({
      login: logInElement.value,
      password: passwordElement.value,
    });
  });

  $('.to-sign-up', DomElement).addEventListener('click', (e) => {
    e.preventDefault();
    GlobalEvents.emit('reroute', '/sign-up');
  });

  return DomElement;
};

module.exports = LogIn;
