const { SUCCESS, ERROR } = require('../utils');
const EmailValidationRequestCode = require('../Models/EmailValidationRequestCode');
const emailServer = require('../emailServer');

module.exports = async (req, res) => {
  try {
    const {
      email,
    } = req.body;

    const code = Math.random().toString().substring(2, 9);

    await new EmailValidationRequestCode({
      email,
      code,
    }).save();

    emailServer({
      from: 'me',
      text: `here is your validation code ${code}`,
    });


    return res.json({
      ...SUCCESS,
    });
  } catch (e) {
    console.log(e) // eslint-disable-line
    return res.json({
      ...ERROR,
      message: 'Something bad happened',
    });
  }
};
