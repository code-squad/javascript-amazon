class myPromise {
  constructor(executor) {
    this.executor = executor;
    this.promiseStatus = undefined;
    this.promiseValue = undefined;
    this.init();
  }

  init() {
    if (typeof this.executor !== "function") {
      throw new Error("error");
    }
    if (!this.executor.length) {
      return this.updateStatus({
        status: "pending",
        value: undefined
      });
    }
    return this.resolveFunc(this.executor);
  }

  updateStatus({ status, value }) {
    this.promiseStatus = status;
    this.promiseValue = value;
  }

  resolveFunc(func) {
    func(
      value => {
        this.resolve(value);
      },
      reason => {
        this.reject(reason);
      }
    );
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
}

module.exports = myPromise;
