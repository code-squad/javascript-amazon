import sleep from "./sleep.js";

class SearchController {
  constructor({ inputView, matchedView, historyView, searchModel }) {
    this.inputView = inputView;
    this.matchedView = matchedView;
    this.historyView = historyView;
    this.searchModel = searchModel;
  }

  init() {
    this.registerEvents();
  }

  registerEvents() {
    this.inputView.ul.addEventListener("input", ({ target: { value } }) =>
      this.inputViewInputHandler(value)
    );
    this.inputView.ul.addEventListener("keydown", e =>
      this.inputViewKeyDownHandler(e)
    );
  }

  async inputViewInputHandler(inputValue) {
    await sleep(300);
    const matchedData = await this.searchModel.find(inputValue);
    console.log('matchedData',matchedData);
    if(matchedData === undefined  ){
      // matchedData가 있을땐 검색내역 보이도록 구현해야함.
      // await 필요한가?  --> 실험해보니 필요없더라 
      // const historys = this.searchModel.historyQueue 
      // this.historyView.render(historys);
      // return;
    }

    // console.log('Handler가  실행됩니다!',123)
    await this.matchedView.render(matchedData, inputValue);
  }

  inputViewKeyDownHandler(e) {
    const { code } = e;
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
      if (code === "Enter") {
        // 엔터키 입력시 inputView에 현재 위치의 검색어가 추가된다.
        const fetchedValue = this.matchedView.findCurseredValue();
        this.searchModel.save(fetchedValue);
        this.inputView.render(fetchedValue);  
        // 검색 결과창이 사라진다.
        this.matchedView.hide();
      }
    }
  }
}

export default SearchController;
