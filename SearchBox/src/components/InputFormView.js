class InputFormView {
  constructor() {
    this.currentIndex = -1;
    this.previousIndex = undefined;
    this.initialValue = undefined;
    this.items = [];
  }

  reset() {
    this.previousIndex = undefined;
    this.currentIndex = -1;
    this.initialValue = document.querySelector("#inputBox").value;
  }

  setTargetList({ currentTargetList }) {
    this.items = currentTargetList.querySelectorAll("li");
  }

  move({ keyCode }) {
    const direction = keyCode === 38 ? "up" : "down";
    this.previousIndex = this.currentIndex;
    this.currentIndex += direction === "up" ? -1 : 1;
    switch (this.currentIndex) {
      case -2:
        this.currentIndex = this.items.length - 1;
        break;
      case this.items.length:
        this.currentIndex = -1;
        break;
    }
  }
  toggleStyleOfTarget() {
    if (this.previousIndex !== -1) {
      const previousTarget = this.items[this.previousIndex];
      previousTarget.style.background = "none";
    }

    if (this.currentIndex !== -1) {
      const currentTarget = this.items[this.currentIndex];
      currentTarget.style.background = "grey";
    }
  }

  updateInputValue() {
    const inputBox = document.querySelector("#inputBox");
    if (this.currentIndex === -1) {
      inputBox.value = this.initialValue;
      return;
    }
    inputBox.value = this.items[this.currentIndex].innerText;
  }
}

export default InputFormView;
