class Navigation {
    constructor(texts, cardWidth) {
        this.texts = texts;
        this.cardWidth = cardWidth;
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

    onClickEventHandler() {
        const navMenu = $$(".nav-menu");
        const cardList = $(".card-list");

        const updateNav = i => {
            navMenu.forEach(menu => menu.classList.remove("selected"));
            navMenu[i].classList.add("selected");
        };

        const moveSlide = i => {
            cardList.style.transform =
                "translateX(" + `${-this.cardWidth * i}` + "px)";
        };

        navMenu.forEach((menu, i) => {
            menu.addEventListener("click", () => {
                updateNav(i);
                moveSlide(i + 1);
            });
        });
    }
}
