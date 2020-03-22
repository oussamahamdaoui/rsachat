class Api {
  constructor() {
    this.token = localStorage.getItem('token') || null;
  }

  init() {

  }
}

module.exports = new Api();
