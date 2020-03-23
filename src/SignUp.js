const { html, $ } = require('@forgjs/noframework');
const Input = require('./components/Input');
const NavBar = require('./components/NavBar');
const api = require('./api');

const SignUp = () => {
  const usernameElement = Input({ props: { type: 'text', placeholder: 'Username' } });
  const emailElement = Input({ props: { type: 'text', placeholder: 'Email' } });
  const passwordElement = Input({ props: { type: 'password', placeholder: 'Password' } });
  const confirmPasswordElement = Input({
    props: { type: 'password', placeholder: 'Confirm password' },
  });


  const DomElement = html`
    <div class="sign-up">
      ${NavBar()}
      <h2>Sign up</h2>
      <form>
        ${usernameElement}
        ${emailElement}
        ${passwordElement}
        ${confirmPasswordElement}
        <button class="login-button">Sign up</button>
      </form>
    </div>
  `;

  $('form', DomElement).addEventListener('submit', async (e) => {
    e.preventDefault();
    if (confirmPasswordElement.value === passwordElement.value) {
      await api.signUp({
        username: usernameElement.value,
        email: emailElement.value,
        password: passwordElement.value,
      });
    }
  });

  return DomElement;
};

module.exports = SignUp;
