const { html, $ } = require('@forgjs/noframework');
const Input = require('./components/Input');
const NavBar = require('./components/NavBar');
const api = require('./api');
const c = require('./crypto');

window.c = c;

const SignUp = () => {
  const usernameElement = Input({ props: { type: 'text', placeholder: 'Username' } });
  const emailElement = Input({ props: { type: 'text', placeholder: 'Email' } });
  const passwordElement = Input({ props: { type: 'password', placeholder: 'Password' } });
  const confirmPasswordElement = Input({
    props: { type: 'password', placeholder: 'Confirm password' },
  });

  const ValidationCodeElement = Input({ props: { type: 'text', placeholder: 'Validation code' } });


  const DomElement = html`
    <div class="sign-up">
      ${NavBar()}
      <h2>Sign up</h2>
      <div class="slider">
        <div class="slider-card">
          <form class="request-code">
            ${usernameElement}
            ${emailElement}
            ${passwordElement}
            ${confirmPasswordElement}
            <button class="login-button">Sign up</button>
          </form>
        </div>
        <div class="slider-card">
          <form class="create-user">
            <h2>Enter validation code you got in your email</h2>
            ${ValidationCodeElement}
            <button class="send-code">Send</button>
          </form>
        </div>
      </div>
    </div>
  `;

  const SliderElement = $('.slider', DomElement);

  $('.request-code', DomElement).addEventListener('submit', async (e) => {
    e.preventDefault();
    api.requestEmailCode({
      email: emailElement.value,
    });

    if (confirmPasswordElement.value === passwordElement.value) {
      $('.slider-card', SliderElement).style.marginLeft = 'calc(-100% - 8px)';
    }
  });

  $('.create-user', DomElement).addEventListener('submit', async (e) => {
    const code = ValidationCodeElement.value;
    const email = emailElement.value;
    const username = usernameElement.value;
    const password = passwordElement.value;
  });
  return DomElement;
};

module.exports = SignUp;
