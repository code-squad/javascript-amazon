class SearchController {
  constructor({ inputView, matchedView, searchModel }) {
    this.inputView = inputView;
    this.matchedView = matchedView;
    this.searchModel = searchModel;
  }

  init() {
    this.registerEvents();
  }

  registerEvents() {
    this.inputView.ul.addEventListener("input", ({ target: { value } }) =>
      this.inputViewKeyDownHandler(value)
    );
    // console.log("inputView 실제영역",this.inputView.div);
  }

  // util 함수
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async inputViewKeyDownHandler(value) {
    await this.sleep(300);
    const matchedData = await this.searchModel.find(value);
    await this.matchedView.render(matchedData);
  }
}

export default SearchController;
