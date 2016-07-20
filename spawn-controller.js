'use strict';

const Controller      = require('controller');

class SpawnController extends Controller {
  constructor(spawn, memory) {
    super(memory);
    this.spawn = spawn;

  }
}

module.exports = SpawnController;
