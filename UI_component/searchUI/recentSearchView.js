class RecentSearchView {
  constructor(inputTag) {
    this.modal = document.querySelector(inputTag);
    this.recentKeyword = [];
    this.notify;
    this.currentHighlightIndex;
  }

  init(func) {
    this.notify = func;
    this.currentHighlightIndex = -1;
  }

  showModalWindow() {
    this.modal.style.display = `block`;
  }

  hideModalWindow() {
    this.modal.style.display = `none`;
  }

  saveRecentKeyword(inputValue) {
    const maxLength = 5;

    if (
      this.recentKeyword.length === maxLength ||
      this.recentKeyword.length > maxLength
    ) {
      this.recentKeyword.pop();
    }

    this.recentKeyword.unshift(inputValue);
    this.notify();
  }

  removeChildAll() {
    while (this.modal.hasChildNodes()) {
      this.modal.removeChild(this.modal.firstChild);
    }
  }

  makeliTemplate() {
    let newEl, textEl;
    let list = [...this.recentKeyword];
    this.removeChildAll();

    if (list.length === 0) {
      newEl = document.createElement("li");
      textEl = document.createTextNode(`최근 검색어 없음`);
      newEl.appendChild(textEl);
      this.modal.append(newEl);
    } else {
      list.forEach(el => {
        newEl = document.createElement("li");
        textEl = document.createTextNode(el);
        newEl.appendChild(textEl);
        this.modal.append(newEl);
      });
    }

    this.showModalWindow();
    this.setAttribute();
    this.initHighlight();
  }

  setAttribute() {
    const arr = this.modal.children;

    const _arr = [...arr];

    _arr.forEach((v, i) => {
      _arr[i].setAttribute("recentIndex", i);
    });
  }

  initHighlight() {
    const modal = this.modal;
    const firstChild = modal.firstChild;

    firstChild.classList.add("highlight");
    this.currentHighlightIndex = -1;
  }

  submitAutoCompleteData() {
    this.hideModalWindow();
    this.currentHighlightIndex = -1;

    let arr = [...this.modal.children];
    let target;
    arr.forEach(el => {
      if (el.classList.contains("highlight")) {
        target = el;
      }
    });

    let targetText = target.innerHTML;
    this.notify(targetText);
  }

  updateHighlight(keyCode) {
    if (keyCode === "Enter") {
      this.submitAutoCompleteData();
      return;
    }
    const lastItem = this.modal.lastChild;
    let lastIndex = lastItem.getAttribute("recentIndex");
    lastIndex = Number(lastIndex);

    if (this.currentHighlightIndex === -1) {
      this.currentHighlightIndex += 1;

      if (keyCode === "ArrowDown") {
        this.modal.children[this.currentHighlightIndex].classList.add(
          "highlight"
        );
        this.modal.children[this.currentHighlightIndex].style.backgroundColor =
          "#EEEEEE";
      }
    } else if (this.currentHighlightIndex === lastIndex) {
      if (keyCode === "ArrowUp") {
        this.modal.children[this.currentHighlightIndex].classList.remove(
          "highlight"
        );
        this.modal.children[this.currentHighlightIndex].style.backgroundColor =
          "white";
        this.currentHighlightIndex -= 1;
        this.modal.children[this.currentHighlightIndex].classList.add(
          "highlight"
        );
        this.modal.children[this.currentHighlightIndex].style.backgroundColor =
          "#EEEEEE";
      }
    } else {
      if (keyCode === "ArrowDown") {
        this.modal.children[this.currentHighlightIndex].classList.remove(
          "highlight"
        );
        this.modal.children[this.currentHighlightIndex].style.backgroundColor =
          "white";
        this.currentHighlightIndex += 1;
        this.modal.children[this.currentHighlightIndex].classList.add(
          "highlight"
        );
        this.modal.children[this.currentHighlightIndex].style.backgroundColor =
          "#EEEEEE";
      } else if (keyCode === "ArrowUp") {
        this.modal.children[this.currentHighlightIndex].classList.remove(
          "highlight"
        );
        this.modal.children[this.currentHighlightIndex].style.backgroundColor =
          "white";
        this.currentHighlightIndex -= 1;
        this.modal.children[this.currentHighlightIndex].classList.add(
          "highlight"
        );
        this.modal.children[this.currentHighlightIndex].style.backgroundColor =
          "#EEEEEE";
      }
    }
  }
}

export default RecentSearchView;
