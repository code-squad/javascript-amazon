import { controller as config } from './config.js';
import { debounce } from '../../../PLib/index.js';

class Controller {
  constructor() {
    this.inputEl = document.querySelector(config.inputEl);
    this.resultEl = document.querySelector(config.resultEl);
    this.handelSuggestions = debounce(
      this.handelSuggestions.bind(this),
      config.debounceDelay
    );
    this.attatchEvent();
  }

  attatchEvent() {
    this.inputEl.addEventListener('keyup', e => this.doByInputKeyUp(e));

    this.inputEl.addEventListener('keydown', e => this.doByInputKeyDown(e));

    this.inputEl.addEventListener('focus', _ => {
      // 현재 검색결과가 있을 경우 예외처리
      if (this.inputView.onSelect || this.resultEl.children) return;
      this.resultView.renderRecentQuery(Array.from(this.model.recentQueryList));
    });

    this.resultEl.addEventListener('click', e => {
      // ul 영역을 클릭했을 경우 예외처리
      if (e.target === this.resultEl) return;
      const suggestion = e.target.closest(`.${config.resultItem}`).dataset
        .value;
      this.model.addRecentQuery(suggestion);
    });
  }

  doByInputKeyUp(e) {
    switch (true) {
      case e.key === 'ArrowDown' || e.key === 'ArrowUp':
        break;

      case e.key === 'Enter':
        this.model.addRecentQuery(e.target.value);
        break;

      default:
        this.handelSuggestions(e.target.value);
    }
  }

  doByInputKeyDown(e) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      this.inputView.navigate(this.resultEl, e.key);
    }
  }

  handelSuggestions(query) {
    // inputView 상태 초기화
    this.inputView.onSelect = null;
    if (query.trim() === '') {
      const getRecentQueryList = this.model.getRecentQueryList();
      this.resultView.renderRecentQuery(getRecentQueryList);
    } else {
      const { suggesionData } = this.model;
      suggesionData.then(data => {
        this.resultView.renderSuggestion(data, query);
      });
    }
  }
}

export default Controller;
