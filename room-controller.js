'use strict';

const Task              = require('task');
const Controller        = require('controller');
const SourcesController = require('sources-controller');
const SpawnsController  = require('spawns-controller');

class RoomController extends Controller {
  constructor(room) {
    super(room.memory);
    this.room = room;

    this.spawns  = this.addController(new SpawnsController(room, this.memory.spawns || {}));
    this.sources = this.addController(new SourcesController(room, this.memory.sources || {}));

    console.log('Room Memory:', JSON.stringify(this.memory, null, 2));


    // _.each(room.find(FIND_STRUCTURES), this.addStructureController, this);
    // _.each(room.find(FIND_SOURCES), this.addSourceController, this);
  }

  toJSON() {
    return _.assign(super.toJSON(), _.pick(this, 'spawns', 'sources'));
  }
}

module.exports = RoomController;
