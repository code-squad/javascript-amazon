const Mypromise = require('./MyPromise');

const promise = new Mypromise(
  function executor(resolve, reject) {
    console.log("inside")
    resolve("OK")
  }
)

console.log("outside")