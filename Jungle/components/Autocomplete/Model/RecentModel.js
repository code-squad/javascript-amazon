import MyEventEmitter from "../../../../Grenutil/MyEventEmitter/index.js";

export default class RecentModel extends MyEventEmitter {
  constructor({maxLen}) {
    super();

    this.queue = [];
    this.maxLen = maxLen;
  }

  push(data) {
    while(this.queue.length >= this.maxLen) {
      this.queue.shift();
    }

    this.queue.push(data);
  }
}