const { Schema, model } = require('mongoose');

const EmailValidationRequestCodeSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
  },
  createdAt: { type: Date, expires: 60 * 60, default: Date.now }, // 1 hour
});

const EmailValidationRequestCode = model('EmailValidationRequestCode', EmailValidationRequestCodeSchema);

module.exports = EmailValidationRequestCode;
