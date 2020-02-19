import Button from "./button.js";
import Card from "./card.js";
import Header from "./header.js";
import { URL } from "./constants.js";
import sliderCSS from "./slider.css";
import resetCSS from "./reset.css";

class Slider {
    constructor() {
        this.header = null;
        this.card = null;
        this.buttons = null;
        this.cardData = null;
    }

    setCardData({ headerData, headerCardLength, cardData, buttonData }) {
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

    doesCardDataExist() {
        return this.cardData !== null;
    }

    fetchCardData() {
        return fetch(URL.SERVER)
            .then(response => response.json())
            .then(cardData => {
                this.cardData = cardData;
                return cardData;
            });
    }
}

export default Slider;
