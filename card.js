class Card {
    constructor(cardData) {
        this.cardData = cardData;
        this.idIndex = 1;
    }

    sortByCategory(category) {
        return this.cardData
            .filter(data => data.category === category)
            .reduce((result, data) => (result += `<li class="card ${this.idIndex === 1 ? "selected-card" : ""}" id=card-${this.idIndex++}><div class="card-copy"><span class="card-category ${data.category}">${data.cardCategory}</span><div class="card-headline">${data.cardHeadline}</div><div class="card-body">${data.cardBody}</div><a class="card-cta">${data.cardCta}</a></div></li>`), "")

    }

    render() {
        const shipList = this.sortByCategory("ship");
        const streamList = this.sortByCategory("stream");
        const shopList = this.sortByCategory("shop");
        const readList = this.sortByCategory("read");
        const moreList = this.sortByCategory("more");

        return `<div class="card-block"><ul class="card-wrapper">${shopList}${readList}${moreList}${shipList}${streamList}</ul></div>`;
    }
}
