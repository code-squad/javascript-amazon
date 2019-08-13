class SearchBoxController {
  constructor({
    broker,
    inputFormView,
    recentResultView,
    recentResultModel,
    autoCompleteView,
    autoCompleteModel
  }) {
    this.broker = broker;
    this.inputFormView = inputFormView;
    this.recentResultView = recentResultView;
    this.recentResultModel = recentResultModel;
    this.autoCompleteView = autoCompleteView;
    this.autoCompleteModel = autoCompleteModel;

    this.init();
    this.publishBroker();
    this.subscribeBroker();
  }
  init() {
    this.autoCompleteView.items = this.autoCompleteModel.items;
    this.recentResultView.items = this.recentResultModel.items;
  }

  publishBroker() {
    const eventHandler = new EventHandler(this.broker);

    const inputBox = document.querySelector("#inputBox");

    inputBox.addEventListener("keyup", eventHandler, false);
    inputBox.addEventListener("focus", eventHandler, false);
  }

  subscribeBroker() {
    const recentResult = document.querySelector("#recentResult");
    const autoComplete = document.querySelector("#autoComplete");

    this.broker.subscribe(recentResult, "recent", e => {
      this.toggleDisplayStyle(e.detail);
      if (e.detail === "") {
        this.recentResultView.render();
      }
    });

    this.broker.subscribe(autoComplete, "keyword", e => {
      this.toggleDisplayStyle(e.detail);
      this.autoCompleteView.render({
        keyword: e.detail.toLowerCase()
      });
    });
  }

  toggleDisplayStyle(inputValue) {
    autoComplete.style.display = inputValue ? "block" : "none";
    recentResult.style.display = inputValue ? "none" : "block";
  }
}

class EventHandler {
  constructor(broker) {
    this.broker = broker;
  }
  handleEvent(event) {
    switch (event.type) {
      case "focus":
        this.broker.publish("recent", event.target.value);
        break;

      case "keyup":
        if (event.keyCode === 38 || event.keyCode === 40) {
        } else this.broker.publish("keyword", event.target.value);
        break;
    }
  }
}

export default SearchBoxController;
