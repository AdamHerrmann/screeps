'use strict';

const roles = {
  harvester: require('role.harvester'),
};

module.exports.loop = function () {
  cleanupMemory();

  const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === roles.harvester);
  if (harvesters.length < 2) {
    Game.spawns.home.createCreep([WORK,CARRY,MOVE], undefined, {role: role.harvester})
  }

  for(const creep of Game.creeps) {
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
