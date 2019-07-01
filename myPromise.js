const defineProperty = (target, propName, propValue) => {
	Object.defineProperty(target, propName, {value : propValue});
};

class MyPromise {
    get state() {
        return 'PENDING';
    }
    get value() {
        return undefined;
    }

    constructor(executor) {
        defineProperty(this, "eventQ", []);

        const resolve = function(value) {
            defineProperty(this, "value", value);
            defineProperty(this, "state", "FULFILLED");

            if(this.state === 'FULFILLED') {
                this.eventQ.map((v) => {
                    let isReturn = v['then_resolve'](value);

                    if(isReturn) {
                        defineProperty(this, "value", isReturn);
                    }
                })
            }

        }.bind(this)

        const reject = function(reason) {
            defineProperty(this, "value", reason);
            defineProperty(this, "state", "REJECTED");

        }.bind(this)

        executor(resolve, reject);
    }

    then(fulfilled, rejected) {
        const then_resolve = (value) => {
            fulfilled(value);
        }
        this.eventQ.push(
            {then_resolve}
        );

        return this;
    }
}

const myPromise = new MyPromise(function(resolve, reject) {
    setTimeout(() => {
        resolve({"name":"Success!", "id" :123123});
    }, 2000)
})

myPromise.then(function(value) {
    return value.name;
}).then(function(value) {
    console.log(value.name);
}) 
