class EventBroker {
  constructor() {
    this.subscribers = [];
  }

  subscribe(element, eventType, callback) {
    this.subscribers.push({
      element,
      eventType
    });
    element.addEventListener(eventType, callback, false);
  }

  publish(eventType, data) {
    this.subscribers.forEach(subscriber => {
      if (subscriber.eventType === eventType) {
        const event = new CustomEvent(eventType, { detail: data });
        subscriber.element.dispatchEvent(event);
      }
    });
  }

  unsubscribe(element, eventType) {
    let subscribers = this.subscribers.slice();
    this.subscribers = subscribers.filter(subscriber => {
      if (subscriber.eventType === eventType && subscriber.element === element)
        return false;
    });
  }
}

export default EventBroker;
