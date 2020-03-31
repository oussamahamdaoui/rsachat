const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    match: /^[a-z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-z0-9]){1,18}[a-z0-9]$/,
    required: true,
  },

  userImage: {
    type: String,
  },

  password: {
    type: String,
    required: true,
  },

  privateRSAKey: {
    type: Object,
    required: true,
  },

  publicRSAKey: {
    type: Object,
    required: true,
  },

  privateSignKey: {
    type: Object,
    required: true,
  },

  publicSignKey: {
    type: Object,
    required: true,
  },

  friends: [{
    type: Types.ObjectId,
    ref: 'User',
  }],

  email: {
    type: String,
    match: /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/,
  },
});

const User = model('User', UserSchema);

module.exports = User;
