

class SlideService {
    constructor(buttonEl, textTarget) {
        this.buttonEl = buttonEl;
        this.textTarget = textTarget;
        this.onMouseDownHandler();
    }

    onMouseDownHandler = () => {
        let [left, right] = document.querySelectorAll("button");
        let clickCount = 0;

        left.addEventListener("mousedown", () => {
            clickCount += 250;
            if (clickCount > 0) clickCount = -750;
            this.buttonEl.style.transform = `translateX(${clickCount}px)`;
            this.textTarget.style.transform = `translateY(${clickCount}px)`;
        });
        right.addEventListener("mousedown", () => {
            clickCount -= 250;
            if (clickCount < -750) clickCount = 0;
            this.buttonEl.style.transform = `translateX(${clickCount}px)`;
            this.textTarget.style.transform = `translateY(${clickCount}px)`;
        });
    }
}

class ChangeScaleMenu {
    constructor(buttonEl, textTarget) {
        this.buttonEl = buttonEl;
        this.textTarget = textTarget;
        this.onScaleHandler();
    }

    onScaleHandler = () => {
        let el = document.querySelectorAll(".menu-list>li")
        let preIndex = 0;
        
        el[0].addEventListener("mousedown", () => {
            this.resize(el, 0, preIndex);
            preIndex = 0;
        });

        el[1].addEventListener("mousedown", () => {
            // this.buttonEl.style.transform = "translateX(-250px)";
            // this.textTarget.style.transform = "translateY(-250px)";
            // el[1].style.transform = "scale(1.25, 1.25)";
            this.resize(el, 1, preIndex);
            preIndex = 1;
        });

        el[2].addEventListener("mousedown", () => {
            this.resize(el, 2, preIndex);
            preIndex = 2;
        });

        el[3].addEventListener("mousedown", () => {
            // this.buttonEl.style.transform = "translateX(-750px)";
            // this.textTarget.style.transform = "translateY(-750px)";
            this.resize(el, 3, preIndex);
            preIndex = 3;
        });
    }

    resize(el, index, preIndex) {
        el[preIndex].style.transform = "scale(0.8, 0.8)";
        el[index].style.transform = "scale(1.25, 1.25)";
        this.buttonEl.style.transform = `translateX(${-250*index}px)`;
        this.textTarget.style.transform = `translateY(${-250*index}px)`;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    const target = document.querySelector(".content__img-child");
    const textTarget = document.querySelector(".content__text-childs");
    const ss = new SlideService(target, textTarget);
    const cc = new ChangeScaleMenu(target, textTarget);

    let number = (parseInt(Math.random() * 4)) * 250 * (-1);
    console.log(number);
    target.style.transform = `translateX(${number}px)`;
    textTarget.style.transform = `translateY(${number}px)`;
});