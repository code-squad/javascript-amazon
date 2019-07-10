import Subject from '../observer/Subject.js';

class Model extends Subject {
  constructor(state) {
    super();
    this.state = state;
  }

  setState(data = {}) {
    this.state = data;
    this.notify(this.state);
  }
}

export default Model;
