class HistoryView {
  constructor({ historyUl }) {
    this.ul = document.querySelector(historyUl);
    this.liTemplates = undefined;
    this.showCount = 5;
  }

  render(data) {
    if (data.length === 0) return; // 빈화면 일때 처리

    this.initializeTemplate();
    let historys = data.reverse().slice(0, this.showCount);
    this.liTemplates = historys.reduce((accum, cur) => {
      accum += `<li class="results">${cur}</li>`;
      return accum;
    }, "");
    this.ul.insertAdjacentHTML("afterbegin", this.liTemplates);
    this.ul.classList.add("render");
  }

  hide() {
    this.ul.classList.remove("render");
  }

  initializeTemplate() {
    if (!this.liTemplates) return;

    while (this.ul.firstElementChild) {
      this.ul.removeChild(this.ul.firstElementChild);
    }
  }
}

export default HistoryView;
