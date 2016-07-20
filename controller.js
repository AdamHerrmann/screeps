'use strict';

const Task = require('task');

class Controller {
  constructor(memory) {
    this.memory      = memory;
    this.controllers = new Set();
    this.dispatcher  = require('dispatcher');
    this.localTasks  = _.map(this.memory.localTasks, (data) => new Task(data));
    this.remoteTasks = _.transform(this.memory.remoteTasks,
                                   (tasks, data, id) => tasks[id] = new Task(data), {});

    this.dispatcher.listen('TASK_REQUEST',  (type, task) => this.onTaskRequest(task));
    this.dispatcher.listen('TASK_COMPLETE', (type, task) => this.onTaskComplete(task));
  }

  onTaskRequest(task) {
    if (this[task.acceptTask] && this[task.acceptTask](task)) {
      this.localTasks.push(task);
      return true;
    }
  }

  onTaskComplete(task) {
    if (this.remoteTasks[task.id]) {
      console.log('onTaskComplete: ' + task.id);
      delete this.remoteTasks[task.id];
      if (this[task.onTaskComplete]) {
        this[task.onTaskComplete](task.result);
      }
      return true;
    }
  }

  // send task to another controller.
  submitTask(task) {
    if (this.dispatcher.dispatch('TASK_REQUEST', task)) {
      this.remoteTasks[task.id] = task;
      return true;
    }
    return false;
  }

  run() {
    _.each(this.localTasks, (task, index, tasks) => {
      const result = this[task.runTask](task.data);
      if (result) {
        task.result = result;
        this.dispatcher.dispatch('TASK_COMPLETE', task);
        tasks.splice(index, 1);
      }
    })
  }

  addController(controller) {
    this.controllers.add(controller);
    return controller;
  }

  removeController(controller) {
    this.controllers.delete(controller);
  }

  loop() {
    this.run();

    for(const controller of this.controllers) {
      controller.loop(this);
    }
    _.assign(this.memory, this.toJSON());
  }

  toJSON() {
    return _.pick(this, 'localTasks', 'remoteTasks');
  }
}

module.exports = Controller;
