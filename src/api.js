
/* eslint-disable class-methods-use-this */

const GlobalEvents = require('./GlobalEvents');
const Alert = require('./components/Alert');
const { parseJwt, post } = require('./utils');

class Api {
  constructor() {
    this.token = localStorage.getItem('token') || null;
    this.apiUrl = '/api';
  }

  static async post(...params) {
    const res = await post(`${window.location.protocol}${window.location.host.replace('5500', '3000')}/api/`)(...params);
    if (res.error) {
      Alert({
        message: res.error,
        timeout: 5000,
      });
    }
    return res;
  }


  async signUp({
    username,
    email,
    password,
  }) {
    Api.post('sign-up', {
      username,
      email,
      password,
    });
  }

  init() {
    if (this.token) {
      this.data = parseJwt(this.token);
    } else {
      GlobalEvents.emit('reroute', '/log-in');
    }
  }
}

module.exports = new Api();
