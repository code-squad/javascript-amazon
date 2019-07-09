const myPromise = require("../myPromise");
var expect = require("chai").expect;

describe("myPromise 객체 생성 테스트", function() {
  it("myPromise는 생성할 때, 함수 이외의 인자를 받을 시에는 오류메세지를 띄운다.", function() {
    expect(() => new myPromise()).to.throws("error");
  });
  it("myPromise는 생성할 때, input이 없는 함수를 인자로 받으면 pending상태가 된다.", function() {
    const mypromise = new myPromise(() => {});
    expect(mypromise.promiseStatus).to.equal("pending");
    expect(mypromise.promiseValue).to.equal(undefined);
  });
  it("myPromise는 생성할 때, input에 넣는 함수에 인자가 있고, 인자로 받은 함수를 호출하면 resolved상태가 된다.", function() {
    const mypromise = new myPromise(resolve => {
      resolve("test");
    });
    expect(mypromise.promiseStatus).to.equal("resolved");
    expect(mypromise.promiseValue).to.equal("test");
  });
  it("myPromise는 생성할 때, input에 넣는 함수에 인자가 둘 있고, 인자로 받은 함수의 두번째를 호출하면 rejected상태가 된다.", function() {
    const mypromise = new myPromise((resolve, reject) => {
      reject("reason");
    });
    expect(mypromise.promiseStatus).to.equal("rejected");
    expect(mypromise.promiseValue).to.equal("reason");
  });
});
