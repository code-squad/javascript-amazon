class InputView {
  constructor({ inputView }) {
    this.inputEl = document.querySelector(inputView.inputEl);
    this.init();
  }

  init() {
    this.attatchEvent();
  }

  attatchEvent() {
    this.inputEl.addEventListener('keyup', e => {
      this.doByInputKey(e);
    });
  }

  doByInputKey(e) {
    switch (e.keyCode) {
      case 40:
      case 38:
      case 18:
        break;
      default:
        this.model.updateSuggesions(e.target);
    }
  }
}

export default InputView;
