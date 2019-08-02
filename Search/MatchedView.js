class MatchedView {
  constructor({ matchedUl }) {
    this.ul = document.querySelector(matchedUl);
    this.liTemplates = undefined;
    this.curserIndex = -1;
    this.mousedownHandler = null;
    this.mouseoverHandler = null;
    this.initEvents();
  }

  initEvents() {
    this.ul.addEventListener("mousedown", e => this.mousedownHandler(e));
    this.ul.addEventListener("mouseover", e => this.mouseoverHandler(e));
  }

  render(data, inputValue) {
    if (data === undefined) {
      this.hide();
      return;
    }
    const {
      body: { suggestions }
    } = data;

    this.initializeTemplate();

    // 하이라이트 함수로 리팩토링 할것 , replace를 쓸지 slice를 쓸지 고민
    this.liTemplates = suggestions.reduce((accum, cur, idx) => {
      accum += `<li data-idx=${idx} class="results">${cur.value.replace(
        inputValue,
        `<b>${inputValue}</b>`
      )}</li>`;
      return accum;
    }, "");

    this.ul.insertAdjacentHTML("afterbegin", this.liTemplates);
    this.ul.classList.add("render");
  }

  hide() {
    this.ul.classList.remove("render");
  }

  initializeTemplate() {
    if (this.liTemplates) {
      while (this.ul.firstElementChild) {
        this.ul.removeChild(this.ul.firstElementChild);
      }
    }
  }

  getCurseredValue() {
    const lists = this.ul.querySelectorAll("li");
    return lists[this.curserIndex].innerText;
  }

  setCurseredIndex(idx){
    this.curserIndex = idx;
  }
}

export default MatchedView;
