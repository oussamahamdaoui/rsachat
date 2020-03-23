const { Router } = require('express');
const SignUp = require('./signUp');

const api = Router();

api.post('/sign-up', SignUp);

module.exports = api;
