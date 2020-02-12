class MyPromise {
  constructor(executor) {
    this.promiseStatus = "pending";
    this.promiseValue = undefined;
    this.delayedQueue = [];
    this.init(executor);
  }

  init(executor) {
    if (typeof executor !== "function") {
      throw new Error("error");
    }
    this.resolveExecutor(executor);
  }

  updateStatus({ status, value }) {
    this.promiseStatus = status;
    this.promiseValue = value;
  }

  handle(delayed) {
    if (this.promiseStatus === "pending") {
      this.delayedQueue.push(delayed);
      return;
    }

    const delayedData = (this.promiseStatus === "resolved"
      ? delayed.onFulfilled
      : delayed.onRejected)(this.promiseValue);

    delayed.promise.resolve(delayedData);
  }

  resolveExecutor(executor) {
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
      return;
    }
  }

  resolve(value) {
    try {
      this.updateStatus({
        status: "resolved",
        value
      });

      if (this.delayedQueue.length !== 0) {
        this.delayedQueue = this.delayedQueue.map(delayed => {
          this.handle(delayed);
        });
      }
    } catch (error) {
      this.reject(error);
      return;
    }
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

    const promise = new MyPromise(() => {});
    this.handle({ onFulfilled, onRejected, promise });
    return promise;
  }

  static resolve(value) {
    return new MyPromise(resolve => {
      resolve(value);
    });
  }

  static reject(value) {
    return new MyPromise(resolve, reject => {
      reject(value);
    });
  }
}

module.exports = MyPromise;
