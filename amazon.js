class SlideService {
    constructor(buttonEl) {
        this.buttonEl = buttonEl;
        this.onMouseDownHandler();
    }

    onMouseDownHandler = () => {
        let [left, right] = document.querySelectorAll("button");
        let clickCount = 0;

        left.addEventListener("mousedown", () => {
            clickCount += 250;
            if (clickCount > 0) clickCount = -750;
            this.buttonEl.style.transform = `translateX(${clickCount}px)`;
        });
        right.addEventListener("mousedown", () => {
            clickCount -= 250;
            if (clickCount < -750) clickCount = 0;
            this.buttonEl.style.transform = `translateX(${clickCount}px)`;
        });
    }
}

class ChangeScaleMenu {
    constructor(buttonEl) {
        this.buttonEl = buttonEl;
        this.onScaleHandler();
    }

    onScaleHandler = () => {
        let el = document.querySelectorAll(".menu-list>li")

        el[0].addEventListener("mousedown", () => {
            this.buttonEl.style.transform = "translateX(0px)";
        });

        el[1].addEventListener("mousedown", () => {
            this.buttonEl.style.transform = "translateX(-250px)";
        });

        el[2].addEventListener("mousedown", () => {
            this.buttonEl.style.transform = "translateX(-500px)";
        });

        el[3].addEventListener("mousedown", () => {
            this.buttonEl.style.transform = "translateX(-750px)";
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const target = document.querySelector(".content__img-child");
    const ss = new SlideService(target);
    const cc = new ChangeScaleMenu(target);
});