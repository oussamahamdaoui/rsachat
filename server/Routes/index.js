const { Router } = require('express');
const { verifyJWTMiddleware } = require('../utils');
const SignUp = require('./signUp');
const EmailValidationRequest = require('./emailValidationRequest');
const Login = require('./login');
const SearchUsers = require('./searchUsers');
const sendFriendRequest = require('./sendFriendRequest');
const getFriendRequests = require('./getFriendRequests');
const acceptFriendRequest = require('./acceptFriendRequest');
const getFriends = require('./getFriends');


const api = Router();

api.post('/sign-up', SignUp);
api.post('/request-email-validation-code', EmailValidationRequest);
api.post('/login', Login);

// connected


api.post('/search-users', verifyJWTMiddleware, SearchUsers);
api.post('/send-friend-request', verifyJWTMiddleware, sendFriendRequest);
api.post('/get-friend-requests', verifyJWTMiddleware, getFriendRequests);
api.post('/accept-friend-request', verifyJWTMiddleware, acceptFriendRequest);
api.post('/get-friends', verifyJWTMiddleware, getFriends);


module.exports = api;
