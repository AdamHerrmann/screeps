'use strict';

const roles = {
  harvester: require('role.harvester'),
};

module.exports.loop = function () {
  cleanupMemory();

  for(const name in Game.creeps) {
    const creep = Game.creeps[name];

    if(!creep.memory.role) {
      creep.memory.role = roles.harvester;
    }

    creep.memory.role(creep);
  }
}

function cleanupMemory () {
  _.chain(Memory.creeps)
    .reject((creep) => Game.creeps[creep.name])
    .each((creep) => delete Memory.creeps[creep.name])
    .value()
  ;
}
