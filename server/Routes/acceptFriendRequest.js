
const { SUCCESS, ERROR } = require('../utils');
const FriendRequest = require('../Models/FriendRequest');
const User = require('../Models/User');

module.exports = async (req, res) => {
  try {
    const { _id } = req.body;
    const friendRequest = await FriendRequest.findOne({
      _id,
      receiver: req.user._id,
      accepted: false,
    });

    if (friendRequest) {
      const user = await User.findOne({
        _id: friendRequest.sender,
      });
      const user2 = await User.findOne({
        _id: friendRequest.receiver,
      });
      user.friends.push(user2._id);
      user2.friends.push(user._id);

      friendRequest.accepted = true;
      await friendRequest.save();
      await user.save();
      await user2.save();
      return res.json({
        ...SUCCESS,
      });
    }
    return res.json({
      ...ERROR,
      message: 'Friend request not found',
    });
  } catch (e) {
    console.log(e); // eslint-disable-line
    return res.json({
      ...ERROR,
    });
  }
};
