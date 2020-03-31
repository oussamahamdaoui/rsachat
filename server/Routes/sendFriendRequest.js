const { SUCCESS, ERROR } = require('../utils');
const FriendRequest = require('../Models/FriendRequest');

module.exports = async (req, res) => {
  try {
    const {
      to,
    } = req.body;
    const userId = req.user._id; // eslint-disable-line
    console.log(req.user._id);

    const friendRequest = await FriendRequest.find({
      $or: [
        {
          sender: userId,
          receiver: to,
        }, {
          sender: to,
          receiver: userId,
        },
      ],
    });

    if (friendRequest.length !== 0) {
      return res.json({
        ...ERROR,
        message: 'There is already a friend request made',
      });
    }

    await new FriendRequest({
      sender: userId,
      receiver: to,
    }).save();

    return res.json({
      ...SUCCESS,
    });
  } catch (e) {
    console.log(e); // eslint-disable-line
    return res.json({
      ...ERROR,
      message: '',
    });
  }
};
