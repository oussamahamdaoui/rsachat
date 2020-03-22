const { html, $, $$ } = require('@forgjs/noframework');
const { genCharArray } = require('../utlis');
const Input = require('./Input');

const Contacts = () => {
  const alphabet = genCharArray('a', 'z').map((char) => html`<span class="letter-${char}">${char}</span>`);
  alphabet[0].classList.add('current');
  const contactNames = ['Annmarie', 'Kassia', 'Cathryn', 'Marie-Jeanne', 'Lurlene', 'Genvieve', 'Tomi', 'Marketa', 'Elberta', 'Hilda', 'Wilone', 'Clarisse', 'Bernadina', 'Berni', 'Shandra', 'Adore', 'Elise', 'Koralle', 'Colette', 'Jocelyne', 'Verile', 'Libbie', 'Demeter', 'Auroora', 'Catarina', 'Tamarra', 'Neilla', 'Maren', 'Devinne', 'Marilyn'];

  const DomElement = html`
  <div class="contacts">
  <h2>Contacts</h2>
    ${Input({ props: { placeholder: 'search...' }, icon: 'search' })}

    <div class="contact-list">
      <div class="list">
        ${contactNames.sort().map((name) => html`<div>${name}</div>`)}      
      </div>
      <div class="alphabet">${alphabet}</div>
    </div>
  </div>
  `;
  const contactListElem = $('.list', DomElement);

  function isElementInViewport(el, parent) {
    const rect = el.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();

    return (
      rect.top - parentRect.top >= 0
    );
  }

  contactListElem.addEventListener('scroll', () => {
    const sc = $$('.list > div').filter((el) => isElementInViewport(el, contactListElem))[0];
    const firstLetter = sc.innerText[0].toLowerCase();
    $('.current', DomElement).classList.remove('current');
    $(`.letter-${firstLetter}`, DomElement).classList.add('current');
  });

  return DomElement;
};

module.exports = Contacts;
