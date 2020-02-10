class Slider {
  constructor({ headerTexts, cardData, buttonData }) {
    this.header = new Header(headerTexts);
    this.card = new Card(cardData);
    this.buttons = new Button(buttonData);
  }

  render() {
    return `
        ${this.header.render()}
        ${this.card.render()}
        ${this.buttons.render()}
        `;
  }
}
