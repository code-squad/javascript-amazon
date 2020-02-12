class MyEvent {
    constructor() {

    }

    addEvent(target, type, cb) {
        target.addEventListener(type, cb);
    }
}