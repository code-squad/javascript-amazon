import sleep from "./sleep.js";

class SearchController {
  constructor({ inputView, matchedView, historyView, searchModel }) {
    this.inputView = inputView;
    this.matchedView = matchedView;
    this.historyView = historyView;
    this.searchModel = searchModel;
    this.initService();
  }

  initService() {
    this.inputView.inputHandler = this.inputViewInputHandler.bind(this);
    this.inputView.keyDownHandler = this.inputViewKeyDownHandler.bind(this);
    this.inputView.clickHandler = this.inputViewClickHandler.bind(this);
    this.matchedView.mousedownHandler = this.matchedViewMouseDownHandler
    this.matchedView.mouseoverHandler = this.matchedViewMouseOverHandler
  }

  async inputViewInputHandler(inputValue) {
    this.matchedView.curserIndex = -1;
    await sleep(300);

    // await이 필요한가? 당연히 필요하다. getData가 return 하기전까지 pending상태의 Promise가 반환될것 
    // 아래 render함수를 matchedData.then으로 처리하면 되게 만들수는 있음. 그래서 typeError가 났던것 
    const matchedData =   await this.searchModel.getData(inputValue);
    if (matchedData === undefined) {
      this.matchedView.hide();
      const historys = this.searchModel.historyQueue;
      this.historyView.render(historys);
      return;
    }
    this.historyView.hide();
    await this.matchedView.render(matchedData, inputValue);
  }

  inputViewKeyDownHandler(e) {
    // view가 matched인지, history인지 파악하여 history에서도 keydown 적용하기 필요
    const { code } = e;
    const lists = this.matchedView.ul.querySelectorAll("li");

    if (!["ArrowDown", "ArrowUp", "Enter"].includes(code)) return;

    if (["ArrowDown", "ArrowUp"].includes(code)) {
      this.changeMatchedViewIdxInfinite(code, lists);
      const fetchedValue = this.matchedView.getCurseredValue();
      this.inputView.render(fetchedValue);
      this.curserEffect(lists);
      return;
    }

    if (code === "Enter") {
      e.preventDefault();
      const fetchedValue = this.matchedView.getCurseredValue();
      this.inputView.render(fetchedValue);
      this.searchModel.save(fetchedValue);
      this.matchedView.hide();
      this.matchedView.curserIndex = -1;
    }
  }

  changeMatchedViewIdxInfinite(code, lists) {
    const [changedIdx, endIdx, initialIdx] =
      code === "ArrowDown" ? [1, lists.length, 0] : [-1, -1, lists.length - 1];
    this.matchedView.curserIndex += changedIdx;
    if (this.matchedView.curserIndex === endIdx) {
      this.matchedView.curserIndex = initialIdx;
    }
  }

  curserEffect(lists) {
    lists.forEach(list => list.classList.remove("cursered"));
    lists[this.matchedView.curserIndex].classList.add("cursered");
  }

  inputViewClickHandler(e) {
    e.preventDefault();
    // inputViewKeyDownHandler의 enter 이벤트와 중복 함수로 처리할것
    const fetchedValue = this.matchedView.getCurseredValue();
    this.searchModel.save(fetchedValue);
    this.inputView.render(fetchedValue);
    this.matchedView.hide();
    this.matchedView.curserIndex = -1;
  }

  matchedViewMouseDownHandler = ({ target: { innerText } }) => {
    const fetchedValue = innerText;
    this.searchModel.save(fetchedValue);
    this.inputView.render(fetchedValue);
    this.matchedView.hide();
    this.matchedView.curserIndex = -1; // initialize index;
  };

  matchedViewMouseOverHandler = ({
    target: {
      innerText,
      dataset: { idx }
    }
  }) => {
    const fetchedValue = innerText;
    const lists = this.matchedView.ul.querySelectorAll("li");
    lists.forEach(list => list.classList.remove("cursered"));
    lists[idx].classList.add("cursered");
    this.inputView.render(fetchedValue);
  };

}

export default SearchController;
