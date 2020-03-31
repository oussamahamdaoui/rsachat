const { SUCCESS, ERROR } = require('../utils');
const FriendRequest = require('../Models/FriendRequest');

module.exports = async (req, res) => {
  try {
    const userId = req.user._id;

    const friendRequests = await FriendRequest.find({
      $or: [
        {
          sender: userId,
        }, {
          receiver: userId,
        },
      ],
      accepted: false,
    }).populate({ path: 'sender', select: 'username _id' })
      .populate({ path: 'receiver', select: 'username _id' });

    return res.json({
      ...SUCCESS,
      friendRequests,
    });
  } catch (e) {
    console.log(e); // eslint-disable-line
    return res.json({
      ...ERROR,
      message: '',
    });
  }
};
