const MyPromise = require("./index");

test("프로미스 생성 테스트", () => {
  const initObj = {
    state: undefined,
    value: undefined,
    handler: undefined
  };

  const myPromise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: "Success!", id: 123123 });
    }, 1000);
  });

  expect(myPromise).toEqual(initObj);
});

test("프로미스 resolve 테스트", () => {
  const myPromise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: "Success!", id: 123123 });
    }, 1000);
  });

  return myPromise
  .then(successMessage => {
    expect(successMessage).toEqual({ name: "Success!", id: 123123 });
  });
});