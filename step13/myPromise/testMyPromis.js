const MyPromise = require('./myPromise');
/*eslint-disable */

const test1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve({ name: 'Success!', id: 123123 });
  }, 1000);
})
  .then(successMessage => {
    return successMessage.name;
  })
  .then(data => {
    console.log(`data is ${data}`);
  });

let test2 = new MyPromise((resolve, reject) => {
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

const test3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('첫번째 프라미스');
  }, 1000);
})
  .then(res => {
    console.log(res);
    return '두번째 프라미스';
  })
  .then(res => {
    console.log(res);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('세번째 프라미스');
      }, 1000);
    });
  })
  .then(res => {
    console.log(res);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('네번째 프라미스');
      }, 1000);
    });
  })
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
    return new Error('이 에러는 then에 잡힙니다.');
  })
  .then(res => {
    console.log(res);
    // // throw 하면 캐치로 가지만, 프로미스에서는 then 건너뛰고 캐치로 감
    throw new Error('이 에러는 catch에 잡힙니다.');
  })
  .then(res => {
    console.log('출력 안됨');
  })
  .catch(err => {
    console.error(err);
  });
