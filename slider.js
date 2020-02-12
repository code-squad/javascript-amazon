class Slider {
    constructor({ navData, cardData, buttonData }) {
        this.navigation = new Navigation(navData, 1080);
        this.card = new Card(cardData);
        this.buttons = new Button(buttonData, 1080);
    }

    render() {
        return `
        ${this.navigation.render()}
        ${this.card.render()}
        ${this.buttons.render()}
        `;
    }

    attachEvent() {
        this.navigation.onClickEventHandler();
        this.buttons.onClickEventHandler();
    }
}
