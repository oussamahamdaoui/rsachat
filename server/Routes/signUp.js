const { SUCCESS, ERROR, hashPassword } = require('../utils');
const User = require('../Models/User');

module.exports = async (req, res) => {
  try {
    const {
      email,
      username,
      password,
    } = req.body;

    const user = await User.findOne({
      $or: [{
        email,
      }, {
        username,
      }],
    });

    if (user) {
      if (user.email === email) {
        return res.json({
          ...ERROR,
          message: 'This email is already used, please connect or use another email',
        });
      }

      return res.json({
        ...ERROR,
        message: 'This username is already used, please choose another username',
      });
    }
    await new User({
      email,
      username,
      password: await hashPassword(password),
    }).save();

    return res.json({
      ...SUCCESS,
    });
  } catch (e) {
    console.log(e); //eslint-disable-line
    return res.json({
      ...ERROR,
    });
  }
};
