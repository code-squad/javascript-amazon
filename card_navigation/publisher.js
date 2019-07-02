export default class Publisher {
  constructor() {
    this.subscribers = [];
    this.state = {}
  }

  add(subscriber) {
    this.subscribers.push(subscriber);
  }

  notify() {
    this.subscribers.forEach(el => {
      el.run();
    })
  }

  setState(state) {
    this.state = { ...this.state, ...state }
    this.notify();
  }
}