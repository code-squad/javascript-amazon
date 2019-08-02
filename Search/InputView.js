class InputView {
  constructor({ input, submitBtn }) {
    this.input = document.querySelector(input);
    this.btn = document.querySelector(submitBtn);
    this.inputHandler = null;
    this.keyDownHandler = null;
    this.clickHandler = null;
    this.initEvents();
  }

  initEvents() {
    this.input.addEventListener("input", ({ target: { value } }) =>
      this.inputHandler(value)
    );

    this.input.addEventListener("keydown", e => this.keyDownHandler(e));

    this.btn.addEventListener("click", e => {
      this.clickHandler(e);
    });
  }

  render(value) {
    this.input.value = value;
  }
}

export default InputView;
