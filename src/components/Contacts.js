const {
  html, $, $$, EventManager, emptyElement,
} = require('@forgjs/noframework');
const api = require('../api');
const Input = require('./Input');
const alphabet = require('./ContactAlphabet');
const ContactListElement = require('./ContactListElement');
const FriendRequest = require('./FriendRequest');
const GlobalEvents = require('../GlobalEvents');


const Contacts = () => {
  const eventManager = new EventManager();

  const searchInput = Input({
    props: { placeholder: 'search...' },
    icon: 'search',
    onInput: (e) => {
      eventManager.emit('search', e);
    },
  });

  const DomElement = html`
  <div class="contacts">
  <h2>Contacts</h2>
    ${searchInput}
    <div class="friend-requests"></div>
    <div class="contact-list">
      <div class="list">      
      </div>
      <div class="alphabet">${alphabet()}</div>
    </div>
  </div>
  `;
  const contactListElem = $('.list', DomElement);
  const friendRequestsElem = $('.friend-requests', DomElement);
  let timeOut = null;
  let friendsList = [];

  function isElementInViewport(el, parent) {
    const rect = el.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();

    return (
      rect.top - parentRect.top >= 0
    );
  }

  eventManager.subscribe('search', async () => {
    if (timeOut) {
      clearTimeout(timeOut);
    }
    timeOut = setTimeout(async () => {
      if (searchInput.value === '') {
        GlobalEvents.emit('got-friends', friendsList);
      }
      const req = await api.searchUsers({
        q: searchInput.value,
      });
      if (!req.error) {
        emptyElement(contactListElem);
        req.users.forEach((user) => {
          contactListElem.appendChild(ContactListElement(user, eventManager));
        });
      }
    }, 500);
  });

  eventManager.subscribe('send-event-request', async (id) => {
    await api.sendFriendRequest({
      to: id,
    });
  });

  eventManager.subscribe('accept-friend-request', async (_id) => {
    const res = await api.acceptFriendRequest(_id);
    if (!res.error) {
      eventManager.emit('remove-friend-request', _id);
    }
  });

  contactListElem.addEventListener('scroll', () => {
    const sc = $$('.list > div').filter((el) => isElementInViewport(el, contactListElem))[0];
    const firstLetter = sc.innerText[0].toLowerCase();
    $('.current', DomElement).classList.remove('current');
    $(`.letter-${firstLetter}`, DomElement).classList.add('current');
  });

  GlobalEvents.subscribe('got-friends', (friends) => {
    friendsList = friends;
    emptyElement(contactListElem);
    friends.forEach((friend) => {
      contactListElem.appendChild(ContactListElement({
        ...friend,
        type: 'friend',
      }));
    });
  });

  GlobalEvents.subscribe('got-friend-requests', (friendRequests) => {
    friendRequests.forEach((request) => {
      friendRequestsElem.appendChild(FriendRequest(request, eventManager, api.data));
    });
  });

  return DomElement;
};

module.exports = Contacts;
