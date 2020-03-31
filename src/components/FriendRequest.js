const { html, $ } = require('@forgjs/noframework');

const FriendRequest = ({ sender, receiver, _id }, eventManger, currentUser) => {
  let DomElement = null;
  if (sender._id === currentUser.data._id) {
    // pending request
    DomElement = html`<div class="pending">
      <div class="user-image"></div>
      <div class="status">Pending friend request to ${receiver.username}</div>
    </div>`;
  } else {
    // got a request
    DomElement = html`<div class="got-request">
      <div class="user-image"></div>
      <div class="status">${sender.username} send a friend request</div>
      <div class="buttons">
        <button class="accept">Accept request</button> 
        <button class="reject">Reject request</button> 
      </div>
    </div>`;

    $('.accept', DomElement).addEventListener('click', () => {
      eventManger.emit('accept-friend-request', _id);
    });
  }

  eventManger.subscribe('remove-friend-request', (requestId) => {
    if (_id === requestId) {
      DomElement.remove();
    }
  });


  return DomElement;
};

module.exports = FriendRequest;
