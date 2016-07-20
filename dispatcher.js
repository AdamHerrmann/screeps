'use strict';

class Dispatcher {
  constructor() {
    this.listeners = {};
  }

  dispatch(action, data) {
    return _.any(this.listeners[action], (listener) => listener(action, data));
  }

  listen(action, listener) {
    (this.listeners[action] || (this.listeners[action] = [])).push(listener);
  }
}

module.exports = new Dispatcher();

