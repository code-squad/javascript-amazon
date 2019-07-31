class HistoryView {
  constructor({ historyUl }) {
    this.ul = document.querySelector(historyUl);
    this.liTemplates = undefined;
  }
  render(data) {
    if (data.length === 0) return; // 빈화면 일때 처리

    this.initializeTemplate();
    let historys = data.reverse();
    historys = historys.slice(0, 5); //  immutable 연습하기 splice나 spread operator를 이용해서 만들 수 있지만 이렇게 해도 되지않나?
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
