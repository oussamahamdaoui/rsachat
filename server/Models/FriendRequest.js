const { Schema, model, Types } = require('mongoose');

const FriendRequestSchema = new Schema({
  sender: {
    type: Types.ObjectId,
    ref: 'User',
  },
  receiver: {
    type: Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
});

FriendRequestSchema.statics.getFriends = function getFriends(objectId) {
  return this.find({
    $or: [{
      seder: objectId,
    }, {
      receiver: objectId,
    }],
    accepted: true,
  });
};

const FriendRequest = model('FriendRequest', FriendRequestSchema);

module.exports = FriendRequest;
