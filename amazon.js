class TargetInfo {
    constructor(firstIndex, imgTarget, textTarget, menuList) {
        this.imgTarget = imgTarget;
        this.textTarget = textTarget;
        this.menuList = menuList;
        this.targetIndex = firstIndex;
    }

    handler() {
        this.imgTarget.style.transform = `translateX(${this.targetIndex * (-250)}px)`;
        this.textTarget.style.transform = `translateY(${this.targetIndex * (-250)}px)`;
        this.resize();
    }

    resize() {
        this.menuList.forEach(element => {
            element.style.transform = "scale(1, 1)";
        })
        this.menuList[this.targetIndex].style.transform = "scale(1.09, 1.09)";
    }
}


class SlideService {
    constructor(firstIndex, imgTarget, textTarget, menuList) {
        this.target = new TargetInfo(firstIndex, imgTarget, textTarget, menuList);
        this.onButtonHandler();
        this.onMenuHandler();

    }

    onButtonHandler() {
        let [left, right] = document.querySelectorAll("button");

        left.addEventListener("mousedown", () => {
            this.target.targetIndex--;
            if (this.target.targetIndex < 0) this.target.targetIndex = 3;
            this.target.handler();
        });
        right.addEventListener("mousedown", () => {
            this.target.targetIndex++;
            if (this.target.targetIndex > 3) this.target.targetIndex = 0;
            this.target.handler();
        });
    }

    onMenuHandler() {
        let menuList = document.querySelectorAll(".menu-list>li")

        for (let i = 0; i < menuList.length; i++) {
            menuList[i].addEventListener("mousedown", () => {
                this.target.targetIndex = i;
                this.target.handler();
            });
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    let firstIndex = (parseInt(Math.random() * 4));
    console.log(firstIndex);

    const imgTarget = document.querySelector(".content__img-child");
    const textTarget = document.querySelector(".content__text-childs");
    const menuList = document.querySelectorAll(".menu-list>li");

    imgTarget.style.transform = `translateX(${firstIndex * (-250)}px)`;
    textTarget.style.transform = `translateY(${firstIndex * (-250)}px)`;
    menuList[firstIndex].style.transform = "scale(1.09, 1.09)";

    const ss = new SlideService(firstIndex, imgTarget, textTarget, menuList);
});