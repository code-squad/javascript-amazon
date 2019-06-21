class Observer {
  constructor() {
    this.handlers = {};
  }

  register(eventName, handler, context) {
    let handlerArray = this.handlers[eventName];
    if (handlerArray === undefined) {
      handlerArray = this.handlers[eventName] = [];
    }
    handlerArray.push({ handler, context });
  }

  unregister(eventName, handler, context) {
    const isEqual = (a, b) => a === b;
    let handlerArray = this.handlers[eventName];
    if (handlerArray === undefined) return;
    handleArray = handlerArray.filter(
      currentHandler =>
        !(
          isEqual(currentHandler.handler, handler) &&
          isEqual(currentHandler.context, context)
        )
    );
  }

  notify(eventName, data) {
    let handlerArray = this.handlers[eventName];
    if (undefined === handlerArray) return;

    handlerArray.forEach(currentHandler =>
      currentHandler.handler.call(currentHandler.context, data)
    );
  }
}

export default Observer;
