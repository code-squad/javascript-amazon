class Slider {
  constructor({ headerTexts, cardData }) {
    this.header = new Header(headerTexts);
    this.card = new Card(cardData);
  }

  render() {
    return `
        ${this.header.render()}
        ${this.card.render()}
        `;
  }
}
