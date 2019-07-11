module.exports = class MyPromise {
  constructor (executer) {
    if(typeof executer != "function") {
      throw new Error("Promise resolver must be a function")
    }

    this.state = "pending"
    this.value = undefined
    this.laterCalls = []

    try {
      executer(MyPromise.resolve.bind(this), MyPromise.reject.bind(this))
    } catch(e) {
      MyPromise.reject(e)
    }
  }

  change(state, value) {
    this.state = state
    this.value = value
  }

  then(func) {
    if(this.state == "pending") {
      return new MyPromise((resolve) => {
        this.laterCalls.push(() => resolve(func(this.value)))
      })
    }
    return new MyPromise((resolve) => resolve(func(this.value)))
  }

  catch(func) {
    if(this.state == "pending") {
      return new MyPromise((_, reject) => {
        this.laterCalls.push(() => reject(func(this.value)))
      })
    }
    return new MyPromise((_, reject) => reject(func(this.value)))
  }

  static resolve(val) {
    if (val instanceof MyPromise) {
      val.then((v) => {
        this.change("resolved", v)
        this.laterCalls.forEach(laterCall => laterCall(this.value));
      })
    } else {
      this.change("resolved", val)
      this.laterCalls.forEach(laterCall => laterCall(this.value));
    }
  }

  static reject(val) {
    this.change("rejected", val)
  }
}