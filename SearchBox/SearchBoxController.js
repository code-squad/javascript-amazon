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

    this.currentTargetList = undefined;

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
    const submitBtn = document.querySelector("#submitBtn");

    inputBox.addEventListener("keyup", eventHandler, false);
    inputBox.addEventListener("focus", eventHandler, false);
    submitBtn.addEventListener("click", this.onClick, false);
  }

  subscribeBroker() {
    const searchResult = document.querySelector("#searchResult");
    const recentResult = document.querySelector("#recentResult");
    const autoComplete = document.querySelector("#autoComplete");

    this.broker.subscribe(recentResult, "recent", e => {
      if (e.detail === "") {
        this.toggleResultView(e.detail);
        this.recentResultView.render();
      }
    });

    this.broker.subscribe(autoComplete, "keyword", e => {
      this.toggleResultView(e.detail);
      setTimeout(() => {
        this.autoCompleteView.render({ keyword: e.detail.toLowerCase() });
        if (e.detail === "") this.recentResultView.render();
      }, 300);
    });

    this.broker.subscribe(searchResult, "move", e => {
      this.inputFormView.setTargetList({
        currentTargetList: this.currentTargetList
      });
      this.inputFormView.move({ keyCode: e.detail });
      this.inputFormView.toggleStyleOfTarget();
      this.inputFormView.updateInputValue();
    });
  }

  toggleResultView(inputValue) {
    this.inputFormView.reset();
    this.currentTargetList = document.querySelector(
      `#${inputValue ? "autoComplete" : "recentResult"}`
    );
    (inputValue ? this.recentResultView : this.autoCompleteView).clearView();
  }

  onClick(e) {
    e.preventDefault();
    const keyword = document.querySelector("#inputBox").value;
    this.recentResultModel.addKeyword({ keyword });
    this.recentResultView.clearView();
    this.autoCompleteView.clearView();
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
        if (event.keyCode === 38 || event.keyCode === 40)
          this.broker.publish("move", event.keyCode);
        else if (event.keyCode !== 37 && event.keyCode !== 39)
          this.broker.publish("keyword", event.target.value);
        break;
    }
  }
}

export default SearchBoxController;
