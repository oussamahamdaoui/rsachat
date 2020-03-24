const { SUCCESS, ERROR, hashPassword } = require('../utils');
const User = require('../Models/User');
const EmailValidationRequestCode = require('../Models/EmailValidationRequestCode');

module.exports = async (req, res) => {
  try {
    const {
      email,
      username,
      password,
      code,
    } = req.body;


    const user = await User.findOne({
      $or: [{
        email,
      }, {
        username,
      }],
    });

    const emailValidationRequest = await EmailValidationRequestCode.findOne({
      email,
      code,
    });

    if (!emailValidationRequest) {
      return res.json({
        ...ERROR,
        message: 'please enter a valid email',
      });
    }

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
