export default class Publisher {
  constructor() {
    this.subscribers = {};
    this.state = {}
  }

  add(name, obj) {
    this.subscribers[name] = obj;
  }

  notify(name, state) {
    if (name === '') Object.keys(this.subscribers).forEach(name => this.subscribers[name].render(state));
    else this.subscribers[name].render(state);
  }

  setState(state) {
    this.state = { ...this.state, ...state }
    this.notify(name, this.state);
  }
}