class InputView {
  constructor({input,submitBtn}){
    this.input = document.querySelector(input);
    this.btn = document.querySelector(submitBtn);
  }

  render(value){
    this.input.value = value;
  }
}

export default InputView;