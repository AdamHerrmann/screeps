'use strict';

const Controller     = require('controller');
const RoomController = require('room-controller');

class LoopController extends Controller {
  constructor(memory) {
    super(memory);
    _.each(Game.rooms, (room) => this.addController(new RoomController(room)));
  }
}

const loopController = new LoopController(Memory.mainLoop || (Memory.mainLoop = {}));
module.exports = loopController;
