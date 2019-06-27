const MyPromise = require("./index");

const makePromise = () => {
  const myPromise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: "Success!", id: 123123 });
    }, 1000);
  });
  return myPromise;
}

test("프로미스 생성 테스트", () => {
  const initObj = {
    state: undefined,
    value: undefined,
    handler: undefined
  }
  expect(makePromise()).toEqual(initObj);
})