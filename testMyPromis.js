const MyPromise = require('./myPromise');

let test1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('첫번째 프라미스');
  }, 1000);
})
  .then(res => {
    console.log(res);
    return new MyPromise((resolve, reject) => {
      setTimeout(() => {
        resolve('두번째 프라미스');
      }, 1000);
    });
  })
  .then(res => {
    console.log(res);
  });

// let myFirstPromise = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve({ name: 'Success!', id: 123123 });
//   }, 1000);
// });

// myFirstPromise
//   .then(successMessage => {
//     return successMessage.name;
//   }, 1000)
//   .then(data => {
//     console.log(`data is ${data}`);
//   });
