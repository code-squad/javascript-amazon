class Header {
  constructor(texts) {
    this.texts = texts;
  }

  render() {
    const header = this.texts.reduce(
      (result, text) => (result += `<li class="header-text">${text}</li>`),
      ""
    );
    return `<ul class="header-wrapper">${header}</ul>`;
  }
}
