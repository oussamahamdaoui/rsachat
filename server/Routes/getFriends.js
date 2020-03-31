const { SUCCESS, ERROR } = require('../utils');
const User = require('../Models/User');

module.exports = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findOne({
      _id: userId,
    }).populate('friends', '-password -privateRSAKey -privateSignKey -friends -email');

    return res.json({
      ...SUCCESS,
      friends: user.friends,
    });
  } catch (e) {
    console.log(e); // eslint-disable-line
    return res.json({
      ...ERROR,
      message: '',
    });
  }
};
