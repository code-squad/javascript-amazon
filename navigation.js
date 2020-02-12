class Navigation {
    constructor(texts, numOfCards) {
        this.texts = texts;
        this.numOfCards = numOfCards;
    }

    render() {
        const navigation = this.texts.reduce(
            (result, text, i) =>
                (result += `<li class="nav-menu ${
                    i === 0 ? "selected" : ""
                }">${text}</li>`),
            ""
        );
        return `<ul class="nav-list">${navigation}</ul>`;
    }

    updateNav(navMenu, i) {
        navMenu.forEach(menu => menu.classList.remove("selected"));
        navMenu[i].classList.add("selected");
    }

    moveCardList(i) {
        const cardList = $(".card-list");
        cardList.style.transform =
            "translateX(" + `${i * -(100 / this.numOfCards)}%` + ")";
    }

    attachEvent() {
        const navMenu = $$(".nav-menu");
        navMenu.forEach((menu, i) => {
            menu.addEventListener("click", () => {
                this.updateNav(navMenu, i);
                this.moveCardList(i);
            });
        });
    }
}
