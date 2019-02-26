export default class CardsUI {
    constructor(cardsItemSelector, selectedCardClass) {
        this.cardsItems = document.querySelectorAll(cardsItemSelector);
        this.selectedClass = selectedCardClass;
    }

    init() {
        this.addEvent();
    }

    addEvent() {
        document.addEventListener("click", ((event) => {
            const target = event.target.parentElement;
            this.removeSelected();
            if (target.matches('.cards-items')) target.classList.add(this.selectedClass);
        }), false);
    }

    removeSelected() {
        this.cardsItems.forEach((card) => {
            if (card.classList.contains(this.selectedClass)) card.classList.remove(this.selectedClass);
        });
    }
}