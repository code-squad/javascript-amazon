import { inputView as config } from './config.js';
import { throttle } from '../../../PLib/index.js';

class InputView {
  constructor() {
    this.inputEl = document.querySelector(config.inputEl);
    this.navigate = throttle(this.navigate.bind(this), config.throttleDelay);
  }

  navigate(resultEl, direction) {
    const first = resultEl.firstElementChild;
    const last = resultEl.lastElementChild;
    const { onSelect } = config;

    if (this.onSelect) {
      this.onSelect.classList.remove(onSelect);
      if (direction === 'ArrowDown') {
        this.onSelect =
          this.onSelect === last ? first : this.onSelect.nextElementSibling;
      }
      if (direction === 'ArrowUp') {
        this.onSelect =
          this.onSelect === first ? last : this.onSelect.previousElementSibling;
      }
    } else {
      if (direction === 'ArrowDown') this.onSelect = first;
      if (direction === 'ArrowUp') this.onSelect = last;
    }
    this.onSelect.classList.add(onSelect);
    this.inputEl.value = this.onSelect.dataset.value;
  }
}

export default InputView;
