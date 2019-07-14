const MyPromise = require("../myPromise");
var expect = require("chai").expect;

describe("#test1. myPromise 객체 생성 테스트", function() {
  const data = 10;

  it("myPromise를 생성할 때, 함수 이외의 인자를 받을 시에는 오류 메세지를 띄운다", function() {
    expect(() => new MyPromise()).to.throws("error");
  });

  it("myPromise를 생성할 때, input 없는 함수를 인자로 받으면 pending상태가 된다", function() {
    const mypromise = new MyPromise(() => {});
    expect(mypromise.promiseStatus).to.equal("pending");
    expect(mypromise.promiseValue).to.equal(undefined);
  });

  it("myPromise를 생성할 때, input에 넣는 함수에 인자가 있고, 인자로 받은 함수를 호출하면 resolved상태가 된다", function() {
    const mypromise = new MyPromise(resolve => {
      resolve(data);
    });
    expect(mypromise.promiseStatus).to.equal("resolved");
    expect(mypromise.promiseValue).to.equal(data);
  });

  it("myPromise를 생성할 때, input에 넣는 함수에 인자가 둘 있고, 인자로 받은 함수의 두번째를 호출하면 rejected상태가 된다", function() {
    const mypromise = new MyPromise((resolve, reject) => {
      reject(data);
    });
    expect(mypromise.promiseStatus).to.equal("rejected");
    expect(mypromise.promiseValue).to.equal(data);
  });
});

describe("#test2. myPromise then 메서드 호출 테스트", function() {
  const data = 10;
  const mypromise = new MyPromise(resolve => {
    resolve(data);
  });

  it("then으로 받아온 처리 결과는 myPromise 객체를 return한다", function() {
    const response = mypromise.then();
    expect(response instanceof MyPromise).to.true;
  });

  it("Fulfilled 상태인 경우에서 then 메서드를 호출 시, fulfillment value는 Promise의 인자와 같다", function() {
    mypromise.then(value => {
      expect(value).to.be.equal(data);
    });
  });
});
