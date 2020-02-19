import Button from "./button.js";
import Card from "./card.js";
import Header from "./header.js";
import { $, $$ } from "./util.js";

class Slider {
    constructor({ headerData, headerCardLength, cardData, buttonData }) {
        this.header = new Header(headerData, headerCardLength);
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

export default Slider;
