class InputView {
  constructor({inputUl,submitBtn}){
    this.ul = document.querySelector(inputUl);
    this.btn = document.querySelector(submitBtn);
  }

  render(value){
    this.ul.value = value;
  }
}

export default InputView;