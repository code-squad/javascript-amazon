import config from './config.js';
import { debounce } from '../../../PLib/index.js';

class Controller {
  constructor(model, inputView, resultView) {
    this.model = model;
    this.inputView = inputView;
    this.resultView = resultView;
    this.handelSuggestions = debounce(
      this.handelSuggestions.bind(this),
      config.debounceDelay
    );
    this.attatchEvent();
  }

  attatchEvent() {
    this.inputView.inputEl.addEventListener('keyup', e =>
      this.doByInputKeyUp(e)
    );

    this.inputView.inputEl.addEventListener('keydown', e =>
      this.doByInputKeyDown(e)
    );

    this.inputView.inputEl.addEventListener('focus', e => {
      this.inputFoucsHandler(e);
    });

    this.inputView.inputEl.addEventListener('blur', e => {
      e.preventDefault();
      this.resultView.hide();
    });

    this.resultView.resultEl.addEventListener('mouseover', e => {
      const { target } = e;
      // li 이외의 ul 영역을 클릭했을 경우 예외처리
      if (this.isWrongTargetClicked(target)) return;
      this.inputView.mouseNavigate(target);
    });

    this.resultView.resultEl.addEventListener('mouseout', _ =>
      this.inputView.clearOnSelect()
    );

    // click 이벤트 적용시 blur 보다 늦게 일어나기 때문에 mousedown 이벤트 적용
    this.resultView.resultEl.addEventListener('mousedown', e => {
      e.preventDefault();
      const { target } = e;
      // li 이외의 ul 영역을 클릭했을 경우 예외처리
      if (this.isWrongTargetClicked(target)) return;
      this.searchHandler(this.inputView.inputEl.value);
    });
  }

  isWrongTargetClicked(target) {
    return (
      target === this.resultView.resultEl ||
      target.closest(`.${config.noResultItem}`)
    );
  }

  isResultViewOpen() {
    return this.inputView.onSelect || this.resultView.resultEl.children.length;
  }

  isInputValueExist() {
    return Boolean(this.inputView.inputEl.value);
  }

  doByInputKeyUp({ key, target: { value } }) {
    switch (true) {
      case key === 'ArrowDown' || key === 'ArrowUp':
        break;

      case key === 'Enter':
        this.searchHandler(value);
        break;

      default:
        this.handelSuggestions(value);
    }
  }

  doByInputKeyDown(e) {
    const { key } = e;
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      e.preventDefault();
      this.inputView.keyboardNavigate(this.resultView.resultEl, key);
    }
  }

  searchHandler(value) {
    this.model.addRecentQuery(value);
    this.resultView.hide();
  }

  inputFoucsHandler({ target }) {
    // 검색어가 있는 상태에서 blur 했다가 다시 focuse 할 경우
    if (this.isInputValueExist()) this.handelSuggestions(target.value);
    // 현재 검색결과가 있을 경우 예외처리
    if (this.isResultViewOpen()) return;
    const recentQueryList = this.model.getRecentQueryList();
    this.resultView.renderRecentQuery(recentQueryList);
  }

  handelSuggestions(query) {
    // inputView 상태 초기화
    this.inputView.onSelect = null;
    if (query.trim() === '') {
      const recentQueryList = this.model.getRecentQueryList();
      this.resultView.renderRecentQuery(recentQueryList);
    } else {
      const suggesionData = this.getData(config.srcUrl, query);
      suggesionData.then(data => {
        this.resultView.renderSuggestion(data, query);
      });
    }
  }

  async getData(srcUrl, query) {
    try {
      const response = await fetch(srcUrl + query);
      const { statusCode, body } = await response.json();

      if (statusCode === 200) {
        const { suggestions } = body;
        return suggestions;
      }

      if (statusCode === 404) {
        throw new Error(body);
      }

      throw new Error(`error status code: ${statusCode}`);
    } catch (error) {
      console.warn(error);
      return false;
    }
  }
}

export default Controller;
