class MyPromise {
    constructor(cb) {
        this.state = 'pending';
        this.value = undefined;
        this.thensCallbackQueue = [];
        cb(this.resolve.bind(this), this.reject.bind(this));
    }

    resolve(value) {
        this.value = value;
        this.state = 'fulfilled';
        // MyPromise 를 then마다 만들지 않고 한번에 처리하려다 보니 발생한 현상.. 
        while(this.thensCallbackQueue.length !== 0){
            const currentCallback = this.thensCallbackQueue[0];
            this.excuteThensCallback(currentCallback);
        }
    }

    reject(value) {}

    then(cb){
        if(!this.thensCallbackQueue.includes(cb)) {
            this.thensCallbackQueue.push(cb);
            return this;
        }
    }

    excuteThensCallback(cb) {
        const fetchedValue = cb(this.value);
        this.value = fetchedValue;
        this.thensCallbackQueue.shift();
    }
}
const myFirstPromise = new MyPromise((MyResolve, MyReject) => {
    setTimeout(() => {
        MyResolve({ "name": "Success!", "id": 123123 });
    }, 1000);
})
myFirstPromise.then((successMessage) => {
    return successMessage.name;
}).then((data) => {
    console.log(`data is ${data}`);
    return data
  }).then((data2) => {
      console.log(`data2 인 ${data2}를 잘 받았습니다.`);
      return data2
  }).then((data3) => { 
      console.log(`data3 is ${data3}`);
  })

mySecondPromise.then((successMessage) => {
    // console.log("여기는 Promise의 상태가 변해야만 실행됨",successMessage)
    return successMessage.name;
})

