import $ from "../../mylibrary.js";

class AutoCompleteView {
  constructor(inputTag) {
    this.modal = $(inputTag);
    this.notify;
    this.currentHighlightIndex;
    this.config = {
      attrName: "autoIndex",
      className: "highlight",
      unselectedColor: "white",
      selectedColor: "#EEEEEE"
    };
  }

  init(func) {
    this.notify = func;
    this.initHighlightIndex();
    this.hideModalWindow();
  }

  initHighlightIndex() {
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

  makeliTemplate(arr) {
    let newEl, textEl;

    arr.forEach(el => {
      newEl = document.createElement("li");
      textEl = document.createTextNode(el);
      newEl.appendChild(textEl);
      this.modal.append(newEl);
    });
  }

  setAttribute() {
    const arr = this.modal.children;

    const _arr = [...arr];

    _arr.forEach((v, i) => {
      _arr[i].setAttribute(this.config.attrName, i);
    });
  }

  initHighlight() {
    const modal = this.modal;
    const firstChild = modal.firstChild;

    firstChild.classList.add(this.config.className);
    this.initHighlightIndex();
  }

  makeModalContent(arr) {
    this.removeChildAll();
    this.makeliTemplate(arr);
    this.showModalWindow();
    this.setAttribute();
    this.initHighlight();
  }

  submitAutoCompleteData() {
    this.hideModalWindow();
    this.initHighlightIndex();

    let arr = [...this.modal.children];
    let target;
    arr.forEach(el => {
      if (el.classList.contains(this.config.className)) {
        target = el;
      }
    });

    let targetText = target.innerHTML;
    this.notify(targetText);
  }

  getLastIndex() {
    const lastItem = this.modal.lastChild;
    let lastIndex = lastItem.getAttribute(this.config.attrName);
    lastIndex = Number(lastIndex);
    return lastIndex;
  }

  addHighlight() {
    this.modal.children[this.currentHighlightIndex].classList.add(
      this.config.className
    );
    this.modal.children[
      this.currentHighlightIndex
    ].style.backgroundColor = this.config.selectedColor;
  }

  removeHighlight() {
    this.modal.children[this.currentHighlightIndex].classList.remove(
      this.config.className
    );
    this.modal.children[
      this.currentHighlightIndex
    ].style.backgroundColor = this.config.unselectedColor;
  }

  updateHighlight(keyCode) {
    if (keyCode === "Enter") {
      this.submitAutoCompleteData();
      return;
    }

    const lastIndex = this.getLastIndex();

    if (this.currentHighlightIndex === -1) {
      this.currentHighlightIndex += 1;

      if (keyCode === "ArrowDown") {
        this.addHighlight();
      }
    } else if (this.currentHighlightIndex === lastIndex) {
      if (keyCode === "ArrowUp") {
        this.removeHighlight();
        this.initHighlightIndex();
        this.addHighlight();
      }
    } else {
      if (keyCode === "ArrowDown") {
        this.removeHighlight();
        this.currentHighlightIndex += 1;
        this.addHighlight();
      } else if (keyCode === "ArrowUp") {
        this.removeHighlight();
        this.initHighlightIndex();
        this.addHighlight();
      }
    }
  }
}

export default AutoCompleteView;
