import EventBroker from "../../eventBroker.js";

class SearchBox {
  constructor(broker) {
    this.broker = broker;
    this.init();
  }

  init() {
    const element = document.querySelector("#inputBox");
    element.addEventListener(
      "keyup",
      e => {
        if (e.keyCode === 38 || e.keyCode === 40) {
          // this.broker.publish("move", e.keyCode);
        } else this.broker.publish("keyword", e.target.value);
      },
      false
    );
  }
}

export default SearchBox;
