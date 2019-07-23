class HistoryView {
  constructor({ historyUl }) {
    this.ul = document.querySelector(historyUl);
    this.liTemplates = undefined;
  }
  render(data) {
    if (data.length === 0) return; // 빈화면 생겨서 임시로 넣음 ul태그에 render가 실행됨.

    this.initializeTemplate();
    let historys = data.reverse();
    historys = historys.slice(0,5); //  immutable 연습하기 splice나 spread operator를 이용해서 만들 수 있지만 이렇게 해도 되지않나?
    this.liTemplates = historys.reduce((accum, cur) => {
      accum += `<li class="results">${cur}</li>`;
      return accum;
    }, "");
    this.ul.insertAdjacentHTML("afterbegin", this.liTemplates);
    this.ul.classList.add("render");
  }

  initializeTemplate(){
    if (this.liTemplates) {
      while (this.ul.firstElementChild) {
        this.ul.removeChild(this.ul.firstElementChild);
      }
    }
  }

  hide() {
    this.ul.classList.remove("render");
    console.log("HistoryView의 hide 함수 실행! 가려저라 얍");
  }
}

export default HistoryView;
