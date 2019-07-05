const [
  FULFILLED,
  REJECTED,
  PENDING
] = [true, false, void 0]

class MyPromise {
  constructor(exec) {
    if (typeof exec != "function") {
      throw new TypeError("Promise resolver is not a function")
    }

    this._state = PENDING
    this._value = void 0
  }

  static resolve() {
    
  }
  static reject() {
    
  }
  static all() {
    
  }
  static race() {
    
  }
  then() {
    
  }
  catch() {
    
  }
}