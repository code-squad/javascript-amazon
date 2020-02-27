function Controller() {
  this.searchInput = $("#searchInput");
  this.autoList = $(".autoList");
  this.searchModel = new SearchModel();
  this.init();
}

Controller.prototype = {
  init() {
    this.inputHandler();
  },

  inputHandler() {
    this.searchInput.addEventListener("input", this.validationInput.bind(this));
  },

  validationInput(e) {
    let message = e.target.value;
    let pattern = /^[a-zA-Z]+$/;
    this.validateInput = message.length > 0 && pattern.test(message) === true;
    if (this.validateInput === true) {
      this.autoList.style.display = 'block';
      const connectModel = async () => {
        try {
          await this.searchModel.fetchData(message);
          await new autoCompleteView(this.searchModel.matchingItem, message);
        } catch (err) {
          console.log(err);
        }
      };
      connectModel();
    } else {
      this.autoList.style.display = 'none';
    }
  }
};
