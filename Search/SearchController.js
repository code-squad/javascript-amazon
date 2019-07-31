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
    this.inputView.input.addEventListener("input", ({ target: { value } }) =>
      this.inputViewInputHandler(value)
    );

    this.inputView.input.addEventListener("keydown", e =>
      this.inputViewKeyDownHandler(e)
    );

    this.inputView.btn.addEventListener("click", e => {
      e.preventDefault();
      // inputViewKeyDownHandler의 enter 이벤트와 중복 함수로 처리할것
      const fetchedValue = this.matchedView.findCurseredValue();
      this.searchModel.save(fetchedValue);
      this.inputView.render(fetchedValue);
      //
      this.matchedView.hide();
      this.matchedView.curserIndex = -1;
    });
    // event 버블링으로 미리 등록
    this.matchedView.ul.addEventListener(
      "mousedown",
      ({ target: { innerText } }) => {
        const fetchedValue = innerText;
        this.searchModel.save(fetchedValue);
        this.inputView.render(fetchedValue);
        this.matchedView.hide();
        this.matchedView.curserIndex = -1; // initialize index;
      }
    );

    this.matchedView.ul.addEventListener(
      "mouseover",
      ({ target: { innerText } }) => {
        const fetchedValue = innerText;
        const lists = this.matchedView.ul.querySelectorAll("li");
        lists.forEach(list => list.classList.remove("cursered"));
        lists[e.target.dataset.idx].classList.add("cursered");
        this.inputView.render(fetchedValue);
      }
    );
  }

  async inputViewInputHandler(inputValue) {
    // 새로운 검색이 생길때마다 인덱스 초기화
    this.matchedView.curserIndex = -1;
    await sleep(300);

    const matchedData = await this.searchModel.getData(inputValue);
    console.log("matchedData", matchedData);
    if (matchedData === undefined) {
      // await 필요한가? 실험해보니 필요 없음.
      this.matchedView.hide();
      const historys = this.searchModel.historyQueue;
      this.historyView.render(historys);
      return;
    }
    this.historyView.hide();
    await this.matchedView.render(matchedData, inputValue);
  }

  changeIdxInfinite(code, lists) {
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

  inputViewKeyDownHandler(e) {
    // view가 matched인지, history인지 파악하여 history에서도 keydown 적용하기 필요
    const { code } = e;
    const lists = this.matchedView.ul.querySelectorAll("li");

    if (!["ArrowDown", "ArrowUp", "Enter"].includes(code)) return;

    if (["ArrowDown", "ArrowUp"].includes(code)) {
      this.changeIdxInfinite(code, lists);
      const fetchedValue = this.matchedView.findCurseredValue();
      this.inputView.render(fetchedValue);
      this.curserEffect(lists);
      return;
    }

    // 이건 여기 왜 있는거지...? 엔터는 바로 일어나서 여기있는것같긴한데 리팩토링 가능한가?
    if (code === "Enter") {
      e.preventDefault();
      const fetchedValue = this.matchedView.findCurseredValue();
      this.inputView.render(fetchedValue);
      this.searchModel.save(fetchedValue);
      this.matchedView.hide();
      // initialize index;
      this.matchedView.curserIndex = -1;
    }
  }
}

export default SearchController;
