import sleep from "./sleep.js";

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
      this.inputViewInputHandler(value)
    );
    this.inputView.ul.addEventListener("keydown", ({ code }) =>
      this.inputViewKeyDownHandler(code)
    );
  }

  async inputViewInputHandler(inputValue) {
    await sleep(300);
    const matchedData = await this.searchModel.find(inputValue);
    console.log("matchedData", matchedData);
    await this.matchedView.render(matchedData,inputValue);
  }

  inputViewKeyDownHandler(code) {
    if (["ArrowDown", "ArrowUp", "Enter"].includes(code)) {
      const lists = this.matchedView.ul.querySelectorAll("li");
      if (code === "ArrowDown") {
        this.matchedView.curserIndex += 1;

        if (this.matchedView.curserIndex === lists.length)
          this.matchedView.curserIndex = 0;
        lists.forEach(list => list.classList.remove("activated"));
        lists[this.matchedView.curserIndex].classList.add("activated");
      }

      if (code === "ArrowUp") {
        this.matchedView.curserIndex -= 1;
        if (this.matchedView.curserIndex === -1)
          this.matchedView.curserIndex = lists.length - 1;
        lists.forEach(list => list.classList.remove("activated"));
        lists[this.matchedView.curserIndex].classList.add("activated");
        // this.matchedView.curserIndex--;
      }
    }
  }
}

export default SearchController;
