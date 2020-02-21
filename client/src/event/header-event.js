import CoreEvent from "./core-event.js";

class HeaderEvent extends CoreEvent {
    constructor(isEventEnded) {
        super();
        this.isEventEnded = isEventEnded;
    }

    handleHeaderPart(target) {
        const dotNode = target.parentNode.querySelector(".dot");
        target.parentNode.classList.add('header-selected');
        target.parentNode.querySelector(".circles").classList.remove("invisible");
        dotNode.classList.add("selected-dot");
        dotNode.click();
    }

    handleCirclesPart(target) {
        const dotNode = target.parentNode.querySelector(".dot");
        target.parentNode.classList.add('header-selected');
        target.classList.remove("invisible");
        dotNode.classList.add("selected-dot");
        dotNode.click();
    }

    handleDotPart(target) {
        target.parentNode.parentNode.classList.add('header-selected');
        target.parentNode.classList.remove("invisible");
        target.classList.add("selected-dot");
    }

    handleAnywhereElse(target) {
        const dotNode = target.querySelector(".dot");
        dotNode.classList.add("selected-dot");
        dotNode.click();
        target.classList.add('header-selected');
        Array.from(target.children).forEach(child => {
            if (child.classList.contains("circles")) {
                child.classList.remove('invisible');
            }
        })
    }

    selectBoxListener(event) {

        if (this.isEventEnded.ended === false) {
            return;
        }
        
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

export default HeaderEvent;