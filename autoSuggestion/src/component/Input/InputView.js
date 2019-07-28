import config from '../../js/config.js';
import { throttle } from '../../../../PLib/index.js';

class InputView {
  constructor() {
    this.inputEl = document.querySelector(config.inputEl);
    this.keyboardNavigate = throttle(
      this.keyboardNavigate.bind(this),
      config.throttleDelay
    );
  }

  mouseNavigate(target) {
    const { onSelect } = config;
    if (this.onSelect) this.onSelect.classList.remove(onSelect);
    this.onSelect = target.closest(`.${config.resultItem}`);
    this.inputEl.value = this.onSelect.dataset.value;
    this.onSelect.classList.add(onSelect);
  }

  keyboardNavigate(resultEl, direction) {
    const firstNode = resultEl.firstElementChild;
    const lastNode = resultEl.lastElementChild;
    const { onSelect } = config;
    if (this.isNoResultItem(firstNode)) return;

    if (this.onSelect) this.onSelect.classList.remove(onSelect);
    this.onSelect = this.getNextOnSelectEl(direction, firstNode, lastNode);
    this.onSelect.classList.add(onSelect);
    this.inputEl.value = this.onSelect.dataset.value;
  }

  getNextOnSelectEl(direction, firstNode, lastNode) {
    if (!this.onSelect) {
      return direction === 'ArrowDown' ? firstNode : lastNode;
    }

    if (direction === 'ArrowDown') {
      return this.onSelect === lastNode
        ? firstNode
        : this.onSelect.nextElementSibling;
    }
    if (direction === 'ArrowUp') {
      return this.onSelect === firstNode
        ? lastNode
        : this.onSelect.previousElementSibling;
    }
  }

  isNoResultItem(target) {
    return target.classList.contains(`${config.noResultItem}`);
  }

  clearOnSelect() {
    if (this.onSelect) {
      this.onSelect.classList.remove('onSelect');
      this.onSelect = null;
    }
  }
}

export default InputView;
