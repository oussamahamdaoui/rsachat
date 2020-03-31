const { Schema, model, Types } = require('mongoose');

const GroupSchema = new Schema({
  name: String,
  userIds: [{
    type: Types.ObjectId,
    ref: 'User',
  }],
});

const Group = model('Groups', GroupSchema);

module.exports = Group;
