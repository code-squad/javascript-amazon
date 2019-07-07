class Observer {
  // Gets called by the Subject::notify method.
  constructor() {}

  addPublisher(subject) {
    this.subject = subject;
  }

  removePublisher() {
    this.subject = null;
  }

  attachEvent() {
    throw new Error('this method will be overided');
  }

  reportEvent() {
    throw new Error('this method will be overided');
  }

  update() {
    throw new Error('this method will be overided');
  }
}

export default Observer;
