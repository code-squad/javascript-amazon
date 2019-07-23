class MatchedView {
  constructor({ matchedUl }) {
    this.ul = document.querySelector(matchedUl);
    this.liTemplates = undefined;
    this.curserIndex = -1;
  }

  render(data, inputValue) {
    if (data === undefined) {
      // historyView 가 없는 경우에는 빈 화면이 나오도록 한다. 
      console.log(' matchedView의 render가 실행되고 suggestions가 없네요!',456  )
      this.hide();
      return;
    }
    const {
      body: { suggestions }
    } = data;

    if (this.liTemplates) {
      while (this.ul.firstElementChild) {
        this.ul.removeChild(this.ul.firstElementChild);
      }
    }
    // 하이라이트 함수로 리팩토링 할것 , replace를 쓸지 slice를 쓸지
    this.liTemplates = suggestions.reduce((accum, cur) => {
      accum += `<li class="suggestions">${cur.value.replace(
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

  findCurseredValue(){
    const lists = this.ul.querySelectorAll("li");
    return lists[this.curserIndex].innerText
  }
}

export default MatchedView;
