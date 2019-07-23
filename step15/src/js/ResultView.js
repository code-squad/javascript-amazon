import { resultView as config } from './config.js';

class ResultView {
  constructor() {
    this.resultEl = document.querySelector(config.resultEl);
  }

  renderRecentQuery(dataSrc) {
    this.resultEl.innerHTML = '';
    this.resultEl.style.display = 'block';
    const template =
      dataSrc.length === 0
        ? config.noResultRecentQueryTemplate()
        : config.recentQueryTemplate(dataSrc);
    this.resultEl.insertAdjacentHTML('afterbegin', template);
  }

  renderSuggestion(dataSrc, query) {
    this.resultEl.innerHTML = '';
    this.resultEl.style.display = 'block';
    const suggestions = config.getAutoSuggesionList({
      dataSrc,
      query,
      config
    });
    const template =
      suggestions.length === 0
        ? config.noResultSuggestionTemplate()
        : config.suggestionTemplate(query, suggestions);
    this.resultEl.insertAdjacentHTML('afterbegin', template);
  }
}

export default ResultView;
