class MyPromise {
    constructor(cb){
        this.state = 'pending';
        this.value = undefined;
        cb(this.resolve, this.reject);
    }

    resolve(value){
        console.log(value)
    }

    reject(){

    }

    
}

let mySecondPromise = new MyPromise((MyResolve, MyReject) => {
    MyResolve({"name":"Success!", "id" :123123})
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