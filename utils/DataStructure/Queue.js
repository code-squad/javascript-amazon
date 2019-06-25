class Queue {
  constructor() {
    this.q = [];
  }

  enqueue(v) {
    this.q.push(v);
  }

  dequeue() {
    this.q.shift();
  }

  top() {
    return this.q[this.q.length-1];
  }

  empty() {
    return (this.q.length === 0);
  }

  front() {
    return this.q[0];
  }

  clear() {
    this.q.length = 0;
  }
}

module.exports = Queue;