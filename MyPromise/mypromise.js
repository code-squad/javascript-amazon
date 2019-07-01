class MyPromise {
  constructor(func) {
    this.callbackQueue = [];
    this.argumentQueue = [];
    this.promiseStatus;
    this.promiseValue;
    this.catchFunc;
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    func(this.resolve, this.reject);
  }

  resolve(argument) {
    this.exec(0, "resolved", argument);
  }

  reject(argument) {
    this.exec(1, "rejected", argument);
  }

  exec(val, str, argument) {
    let arg, targetFunc, result;
    this.argumentQueue.push(argument);

    while (this.argumentQueue.length > 0 && this.callbackQueue.length > 0) {
      arg = this.argumentQueue.shift();
      targetFunc = this.callbackQueue.shift();

      this.promiseValue = targetFunc[val](arg);
      this.promiseStatus = str;

      if (this.promiseStatus === "rejected") {
        return this.catchFunc(this.promiseValue);
      } else if (this.callbackQueue.length > 0) {
        this.argumentQueue.push(this.promiseValue);
      }
    }
  }

  then(thenfirstCB, thensecondCB) {
    this.callbackQueue.push([thenfirstCB, thensecondCB]);
    return this;
  }

  catch(func) {
    this.catchFunc = func;
  }
}

// 비동기 코드가 정상적으로 실행 되었을 경우
// let myFirstPromise = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve({ name: "Success!", id: 123123 });
//   }, 2000);
// });

// myFirstPromise
//   .then(successMessage => {
//     return successMessage.name;
//   })
//   .then(data => {
//     console.log(`data is ${data}`);
//   });

// 비동기 코드가 정상적으로 실행 되지 않았을 경우
let myFirstPromise2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    let data = { name: "michelle", id: 7067 };
    if (data.name === "michelleeee") resolve("Right!");
    else reject("Error!");
  }, 2000);
});

myFirstPromise2
  .then(
    successMessage => {
      return successMessage;
    },
    error => {
      return error;
    }
  )
  .then(result => console.log(`본인 인증 성공 ${result}`))
  .catch(result => console.log(`본인 인증 실패 ${result}`));
