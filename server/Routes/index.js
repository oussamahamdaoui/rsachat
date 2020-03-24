const { Router } = require('express');
const SignUp = require('./signUp');
const emailValidationRequest = require('./emailValidationRequest');

const api = Router();

api.post('/sign-up', SignUp);
api.post('/request-email-validation-code', emailValidationRequest);


module.exports = api;
