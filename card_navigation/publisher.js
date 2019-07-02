export default class Publisher {
  constructor() {
    this.subscribers = [];
    this.state = {}
  }

  add(subscriber) {
    this.subscribers.push(subscriber);
  }

  notify(state) {
    this.subscribers.forEach(el => {
      el.render(state);
    })
  }

  setState(state) {
    this.state = { ...this.state, ...state }
    this.notify(this.state);
  }
}