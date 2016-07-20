// 'use strict';

// const HARV_PER_SOURCE = 2;
// const roles = {
//   harvester: require('role.harvester'),
//   upgrader:  require('role.upgrader'),
// };
// const toRun           = [];

// _.each(Game.rooms, (room) => {
//   const perSource = room.memory.harvesters || (room.memory.harvesters = {});
//   const spawn     = _.first(room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_SPAWN}}));

//   _.each(room.find(FIND_SOURCES), (source) => {

//     toRun.push(() => {
//       const harvesters = perSource[source.id] = _.filter(perSource[source.id], (name) => {
//         if (Memory.creeps[name] && !Game.creeps[name]) {
//           console.log(`Deleting creep ${name}`);
//           delete Memory.creeps[name];
//           return true;
//         }
//       });

//       if (harvesters.length < HARV_PER_SOURCE &&
//           !spawn.spawning &&
//           OK === spawn.canCreateCreep([WORK, MOVE, CARRY])) {
//         const name = spawn.createCreep([WORK, MOVE, CARRY], {
//           type:   'harvester',
//           source: source.id,
//           spawn:  spawn.id,
//         });

//         console.log(`Created harvester ${name}: ${source.id} --> ${spawn.id}`);
//         harvesters.push(name);
//       }
//     });

//     toRun.push(() => {
//       _.each(Game.creeps, (creep) => {

//       });
//     })
//   });
// });

// module.exports.loop = function () {
//   cleanupMemory();
//   _.each(toRun, (run) => run());
// }

// function cleanupMemory () {
//   _.chain(Memory.creeps)
//     .reject((creep) => Game.creeps[creep.name])
//     .each((creep) => delete Memory.creeps[creep.name])
//     .value()
//   ;
// }
