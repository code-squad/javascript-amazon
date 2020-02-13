class HeaderEvent extends MyEvent {
    constructor() {
        super();
    }


    handleHeaderPart(target) {
        target.parentNode.classList.add('header-selected');
        target.parentNode.querySelector(".circles").classList.remove("invisible");
        target.parentNode.querySelector(".dot").classList.add("selected-dot");
        target.parentNode.querySelector(".dot").click();
    }

    handleCirclesPart(target) {
        target.parentNode.classList.add('header-selected');
        target.classList.remove("invisible");
        target.querySelector(".dot").classList.add("selected-dot");
        target.querySelector(".dot").click();
    }

    handleDotPart(target) {
        target.parentNode.parentNode.classList.add('header-selected');
        target.parentNode.classList.remove("invisible");
        target.classList.add("selected-dot");
    }

    handleAnywhereElse(target) {
        target.querySelector(".dot").classList.add("selected-dot");
        target.querySelector(".dot").click();
        target.classList.add('header-selected');
        Array.from(target.children).forEach(child => {
            if (child.classList.contains("circles")) {
                child.classList.remove('invisible');
            }
        })
    }

    selectBoxListener(event) {

        const { target } = event;

        this.initializeStatus();


        if (target.classList.contains("header_title") === true) {
            this.handleHeaderPart(target);
            return;
        }

        if (target.classList.contains("circles") === true) {
            this.handleHeaderPart(target);
            return;
        }

        if (target.classList.contains("dot") === true) {
            this.handleDotPart(target);
            return;
        }

        this.handleAnywhereElse(target);
    }
}