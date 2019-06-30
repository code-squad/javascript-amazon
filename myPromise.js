const MyPromise = class {
  constructor(executor) {
    this.state = 'pending';
    this.callbackQue = [];
    this.applyChangedState.bind(this);

    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }
  applyChangedState(value, state) {
    if (value instanceof MyPromise) {
      value.then(value => {
        this.value = value;
        this.status = state;
        for (const callback of this.callbackQue) {
          callback();
        }
      });
    } else {
      this.value = value;
      this.state = state;
      for (const callback of this.callbackQue) {
        callback();
      }
    }
  }

  resolve(value) {
    this.applyChangedState(value, 'resolved');
  }

  reject(value) {
    this.applyChangedState(value, 'resolved');
  }

  then(callback) {
    if (this.state === 'resolved')
      return new MyPromise((resolve, reject) => resolve(callback(this.value)));

    if (this.state === 'pending')
      return new MyPromise(resolve => {
        this.callbackQue.push(() => resolve(callback(this.value)));
      });
    return this;
  }

  catch(callback) {
    if (this.state === 'rejected')
      return new MyPromise((resolve, reject) => resolve(callback(this.value)));
    return this;
  }
};

module.exports = MyPromise;
