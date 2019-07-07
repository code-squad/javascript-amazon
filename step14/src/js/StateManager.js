import Subject from './lib/Subject';

class StateManager extends Subject {
  constructor() {
    super();
    this.state = {};
  }

  get() {
    return this.state;
  }

  setState(data = {}) {
    this.state = Object.assign(this.state, data);
  }

  update(reporter) {
    const changedState = StateManager.getChangedStateBy[reporter](this.state);
    this.state = Object.assign(this.state, changedState);
    this.notify(this.state);
  }
}

export default StateManager;
