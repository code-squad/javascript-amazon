class InputView {
  constructor({inputDiv,submitBtn}){
    this.div = document.querySelector(inputDiv);
    this.btn = document.querySelector(submitBtn);
  }

  render(value){
    this.div.value = value;
  }
}

export default InputView;