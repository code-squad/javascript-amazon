class Button {
    constructor(buttonData, numOfCards) {
        this.buttonData = buttonData;
        this.numOfCards = numOfCards;
    }

    render() {
        const buttons = this.buttonData.reduce(
            (result, data, index) =>
                (result += `<button class=${"button" +
                    (index + 1)}>${data}</button>`),
            ""
        );
        return `${buttons}`;
    }

    attachEvent() {
        const cardList = $(".card-list");
        const [prev, next] = $$(".button1, .button2");

        let currentCardIdx = 0;

        prev.addEventListener("click", () => {
            if (currentCardIdx > 0) {
                currentCardIdx -= 1;
                cardList.style.transform =
                    "translateX(" +
                    `${currentCardIdx * -(100 / this.numOfCards)}%` +
                    ")";
            }
        });

        next.addEventListener("click", () => {
            if (currentCardIdx < this.numOfCards - 1) {
                currentCardIdx += 1;
                cardList.style.transform =
                    "translateX(" +
                    `${currentCardIdx * -(100 / this.numOfCards)}%` +
                    ")";
            }
        });
    }
}
