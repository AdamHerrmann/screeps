'use strict';

module.exports = function harvester (creep) {
  if(creep.carry.energy < creep.carryCapacity) {
    var sources = creep.room.find(FIND_SOURCES);
    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
    }
  }
  else {
    var targets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
          structure.energy < structure.energyCapacity;
      }
    });
    if(targets.length > 0) {
      const move = _.all(targets, (target) => {
        return creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE;
      });

      if(move) {
        _.any(targets, (target) => {
          return creep.moveTo(target) !== ERR_NO_PATH;
        });
      }
    }
  }
}
