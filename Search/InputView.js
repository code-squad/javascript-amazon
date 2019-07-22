class InputView {
  constructor({inputUl}){
    this.ul = document.querySelector(inputUl)
  }

  render(value){
    this.ul.value = value;
  }
}

export default InputView;