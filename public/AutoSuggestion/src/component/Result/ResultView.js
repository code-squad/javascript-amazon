import config from '../../js/config.js';

class ResultView {
  constructor(viewRenderer) {
    this.resultEl = document.querySelector(config.resultEl);
    this.viewRenderer = viewRenderer;
  }

  renderRecentQuery(dataSrc) {
    this.resultEl.innerHTML = '';
    this.resultEl.style.display = 'block';
    const template =
      dataSrc.length === 0
        ? this.viewRenderer.noResultRecentQueryTemplate(config)
        : this.viewRenderer.recentQueryTemplate(dataSrc, config);
    this.resultEl.insertAdjacentHTML('afterbegin', template);
  }

  renderSuggestion(dataSrc, query) {
    this.resultEl.innerHTML = '';
    this.resultEl.style.display = 'block';
    let template;
    if (!dataSrc) {
      template = this.viewRenderer.noResultSuggestionTemplate(config);
    } else {
      const suggestions = this.viewRenderer.getAutoSuggesionList(dataSrc);
      template = this.viewRenderer.suggestionTemplate(
        query,
        suggestions,
        config
      );
    }
    this.resultEl.insertAdjacentHTML('afterbegin', template);
  }

  hide() {
    this.resultEl.style.display = 'none';
  }
}

export default ResultView;
