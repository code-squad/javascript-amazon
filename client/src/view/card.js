import css from "./card.css";

class Card {
    constructor(cardData) {
        this.cardData = cardData;
        this.cardIndex = 1;
    }

    sortByCategory(categoryList) {
        const sort = (category) =>  this.cardData
            .filter(data => data.category === category)
            .reduce((result, data) => (result += `<li class="card ${this.cardIndex === 1 ? "selected-card" : ""}" id=card-${this.cardIndex++}>
                                                    <div class="card-copy">
                                                        <span class="card-category ${data.category}">
                                                            ${data.cardCategory}
                                                        </span>
                                                        <div class="card-headline">
                                                            ${data.cardHeadline}
                                                        </div>
                                                        <div class="card-body">
                                                            ${data.cardBody}
                                                        </div>
                                                        <a class="card-cta">
                                                            ${data.cardCta}
                                                        </a>
                                                    </div>
                                                </li>`), "")

        return categoryList.map(category => sort(category))
    }

    render() {
        const [shipList, streamList, shopList, readList, moreList ] = this.sortByCategory(["ship", "stream", "shop", "read", "more"]);

        return `<div class="card-block"><ul class="card-wrapper">${shopList}${readList}${moreList}${shipList}${streamList}</ul></div>`;
    }
}

export default Card;