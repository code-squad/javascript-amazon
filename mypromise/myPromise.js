class MyPromise {
  constructor(callback) {
    this.status = 'pending';
    this.value = [];
    this.reason = [];
    this.queue = [];

    callback(MyPromise.resolve.bind(this), MyPromise.reject.bind(this));
  }  

  static resolve(value) {
    if(this.status !== 'pending') return;
      this.status = 'resolved';
      this.value.push(value);
      setTimeout(() => {
        this.executor();
      })
  }

  static reject(reason) {
    if(this.status !== 'pending') return;
      this.status = 'rejected';
      this.reason.push(reason);
      setTimeout(() => {
        this.executor();
      })
  }

  then(resolvedCallback, rejectedCallback) {
    if(resolvedCallback) this.queue.push({func: resolvedCallback, status: 'resolved'});
    if(rejectedCallback) this.queue.push({func: rejectedCallback, status: 'rejected'});
    return this;
  }

  catch(rejectedCallback) {
    this.then(undefined, rejectedCallback)
    return this;
  }

  executor() {
    while(this.queue.length) {
      const resolvedCB = this.queue.shift();

      if(this.status === 'resolved' && resolvedCB.status === 'resolved') {
          const returnVal = resolvedCB.func(this.value.shift());
          this.value.push(returnVal);
      }
      if(this.status === 'rejected' && resolvedCB.status === 'rejected') {
        resolvedCB.func(this.reason.shift());
      }
    }
  }
}

// Success in async
const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve({ "name": "Success!", "id": 123123 });
  }, 1000);
});
myPromise
.then(successMessage => successMessage.name)
.then(data => console.log(`data is ${data}`));

// failure in async
const yourPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject({"name" : "Failed!", "id": 323232});
  }, 1000);
});
yourPromise
.catch( message => console.error(`data is ${message.name}, id: ${message.id}`));

// Success in sync
const thisPromise = new MyPromise((resolve, reject) => {
  resolve(3);
});
thisPromise
.then(number => number+1)
.then(addedNumber => console.log(`Delivered number is ${addedNumber}`));