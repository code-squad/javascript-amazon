class ResultView {
  constructor({ resultView }) {
    this.config = resultView;
    this.init();
  }

  init() {
    this.resultEl = document.querySelector(this.config.resultEl);
  }

  renderSuggestions({ query, suggesions }) {
    this.resultEl.style.display = 'block';
    this.resultEl.innerHTML = '';
    this.resultEl.insertAdjacentHTML(
      'afterbegin',
      this.makeTemplate(query, suggesions),
    );
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
