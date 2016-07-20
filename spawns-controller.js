'use strict';

const Controller      = require('controller');
const SpawnController = require('spawn-controller');

class SpawnsController extends Controller {
  constructor(room, memory) {
    super(memory);

    this.spawns = {};
    room
      .find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_SPAWN}})
      .forEach((spawn) =>
        this.spawns[spawn.name] = new SpawnController(spawn, this.memory[spawn.name])
      )
    ;
  }

  acceptSpawnCreepTask() { return true; }

  runSpawnCreepTask(task) {
    // todo
    return false;
  }

  toJSON() {
    return _.assign(super.toJSON(), this.spawns);
  }
}

module.exports = SpawnsController;
