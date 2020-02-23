import css from "./card.scss";

class Card {
    constructor(cardData) {
        this.cardData = cardData;
        this.cardIndex = 1;
    }

    sortByCategoryAndReturnHTML(categoryList) {
        const sortByCategory = (category) =>  
            this.cardData
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

        return categoryList.map(category => sortByCategory(category))
    }

    render() {
        const [shipList, streamList, shopList, readList, moreList ] = this.sortByCategoryAndReturnHTML(["ship", "stream", "shop", "read", "more"]);

        return `<div class="card-block">
                    <ul class="card-wrapper">
                        ${shopList}${readList}${moreList}${shipList}${streamList}
                    </ul>
                </div>`;
    }
}

export default Card;