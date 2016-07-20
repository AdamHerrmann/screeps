'use strict';

class Task {
  constructor(data) {
    _.assign(this, data);

    Memory.nextTaskId = Memory.nextTaskId || 0;

    this.id   = this.id   || `task-${++Memory.nextTaskId}`;
    this.type = this.type || '';

    this.acceptTask     = _.camelCase(`accept ${this.type} task`);
    this.runTask        = _.camelCase(`run ${this.type} task`);
    this.onTaskComplete = _.camelCase(`on ${this.type} task complete`);
  }
}

module.exports = Task;
