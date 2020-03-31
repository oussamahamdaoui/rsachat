const {
  SUCCESS, ERROR, createJWToken, comparePassword,
} = require('../utils');
const User = require('../Models/User');


module.exports = async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({
      $or: [
        { email: login },
        { username: login },
      ],
    });
    if (!user) {
      return res.json({
        ...ERROR,
        message: 'User not found',
      });
    }
    if (await comparePassword(password, user.password)) {
      return res.json({
        ...SUCCESS,
        token: createJWToken({
          sessionData: {
            username: user.username,
            email: user.email,
            _id: user._id,// eslint-disable-line
          },
        }),
        publicRSAKey: user.publicRSAKey,
        privateRSAKey: user.privateRSAKey,
        publicSignKey: user.publicSignKey,
        privateSignKey: user.privateSignKey,
      });
    }
    return res.json({
      ...ERROR,
      message: 'Please verify password',
    });
  } catch (e) {
    return res.json({
      ...ERROR,
    });
  }
};
