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
    this.inputView.ul.addEventListener("keydown", (e) =>
      this.inputViewKeyDownHandler(e)
    );
  }

  async inputViewInputHandler(inputValue) {
    await sleep(300);
    const matchedData = await this.searchModel.find(inputValue);
    console.log("matchedData", matchedData);
    await this.matchedView.render(matchedData,inputValue);
  }

  inputViewKeyDownHandler(e) {
    const {code} = e;
    if (["ArrowDown", "ArrowUp", "Enter"].includes(code)) {
      const lists = this.matchedView.ul.querySelectorAll("li");
      if (code === "ArrowDown") {
        this.matchedView.curserIndex += 1;

        if (this.matchedView.curserIndex === lists.length)
          this.matchedView.curserIndex = 0;
        lists.forEach(list => list.classList.remove("cursered"));
        lists[this.matchedView.curserIndex].classList.add("cursered");
      }

      if (code === "ArrowUp") {
        this.matchedView.curserIndex -= 1;
        if (this.matchedView.curserIndex === -1)
          this.matchedView.curserIndex = lists.length - 1;
        lists.forEach(list => list.classList.remove("cursered"));
        lists[this.matchedView.curserIndex].classList.add("cursered");
      }
      e.preventDefault();
      if( code === "Enter"){
        // 엔터키 입력시 inputView에 현재 위치의 검색어가 추가된다.
        const curseredValue = this.matchedView.findCurseredValue();
        this.inputView.render(curseredValue)
        // 검색 결과창이 사라진다. 
        this.matchedView.hide();
        
      }
    }
  }
}

export default SearchController;
