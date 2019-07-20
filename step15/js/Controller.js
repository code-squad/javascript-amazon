import { controller as config } from './config.js';
import { debounce } from '../../PLib/index.js';

const { delay } = config;

class Controller {
  constructor() {
    this.inputEl = document.querySelector(config.inputEl);
    this.resultEl = document.querySelector(config.resultEl);
    this.handelSuggestions = debounce(this.handelSuggestions.bind(this), delay);
    this.attatchEvent();
  }

  attatchEvent() {
    this.inputEl.addEventListener('keyup', e => {
      this.doByInputKeyUp(e);
    });

    this.inputEl.addEventListener('keydown', e => {
      this.doByInputKeyDown(e);
    });

    this.inputEl.addEventListener('focus', _ => {
      if (this.inputView.onSelect) return;
      this.resultView.renderRecentQuery(Array.from(this.model.recentQueryList));
    });
  }

  doByInputKeyUp(e) {
    // e.preventDefault();
    switch (true) {
      // down arrow
      // up arrow
      case e.key === 'ArrowDown' || e.key === 'ArrowUp':
        break;
      // enters
      case e.key === 'Enter':
        this.model.addRecentQuery(e.target.value);
        break;

      default:
        this.handelSuggestions(e.target.value);
    }
  }

  doByInputKeyDown(e) {
    // e.preventDefault();
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp')
      this.inputView.navigate(this.resultEl, e.key);
  }

  handelSuggestions(query) {
    // inputView 상태 초기화
    this.inputView.onSelect = null;
    const { suggesionData, recentQueryList } = this.model;
    if (query.trim() === '')
      this.resultView.renderRecentQuery(Array.from(recentQueryList));
    else {
      suggesionData.then(data => {
        this.resultView.renderSuggestion(data, query);
      });
    }
  }
}

export default Controller;
