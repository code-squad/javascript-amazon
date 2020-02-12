class Card {
    constructor(cardData) {
        this.cardData = cardData;
    }

    makeCard({ imgSrc, title, content }, dummy) {
        const makeList = contentArr =>
            contentArr.reduce((list, item) => (list += `<li>${item}</li>`), "");
        return `<li class="card ${
            dummy ? dummy : ""
        }"><div class="card-image"><img src=${imgSrc}></div><div class="card-contents"><h4>${title}</h4><ul>${makeList(
            content
        )}</ul></div></li>`;
    }

    render() {
        const firstCardDummy = this.makeCard(this.cardData[0], "last");
        const lastCardDummy = this.makeCard(
            this.cardData[this.cardData.length - 1],
            "first"
        );
        const list = this.cardData.reduce(
            (list, content) => (list += this.makeCard(content)),
            ""
        );

        return `<div class="card-wrapper"><ul class="card-list">${lastCardDummy +
            list +
            firstCardDummy}</ul></div>`;
    }
}
