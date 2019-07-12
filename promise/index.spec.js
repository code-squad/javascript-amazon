const MyPromise = require('./MyPromise')
const should = require('should')

describe('MyPromise 생성자 TEST', () => {
  it("# 프로미스 생성자 함수의 인자는 반드시 함수여야 한다.", () => {
    should(() => { new MyPromise() }).throw("Promise resolver must be a function")
  })

  it("# 프로미스 객체를 생성했을 경우 state는 pending 상태여야 한다.", () => {
    const pm = new MyPromise(() => {})
    pm.state.should.be.equal("pending")
  })

  it("# 프로미스 객체 내에서 resolve를 실행시키면 state는 resolved가 된다.", () => {
    const pm = new MyPromise((resolve, reject) => { resolve(true) })
    pm.state.should.be.equal("resolved")
  })

  it("# 프로미스 객체 내에서 reject를 실행시키면 state는 rejected가 된다.", () => {
    const pm = new MyPromise((resolve, reject) => { reject(true) })
    pm.state.should.be.equal("rejected")
  })
})

describe("MyPromise then API TEST", () => {
  it("# promise에서 resolve한 값이 then함수의 callback 함수의 인자로 넘어와야 한다.", () => {
    const pm = new MyPromise((resolve, reject) => { resolve(5) })
    return pm.then((val) => {
      val.should.be.equal(5)
    })
  })

  it("# then의 리턴값은 promise 이여야 한다.", () => {
    const pm = new MyPromise((resolve, reject) => { resolve(5) })
    const res = pm.then(val => val+1)
    
    res.should.be.instanceof(MyPromise)
  })

  it("# then 으로 체이닝된 함수는 동기적으로 실행되어야 한다.", () => {
    let flag = 1
    const pm = new MyPromise((resolve, reject) => {
      setTimeout(() => { resolve(5) }, 200)
    })
    return pm.then((val) => {
      flag += val
      flag.should.be.equal(6)
      return val
    }).then((val) => {
      flag += val
      flag.should.be.equal(11)
      return flag
    })
  })

  it("# then의 콜백 함수에서 리턴한 값이 프로미스라면 다음 then의 콜백에는 resolve 값이 들어가야 한다.", () => {
    const pm = new MyPromise((resolve, reject) => { resolve(5) })
    const res = pm.then(val => new MyPromise((resolve, reject) => {
      resolve(val + 1)
    }))

    return res.then(val => {
      val.should.be.equal(6)
    })
  })
})

describe("MyPromise catch API TEST", () => {
  it("# promise에서 reject한 값이 catch 함수의 callback 함수의 인자로 넘어와야 한다.", () => {
    const pm = new MyPromise((resolve, reject) => { reject("error") })
    return pm.catch((err) => {
      err.should.be.equal("error")
    })
  })

  it("# catch의 리턴값은 promise 이여야 한다.", () => {
    const pm = new MyPromise((resolve, reject) => { reject("error") })
    const res = pm.catch(e => console.log(e))
    
    res.should.be.instanceof(MyPromise)
  })
})