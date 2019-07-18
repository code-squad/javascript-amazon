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

  async inputViewInputHandler(value) {
    await sleep(300);
    const matchedData = await this.searchModel.find(value);
    console.log("matchedData", matchedData);
    await this.matchedView.render(matchedData);
  }

  inputViewKeyDownHandler(code) {
    // const curIdx = this.matchedView.curIdx;
    // const prevIdx = this.matchedView.prevIdx;
    const curLi = this.matchedView.ul.querySelectorAll("li")[this.matchedView.curIdx];
    

    if (code === "ArrowDown") {
      console.log("연산전 prevIdx:",this.matchedView.prevIdx, "curIdx:",this.matchedView.curIdx);

      // debugger
      if (this.matchedView.prevIdx !== undefined) {
        // debugger
        const prevLi = this.matchedView.ul.querySelectorAll("li")[this.matchedView.prevIdx];
        prevLi.style.backgroundColor = "#fff";
      }
      this.matchedView.prevIdx = this.matchedView.curIdx;
      this.matchedView.curIdx++;
      curLi.style.backgroundColor = "rgb(241, 242, 246)";


      console.log("연산후 prevIdx:",this.matchedView.prevIdx, "curIdx:",this.matchedView.curIdx);
    }

    if (code === "ArrowUp") {
      console.log("연산전 prevIdx:",this.matchedView.prevIdx, "curIdx:",this.matchedView.curIdx);

      // debugger
      if (this.matchedView.prevIdx !== undefined) {
        const prevLi = this.matchedView.ul.querySelectorAll("li")[this.matchedView.prevIdx];
        prevLi.style.backgroundColor = "#fff";
      }
      this.matchedView.prevIdx = this.matchedView.curIdx;
      this.matchedView.curIdx--;

      curLi.style.backgroundColor = "rgb(241, 242, 246)";
      console.log("연산후 prevIdx:",this.matchedView.prevIdx, "curIdx:",this.matchedView.curIdx);
    }

  }
}

export default SearchController;
