export default class Publisher {
  constructor() {
    this.subscribers = {};
    this.state = {}
  }

  add(name, obj) {
    this.subscribers[name] = obj;
  }

  notify(name, state) {
    this.subscribers[name].render(state);
  }

  setState(state) {
    this.state = { ...this.state, ...state }
    this.notify(name, this.state);
  }
}