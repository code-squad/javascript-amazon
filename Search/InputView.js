class InputView {
  constructor({ input, submitBtn }) {
    this.input = document.querySelector(input);
    this.btn = document.querySelector(submitBtn);
    this.inputHandler = null;
    this.keyDownHandler = null;
    this.clickHandler = null;
    this.timer = null;
    this.initEvents();
  }

  initEvents() {
    this.input.addEventListener("input", ({ target: { value } }) =>{
      this.debounceInputHandler(value);
    });

    this.input.addEventListener("keydown", e => this.keyDownHandler(e));

    this.btn.addEventListener("click", e => {
      this.clickHandler(e);
    });
  }

  render(value) {
    this.input.value = value;
  }

  debounceInputHandler(value){
    if(this.timer){
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(()=>{this.inputHandler(value)},1200);
  }
}

export default InputView;
