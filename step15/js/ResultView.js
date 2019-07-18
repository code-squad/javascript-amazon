class ResultView {
  constructor({ resultView }) {
    this.config = resultView;
    this.init();
  }

  init() {
    this.resultEl = document.querySelector(this.config.resultEl);
  }

  renderSuggestions({ query, suggesions }) {
    this.resultEl.innerHTML = '';
    this.resultEl.style.display = 'block';
    if (suggesions.length === 0) {
      this.resultEl.insertAdjacentHTML(
        'afterbegin',
        `<li class="${this.config.resultItem}">검색결과가 없습니다</li>`,
      );
    } else {
      this.resultEl.insertAdjacentHTML(
        'afterbegin',
        this.makeTemplate(query, suggesions),
      );
    }
  }

  makeTemplate(query, suggesions) {
    const pattern = new RegExp(`${query}`, 'i');
    return suggesions
      .map(suggesion => {
        const match = pattern.exec(suggesion);
        const hilghtedSuggestion = suggesion.replace(
          match,
          this.highlight(match),
        );
        return `<li class="${this.config.resultItem}" tabindex=1>${hilghtedSuggestion}</li>`;
      })
      .reduce((prev, curr) => {
        return prev + curr;
      });
  }

  highlight(value) {
    return `<span class=${this.config.resultItemHighlighted}>${value}</span>`;
  }
}

export default ResultView;
