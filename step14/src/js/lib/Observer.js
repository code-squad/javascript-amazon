class Observer {
  // Gets called by the Subject::notify method.

  reportEvent() {
    throw new Error('this method will be overided');
  }

  update() {
    throw new Error('this method will be overided');
  }
}

export default Observer;
