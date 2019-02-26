export default class CardsUI {
    constructor(cardsItemSelector) {
        this.cardsItems = document.querySelectorAll(cardsItemSelector);
    }

    init() {
        document.addEventListener("click", function (event) {
            const target = event.target.parentElement;
            this.removeSelected();
            if (target.matches('.cards-items')) {
                target.classList.add("selected")
            }
        }.bind(this), false);
    }

    removeSelected() {
        this.cardsItems.forEach(function (card) {
            if (card.classList.contains("selected")) card.classList.remove("selected")
        })
    }
}