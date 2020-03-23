const {
  SUCCESS, ERROR, comparePassword, createJWToken,
} = require('../utils');
const User = require('../Models/User');

module.exports = async (req, res) => {
  try {
    const {
      login,
      password,
    } = req.body;

    const user = await User.findOne({
      $or: [
        {
          email: login,
        },
        {
          username: login,
        },
      ],
    });
    if (user && await comparePassword(password, user.password)) {
      return req.json({
        token: createJWToken({
          ...SUCCESS,
          username: user.username,
        }),
      });
    }
    return res.json({
      ...ERROR,
      message: 'User not found',
    });
  } catch (e) {
    console.log(e); // eslint-disable-line
    return res.status(500).json({
      ...ERROR,
      message: 'Some error occurred',
    });
  }
};
