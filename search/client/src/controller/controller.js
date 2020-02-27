function Controller() {
  this.searchInput = $("#searchInput");
  this.autoList = $(".autoList");
  this.searchList = $(".searchList li")
  this.searchModel = new SearchModel();
  this.init();
}

Controller.prototype = {
  constrouctor: Controller,
  init() {
    this.inputHandler();
  },

  inputHandler() {
    this.searchInput.addEventListener("input", this.validationInput.bind(this));
    // this.searchInput.addEventListener("keyup", this.inputKeyupEvent.bind(this));
    // this.searchInput.addEventListener("keydown", this.inputKeydownEvent.bind(this));
  },

  validationInput(e) {
    let message = e.target.value;
    let pattern = /^[a-zA-Z]+$/;
    this.validateInput = message.length > 0 && pattern.test(message) === true;
    if (this.validateInput) {
      this.autoList.style.display = 'block';
      this.connectModel(message)
    } else {
      this.autoList.style.display = 'none';
    }
  },

  connectModel(message) {
    (async () => {
      try {
        await this.searchModel.fetchData(message);
        new autoCompleteView(this.searchModel.matchingItem, message);
      } catch (err) {
        console.log(err);
      }
    })();
  },

  inputKeyupEvent(e) {

  },

  inputKeydownEvent() {

  }

};
