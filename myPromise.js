class MyPromise {
  constructor(executor) {
    this.promiseStatus = undefined;
    this.promiseValue = undefined;

    this.init(executor);
  }

  init(executor) {
    if (typeof executor !== "function") {
      throw new Error("error");
    }
    if (!executor.length) {
      this.updateStatus({
        status: "pending",
        value: undefined
      });
    }

    this.resolveExecutor(executor);
  }

  updateStatus({ status, value }) {
    this.promiseStatus = status;
    this.promiseValue = value;
  }

  resolveExecutor(executor) {
    try {
      executor(
        value => {
          this.resolve(value);
        },
        reason => {
          this.reject(reason);
        }
      );
    } catch (error) {
      this.reject(error);
    }
  }

  resolve(value) {
    this.updateStatus({
      status: "resolved",
      value
    });
  }

  reject(reason) {
    this.updateStatus({
      status: "rejected",
      value: reason
    });
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : value => value;
    onRejected = typeof onRejected === "function" ? onRejected : value => value;
    return new MyPromise(resolve => {
      resolve(onFulfilled(this.promiseValue));
    });
  }
}

module.exports = MyPromise;
