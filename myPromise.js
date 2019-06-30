const MyPromise = class {
  constructor(executor) {
    this.state = 'pending';
    this.callbackQue = [];

    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  resolve(value) {
    if (value instanceof MyPromise) {
      value.then(value => {
        this.status = 'resolved';
        this.value = value;
        for (const callback of this.callbackQue) {
          callback();
        }
      });
    } else {
      this.state = 'resolved';
      this.value = value;
      for (const callback of this.callbackQue) {
        callback();
      }
    }
  }

  reject(value) {
    this.state = 'rejected';
    this.value = value;
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
