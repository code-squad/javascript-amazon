class MyPromise {
    constructor(cb){
        this.state = 'pending';
        this.value = undefined;
        cb(this.resolve.bind(this), this.reject.bind(this));
    }

    resolve(value){
        this.value = value;
        this.state = 'fulfilled';
    }

    reject(){

    }

    then(cb){
        // 상태가 pending 이 아닌지 확인한다. pending에서 fulfilled로 바뀌면 실행되도록 해야한다. 
        // 어떻게 해야 then 함수가 바로 실행되지 않고, Promise의 상태가 바뀐 다음에 실행되도록 할 수 있을까? 
        // --> 1. resolve에서 상태를 바꾼 다음에 then 함수를 실행한다. 
        // <-- 그런데 전역에서 이미 then 함수가 실행된다. 따라서 then 함수는 이미 불려져야한다는 이야기다.
        // --> 2. then 함수가 실행되면 무엇을 하는가를 잘 생각해보자  
        // <-- then함수는 콜백함수들을 다 등록을 한다. 따라서 then은 일단은 콜백함수를 등록하는 로직이 필요하다. 
        // 콜백함수를 등록한다. 상태가 바뀌면 등록했던 콜백함수를 실행한다. 따라서 then 함수에서는 콜백함수만 등록하는것으로 하고..
        // 등록된 콜백함수를 실행하는건 

    
        // 콜백함수는 받는다 치는데, 콜백함수의 인자는 어떻게 받는담? 
        // if(this.state !== 'pending') cb()
        let extraParam = this.value ;
        const thensPromise = cb(extraParam);
        return thensPromise
    }

    
}

let mySecondPromise = new MyPromise((MyResolve, MyReject) => 
    MyResolve({"name":"Success!", "id" :123123})
  )


mySecondPromise.then((successMessage)=>{
    return successMessage.name;
})

// 구현되어야할 예제 
// let myFirstPromise = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({"name":"Success!", "id" :123123});
//     }, 1000);
//   });
  
//   myFirstPromise.then((successMessage) => {
//     return successMessage.name;
//   }).then((data) => {
//     console.log(`data is ${data}`)
//   })