import Subject from './lib/Subject.js';

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

  updateState(eventReporter) {
    const UpdatedState = StateManager.getUpdatedStateFrom[eventReporter](
      this.state
    );
    this.state = Object.assign(this.state, UpdatedState);
    this.notify(this.state);
  }
}

export default StateManager;
