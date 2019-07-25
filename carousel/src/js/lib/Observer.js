class Observer {
  // Gets called by the Subject::notify method.
  constructor() {}

  addSubjet(subject) {
    this.subject = subject;
  }

  removeSubject() {
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
