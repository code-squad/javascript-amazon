export default class Publisher {
  constructor() {
    this.subscribers = {};
    this.state = {}
  }

  add(name, obj) {
    this.subscribers[name] = obj;
  }

  notify(state, name) {
    if (name) this.subscribers[name].render(state);
    else Object.keys(this.subscribers).forEach(name => this.subscribers[name].render(state));
  }

  setState(state) {
    this.state = { ...this.state, ...state }
    this.notify(name, this.state);
  }
}