const state = require("./constants/PromiseState");

class MyPromise {
  constructor(action) {
    this.state = state.PENDING;
    this.value = undefined;

    this.microtasks = [];

    action(resolve.bind(this), reject.bind(this));

    function resolve(value) {
      this.state = state.FULFILLED;
      this.value = value;

      this.microtasks.forEach(handler => {
        setTimeout(() => {
          handler(this.value);
        }, 0);
      }, this);
    }

    function reject(reason) {
      console.log("I am reject");
    }
  }

  then(cb) {
    this.microtasks.push(cb);
    return this;
  }
}

let myFirstPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve({"name":"Success!", "id" :123123});
  }, 1000);
});

// myFirstPromise.then(data => {
//   console.log(data);
//   return data;
// }).then(data => {
//   setTimeout(() => {
//     console.log(data, "2");
//   }, 1000);
// });
myFirstPromise.then(data => {
  console.log(data);
  return data.name;
}).then(data => {
  console.log(data);
});