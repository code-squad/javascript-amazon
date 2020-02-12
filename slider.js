class Slider {
    constructor({ navData, cardData, buttonData }) {
        this.navigation = new Navigation(navData, cardData.length);
        this.card = new Card(cardData);
        this.buttons = new Button(buttonData, cardData.length);
    }

    render() {
        return `
        ${this.navigation.render()}
        ${this.card.render()}
        ${this.buttons.render()}
        `;
    }

    attachEvent() {
        this.navigation.attachEvent();
        this.buttons.attachEvent();
    }
}
