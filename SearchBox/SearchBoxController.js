class SearchBoxController {
  constructor({ broker, inputFormView, autoCompleteView, autoCompleteModel }) {
    this.broker = broker;
    this.inputFormView = inputFormView;
    this.autoCompleteView = autoCompleteView;
    this.autoCompleteModel = autoCompleteModel;
    this.init();
    this.publishBroker();
    this.subscribeBroker();
  }
  init() {
    this.autoCompleteView.items = this.autoCompleteModel.items;
  }

  publishBroker() {
    const element = document.querySelector("#inputBox");
    element.addEventListener(
      "keyup",
      e => {
        if (e.keyCode === 38 || e.keyCode === 40) {
        } else this.broker.publish("keyword", e.target.value);
      },
      false
    );
  }

  subscribeBroker() {
    const ul = document.querySelector("#autoComplete");
    this.broker.subscribe(ul, "keyword", e => {
      this.autoCompleteView.render({
        keyword: e.detail.toLowerCase()
      });
    });
  }
}
export default SearchBoxController;
