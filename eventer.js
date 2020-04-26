class EventBus {
  constructor() {
    this.task = {};
  }

  on(name, cb) {
    if (!this.task[name]) {
      this.task[name] = [];
    }
    typeof cb === "function" && this.task[name].push(cb);
  }

  emit(name, ...arg) {
    let taskQueue = this.task[name];
    if (taskQueue && taskQueue.length > 0) {
      taskQueue.forEach((cb) => {
        cb(...arg);
      });
    }
  }

  off(name, cb) {
    let taskQueue = this.task[name];
    if (taskQueue && taskQueue.length > 0) {
      if (typeof cb === "function") {
        let index = taskQueue.indexOf(cb);
        index != -1 && taskQueue.splice(index, 1);
      }
      if (typeof cb === "undefined") {
        this.task[name].length = 0;
      }
    }
  }

  once(name, cb) {
    let callback = (...arg) => {
      this.off(name, callback);
      cb(...arg);
    };
    typeof cb === "function" && this.on(name, callback);
  }
}
