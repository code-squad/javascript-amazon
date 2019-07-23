class MyPromise {
  constructor(callback) {
    this.onSuccessCb = [];
    this.onFailureCb = [];
    this.resolveParams = [];
    this.rejectParams = [];
    this.status = 'pending';

    callback(MyPromise.resolve.bind(this), MyPromise.reject.bind(this));
  }

  static reject(rejectParam) {
    this.rejectParams.push(rejectParam);
    setTimeout(() => {
      this.status = 'rejected';
      this.run();
    }, 0);
  }

  static resolve(resolveParam) {
    this.resolveParams.push(resolveParam);
    setTimeout(() => {
      this.status = 'resolved';
      this.run();
    }, 0);
  }

  then(onSuccess, onFailure) {
    this.onSuccessCb.push(onSuccess);
    this.onFailureCb.push(onFailure);
    return this;
  }

  run() {
    if (this.status === 'resolved') {
      while (this.onSuccessCb.length) {
        this.resolveParams.push(this.onSuccessCb.shift()(this.resolveParams.shift()));
      }
    }
    if (this.status === 'rejected') {
      while (this.onFailureCb.length) {
        this.rejectParams.push(this.onFailureCb.shift()(this.rejectParams.shift()));
      }
    }
  }
}

//async success test
let myFirstPromise1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve({ "name": "Success!", "id": 123123 });
  }, 1000);
});
myFirstPromise1.then((successMessage) => {
  return successMessage.name;
}).then((data) => {
  console.log(`data is ${data}`)
})

//async failure test
let myFirstPromise2 = new MyPromise((resolve, reject) => {
  let a = 1 + 2;
  if (a == 2) {
    setTimeout(() => {
      resolve('async success');
    }, 0)
  }
  else {
    setTimeout(() => {
      reject('async failed');
    }, 2000)
  }
});
myFirstPromise2.then(success => {
  console.log(success);
}, failure => {
  console.log(failure);
})

//sync success test
let myFirstPromise3 = new MyPromise((resolve, reject) => {
  let a = 1 + 1;
  if (a == 2) {
    resolve('sync success');
  }
  else {
    reject('sync failed');
  }
});
myFirstPromise3.then(success => {
  console.log(success);
}, failure => {
  console.log(failure);
})