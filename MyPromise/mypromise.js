class MyPromise {
  constructor(func) {
    this.callbackQueue = [];
    this.argumentQueue = [];
    this.resolve = this.resolve.bind(this);
    func(this.resolve);
  }

  resolve(argument) {
    let arg, resolveFunc, result;
    this.argumentQueue.push(argument);

    while (this.argumentQueue.length > 0 && this.callbackQueue.length > 0) {
      arg = this.argumentQueue.shift();
      resolveFunc = this.callbackQueue.shift();
      result = resolveFunc(arg);
      if (this.callbackQueue.length > 0) {
        this.argumentQueue.push(result);
      }
    }
  }

  then(thenfirstCB) {
    this.callbackQueue.push(thenfirstCB);
    console.log(this);
    return this;
  }

  reject() {}

  catch() {}
}

let cb = (resolve, reject) => {
  setTimeout(() => {
    resolve({ name: "Success!", id: 123123 });
  }, 1000);
};

let myFirstPromise = new MyPromise(cb);

myFirstPromise
  .then(successMessage => {
    return successMessage.name;
  })
  .then(data => {
    console.log(`data is ${data}`);
  });
