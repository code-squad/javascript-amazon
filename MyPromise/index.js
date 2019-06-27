const state = require("./constants/PromiseState");
const type = require("./constants/TypesString");

class MyPromise {
  constructor(action) {
    this.state = state.PENDING;
    this.value = undefined;

    this.handler = undefined;

    function resolve(value) {
      if (this.handler === undefined) return;

      this.state = state.FULFILLED;
      this.value = value;

      setTimeout(() => {
        const handler =
          this.state === state.FULFILLED
            ? this.handler.onfulfill
            : this.handler.onreject;
        this.value = handler(this.value);
      }, 0);
    }

    function reject(reason) {
      if (this.handler === undefined) return;

      this.state = state.REJECTED;
      this.value = reason;

      setTimeout(() => {
        const handler = this.handler.onreject;
        this.value = handler(this.value);
      }, 0);
    }

    try {
      action(resolve.bind(this), reject.bind(this));
    } catch (error) {
      reject(error);
    }
  }

  then(onfulfill, onreject) {
    return new MyPromise((resolve, reject) => {
      const internalOnfulfill = value => {
        try {
          resolve(
            typeof onfulfill === type.FUNCTION ? onfulfill(value) : value
          );
        } catch (error) {
          reject(error);
        }
      };

      const internalOnreject = reason => {
        try {
          if (typeof onreject === type.FUNCTION) {
            resolve(onreject(reason));
          } else {
            reject(reason);
          }
        } catch (error) {
          reject(error);
        }
      };

      this.handler = {
        onfulfill: internalOnfulfill,
        onreject: internalOnreject
      };
    });
  }

  catch(onreject) {
    return this.then(null, onreject);
  }
}

let myFirstPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve({ name: "Success!", id: 123123 });
  }, 1000);
});

myFirstPromise
  .then(successMessage => {
    return successMessage.name;
  })
  .then(data => {
    console.log(`data is ${data}`);
  });
