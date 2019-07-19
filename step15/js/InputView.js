import { inputView as config } from './config.js';

class InputView {
  constructor() {
    this.inputEl = document.querySelector(config.inputEl);
  }
}

export default InputView;
