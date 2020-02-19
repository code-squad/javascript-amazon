import Button from "./button.js";
import Card from "./card.js";
import Header from "./header.js";
import { URL } from "./constants.js";

class Slider {
    constructor({ headerData, headerCardLength, cardData, buttonData }) {
        this.header = new Header(headerData, headerCardLength);
        this.card = new Card(cardData);
        this.buttons = new Button(buttonData);
        console.log("this.header is ", this.header);
        console.log("this.card is ", this.card);
        console.log("this.buttons is", this.buttons);
    }

    render() {
        return `
        ${this.header.render()}
        ${this.card.render()}
        ${this.buttons.render()}
        `;
    }

    static getCardData() {
        return fetch(URL.SERVER).then(response => response.json()).then(cardData => cardData);
    }
}

export default Slider;
