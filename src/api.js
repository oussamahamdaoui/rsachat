
/* eslint-disable class-methods-use-this */

const GlobalEvents = require('./GlobalEvents');
const Alert = require('./components/Alert');
const { parseJwt, post } = require('./utils');
const {
  wrapRSAKey,
  wrapSignKey,
  unwrapRSAKey,
  unwrapSignKey,
} = require('./crypto');

class Api {
  constructor() {
    this.token = sessionStorage.getItem('token') || null;
    this.apiUrl = '/api';
    this.rsaKeys = null;
    this.signKeys = null;
    this.socket = null;
  }


  static async post(...params) {
    const res = await post(`${window.location.protocol}${window.location.host.replace('5500', '3000')}/api/`)(...params);
    if (res.error) {
      Alert({
        message: res.message || 'Unexpected error occurred',
        timeout: 5000,
        yes: 'Ok',
      });
    }
    return res;
  }


  async signUp({
    username,
    email,
    password,
    code,
  }) {
    await Api.post('sign-up', {
      username,
      email,
      password,
      code,
      privateRSAKey: await wrapRSAKey(this.rsaKeys.privateKey, password),
      publicRSAKey: this.rsaKeys.publicKey,
      privateSignKey: await wrapSignKey(this.signKeys.privateKey, password),
      publicSignKey: this.signKeys.publicKey,
    });
  }

  async logIn({
    login,
    password,
  }) {
    const res = await Api.post('login', {
      login,
      password,
    });
    if (res.error) {
      return;
    }
    this.token = res.token;
    this.data = parseJwt(this.token);
    this.rsaKeys = {
      publicKey: res.publicRSAKey,
      privateKey: await unwrapRSAKey(res.privateRSAKey, password),
    };
    this.signKeys = {
      publicKey: res.publicSignKey,
      privateSignKey: await unwrapSignKey(res.privateSignKey, password),
    };
    sessionStorage.setItem('token', this.token);
    sessionStorage.setItem('rsaKeys', JSON.stringify(this.rsaKeys));
    sessionStorage.setItem('signKeys', JSON.stringify(this.signKeys));
    GlobalEvents.emit('reroute', '/');
    this.getFriendRequests();
    this.getFriends();
  }

  async requestEmailCode({ email }) {
    const res = await Api.post('request-email-validation-code', {
      email,
    });

    return res;
  }

  setRsaKeys(rsaKeys) {
    this.rsaKeys = rsaKeys;
  }

  setSignKeys(signKeys) {
    this.signKeys = signKeys;
  }


  async searchUsers({ q }) {
    return Api.post('search-users', {
      q,
    }, this.token);
  }

  async sendFriendRequest({ to }) {
    return Api.post('send-friend-request', {
      to,
    }, this.token);
  }


  async getFriendRequests() {
    const friendRequests = await Api.post('get-friend-requests', {}, this.token);
    GlobalEvents.emit('got-friend-requests', friendRequests.friendRequests);
  }

  async acceptFriendRequest(requestId) {
    const res = await Api.post('accept-friend-request', {
      _id: requestId,
    }, this.token);
    this.getFriends();
    return res;
  }

  async getFriends() {
    const friends = await Api.post('get-friends', {}, this.token);
    if (!friends.error) {
      GlobalEvents.emit('got-friends', friends.friends);
    }
  }


  init() {
    if (this.token) {
      this.data = parseJwt(this.token);
      this.rsaKeys = JSON.parse(sessionStorage.getItem('rsaKeys'));
      this.signKeys = JSON.parse(sessionStorage.getItem('signKeys'));
      GlobalEvents.emit('reroute', '/');
      this.getFriendRequests();
      this.getFriends();
    } else {
      GlobalEvents.emit('reroute', '/log-in');
    }
  }
}

module.exports = new Api();
