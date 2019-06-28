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
    this.state = 'resolved';
    this.value = value;
    let callback;
    while ((callback = this.callbackQue.shift())) {
      this.value = callback(this.value);
    }
  }

  then(callback) {
    if (this.state === 'resolved')
      return new MyPromise((resolve, reject) => resolve(callback(this.value)));
    this.callbackQue.push(callback);
    return this;
  }
};

let myFirstPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve({ name: 'Success!', id: 123123 });
  }, 1000);
});

myFirstPromise
  .then(successMessage => {
    return successMessage.name;
  })
  .then(data => {
    console.log(`data is ${data}`);
  });
