class MyPromise {
    constructor(func) {
      this.resolve = this.resolve.bind(this);
      func(this.resolve);
      this.resolveFun;
    }
  
    resolve(argument) {
      this.resolveFun(argument);
    }
  
    then(thenfirstCB) {
      this.resolveFun = thenfirstCB;
    }
  
    reject() {}
  
    catch() {}
  }
  
  let cb = (resolve, reject) => {
    setTimeout(() => {
      resolve("Success!");
    }, 3000);
  };
  
  let myFirstPromise = new MyPromise(cb);
  
  myFirstPromise.then(successMessage => {
    console.log("Yay! " + successMessage);
  });
  