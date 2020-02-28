class Model {
    constructor(callback) {
        const proxy = new Proxy(this, {
            get(target, property) {
                return target[property];
            },
            set(target, property, value) {
                target[property] = value;
                if (callback) {
                    callback(value);
                }

                return true;
            }
        })

        return proxy;
    }
}

export default Model;