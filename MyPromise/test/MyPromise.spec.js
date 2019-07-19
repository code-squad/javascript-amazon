const MyPromise = require("../MyPromise");
var expect = require("chai").expect;

describe("#test1. MyPromise 객체 생성 테스트", function() {
  it("함수 이외의 인자를 받을 시에는 오류 메세지를 띄운다", function() {
    expect(() => new MyPromise()).to.throws("error");
  });

  it("input 없는 함수를 인자로 받으면 pending상태가 된다", function() {
    const mypromise = new MyPromise(() => {});
    expect(mypromise.promiseStatus).to.equal("pending");
    expect(mypromise.promiseValue).to.equal(undefined);
  });

  it("input에 넣는 함수에 인자가 있고, 인자로 받은 함수를 호출하면 resolved상태가 된다", function() {
    const value = 10;
    const mypromise = new MyPromise(resolve => {
      resolve(value);
    });
    expect(mypromise.promiseStatus).to.equal("resolved");
    expect(mypromise.promiseValue).to.equal(value);
  });

  it("input에 넣는 함수에 인자가 둘 있고, 인자로 받은 함수의 두번째를 호출하면 rejected상태가 된다", function() {
    const reason = "error";
    const mypromise = new MyPromise((resolve, reject) => {
      reject(reason);
    });
    expect(mypromise.promiseStatus).to.equal("rejected");
    expect(mypromise.promiseValue).to.equal(reason);
  });
});

describe("#test2. MyPromise 내부 함수 resolve(), reject() 테스트", function() {
  it("resolve는 value를 받아 상태와 값을 업데이트한다", function() {
    const value = 15;
    const mypromise = new MyPromise(resolve => {
      resolve();
    });
    mypromise.resolve(value);
    expect(mypromise.promiseStatus).to.equal("resolved");
    expect(mypromise.promiseValue).to.equal(value);
  });

  it("reject는 reason를 받아 상태와 값을 업데이트한다", function() {
    const reason = "Error!";
    const mypromise = new MyPromise((resolve, reject) => {
      reject();
    });
    mypromise.reject(reason);
    expect(mypromise.promiseStatus).to.equal("rejected");
    expect(mypromise.promiseValue).to.equal(reason);
  });
});

describe("#test3. MyPromise then 메서드 테스트", function() {
  describe("→then 메서드 호출 테스트", function() {
    const value = 10;
    const mypromise = new MyPromise(resolve => {
      resolve(value);
    });

    it("then 메서드는 MyPromise 객체를 return한다", function() {
      expect(mypromise.then() instanceof MyPromise).to.true;
    });

    it("then 메서드는 첫 객체에서 받은 상태와 데이터를 갖는 MyPromise 객체를 return한다", function() {
      const response = mypromise.then();
      expect(response.promiseStatus).to.equal("resolved");
      expect(response.promiseValue).to.equal(value);
    });

    it("onFulfilled의 return을 통해 받은 새로운 데이터를 객체에 담아 반환한다", function() {
      const onFulfilled = value => {
        return value + 1;
      };
      const response = mypromise.then(onFulfilled);
      expect(response.promiseStatus).to.equal("resolved");
      expect(response.promiseValue).to.equal(value + 1);
    });
  });

  describe("→then 메서드 체이닝 테스트", function() {
    const value = 10;
    const mypromise = new MyPromise(resolve => {
      resolve(value);
    });
    it("then 메서드 체이닝에 의해 1씩 더해 12를 return한다", function() {
      const onFulfilled = value => {
        return value + 1;
      };
      const response1 = mypromise.then(onFulfilled);
      const response2 = response1.then(onFulfilled);
      expect(response1.promiseValue).to.equal(value + 1);
      expect(response2.promiseValue).to.equal(value + 2);
    });
  });

  describe("→then 메서드 비동기 테스트", function() {
    const value = 10;
    it("setTimeout에서 resolve를 호출하여 값을 전달한다", function(done) {
      const mypromise = new MyPromise(resolve => {
        setTimeout(() => {
          resolve(value);
          done();
        }, 100);

        expect(mypromise.promiseValue).to.equal(value);
      });
    });
    it("setTimeout에서 resolve를 호출하고, then 메서드 체이닝으로 불러도 올바르게 값을 출력한다", function(done) {
      const mypromise = new MyPromise(resolve => {
        setTimeout(() => {
          resolve(value);
          done();
        }, 100);

        const response1 = mypromise.then(value => {
          return value + 1;
        });
        const response2 = response1.then(value => {
          return value + 1;
        });

        expect(response1.promiseValue).to.equal(value + 1);
        expect(response2.promiseValue).to.equal(value + 1);
      });
    });
  });
});
