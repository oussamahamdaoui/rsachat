const { html, $ } = require('@forgjs/noframework');
const Input = require('./components/Input');
const NavBar = require('./components/NavBar');
const GlobalEvents = require('./GlobalEvents');

const LogIn = () => {
  const DomElement = html`
    <div class="log-in">
      ${NavBar()}
      <h2>Log in</h2>
      <form>
        ${Input({ props: { type: 'text', placeholder: 'Email or username' } })}
        ${Input({ props: { type: 'password', placeholder: 'Password' } })}
        <button class="login-button">Login</button>
        <div> Don't have an account? <button class="to-sign-up">sign up</button></div>
      </form>
    </div>
  `;

  $('form', DomElement).addEventListener('submit', (e) => {
    e.preventDefault();
  });

  $('.to-sign-up', DomElement).addEventListener('click', () => {
    GlobalEvents.emit('reroute', '/sign-up');
  });

  return DomElement;
};

module.exports = LogIn;
