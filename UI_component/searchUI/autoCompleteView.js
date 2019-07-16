class AutoCompleteView {
  constructor(inputTag) {
    this.modal = document.querySelector(inputTag);
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

  removeChildAll() {
    while (this.modal.hasChildNodes()) {
      this.modal.removeChild(this.modal.firstChild);
    }
  }

  makeliTemplate(list) {
    let newEl, textEl;
    this.removeChildAll();

    list.forEach(el => {
      newEl = document.createElement("li");
      textEl = document.createTextNode(el);
      newEl.appendChild(textEl);
      this.modal.append(newEl);
    });

    this.showModalWindow();
    this.setAttribute();
    this.initHighlight();
  }

  setAttribute() {
    const arr = this.modal.children;

    const _arr = [...arr];

    _arr.forEach((v, i) => {
      _arr[i].setAttribute("autoIndex", i);
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
    let lastIndex = lastItem.getAttribute("autoindex");
    lastIndex = Number(lastIndex);

    if (this.currentHighlightIndex === -1) {
      this.currentHighlightIndex += 1;

      if (keyCode === "ArrowDown") {
        this.modal.children[this.currentHighlightIndex].classList.add(
          "highlight"
        );
        this.modal.children[this.currentHighlightIndex].style.backgroundColor =
          "yellow";
      }
    } else if (this.currentHighlightIndex === lastIndex) {
      if (keyCode === "ArrowUp") {
        this.modal.children[this.currentHighlightIndex].classList.remove(
          "highlight"
        );
        this.modal.children[this.currentHighlightIndex].style.backgroundColor =
          "lightblue";
        this.currentHighlightIndex -= 1;
        this.modal.children[this.currentHighlightIndex].classList.add(
          "highlight"
        );
        this.modal.children[this.currentHighlightIndex].style.backgroundColor =
          "yellow";
      }
    } else {
      if (keyCode === "ArrowDown") {
        this.modal.children[this.currentHighlightIndex].classList.remove(
          "highlight"
        );
        this.modal.children[this.currentHighlightIndex].style.backgroundColor =
          "lightblue";
        this.currentHighlightIndex += 1;
        this.modal.children[this.currentHighlightIndex].classList.add(
          "highlight"
        );
        this.modal.children[this.currentHighlightIndex].style.backgroundColor =
          "yellow";
      } else if (keyCode === "ArrowUp") {
        this.modal.children[this.currentHighlightIndex].classList.remove(
          "highlight"
        );
        this.modal.children[this.currentHighlightIndex].style.backgroundColor =
          "lightblue";
        this.currentHighlightIndex -= 1;
        this.modal.children[this.currentHighlightIndex].classList.add(
          "highlight"
        );
        this.modal.children[this.currentHighlightIndex].style.backgroundColor =
          "yellow";
      }
    }
  }
}

export default AutoCompleteView;
