class Button {
    constructor(buttonData, cardWidth) {
        this.buttonData = buttonData;
        this.cardWidth = cardWidth;
    }

    render() {
        const buttons = this.buttonData.reduce(
            (result, data, index) =>
                (result += `<button class=${
                    index === 0 ? "prev" : "next"
                }>${data}</button>`),
            ""
        );
        return `${buttons}`;
    }

    onClickEventHandler() {
        const cardList = $(".card-list");
        const cards = cardList.children;
        const navMenu = $$(".nav-menu");
        const btns = $$("button");

        let navIdx = 0;
        let cardIdx = 1;

        const updateNav = () => {
            navMenu.forEach(menu => menu.classList.remove("selected"));
            navMenu[navIdx].classList.add("selected");
        };

        const moveSlide = () => {
            cardList.style.transform =
                "translateX(" + `${-this.cardWidth * cardIdx}` + "px)";
        };

        const triggerAnimation = btn => {
            if (btn.parentElement.classList.contains("prev")) {
                cardIdx -= 1;
                navIdx = navIdx === 0 ? navMenu.length - 1 : navIdx - 1;
            } else {
                cardIdx += 1;
                navIdx = navIdx === navMenu.length - 1 ? 0 : navIdx + 1;
            }
            cardList.style.transition = "transform .5s ease-in-out";
            moveSlide();
            updateNav();
        };

        btns.forEach(btn =>
            btn.addEventListener("click", e => triggerAnimation(e.target))
        );

        cardList.addEventListener("transitionend", () => {
            if (cards[cardIdx].classList.contains("first")) {
                cardList.style.transition = "none";
                cardIdx = cards.length - 2;
                moveSlide();
            } else if (cards[cardIdx].classList.contains("last")) {
                cardList.style.transition = "none";
                cardIdx = 1;
                moveSlide();
            }
        });
    }
}
