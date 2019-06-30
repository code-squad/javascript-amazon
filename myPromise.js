const MyPromise = class {
  constructor(executor) {
    this.state = 'pending';
    this.callbackQue = [];
    this.decidePromiseByMethod.bind(this);
    this.applyChangedState.bind(this);

    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  applyChangedState(value, state) {
    if (value instanceof MyPromise) {
      value.then(innerPromiseValue => {
        this.value = innerPromiseValue;
        this.status = state;
        this.callbackQue.forEach(callback => callback());
      });
    } else {
      this.value = value;
      this.state = state;
      this.callbackQue.forEach(callback => callback());
    }
  }

  decidePromiseByMethod(method, callback) {
    const state = method === 'then' ? 'resolved' : 'rejected';
    if (this.state === state)
      return new MyPromise(resolve => resolve(callback(this.value)));

    if (this.state === 'pending')
      return new MyPromise(resolve => {
        this.callbackQue.push(() => resolve(callback(this.value)));
      });
    return this;
  }

  resolve(value) {
    this.applyChangedState(value, 'resolved');
  }

  reject(value) {
    this.applyChangedState(value, 'rejected');
  }

  then(callback) {
    return this.decidePromiseByMethod('then', callback);
  }

  catch(callback) {
    return this.decidePromiseByMethod('catch', callback);
  }
};
module.exports = MyPromise;
