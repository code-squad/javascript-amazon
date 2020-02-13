
class TargetInfo {
    constructor(firstIndex, containerTarget, menuList) {
        this.CONTAINER_WIDTH = -containerTarget.clientWidth / 6;
        this.containerTarget = containerTarget;
        this.menuList = menuList;
        this.targetIndex = firstIndex;
    }

    handler() {
        this.containerTarget.style.transform = `translateX(${(this.targetIndex + 1) * this.CONTAINER_WIDTH}px)`;
        //this.containerTarget.style.transform = `translateX(${this.targetIndex * ()}px)`;
        //console.log(this.containerTarget.style.width / 4);
        this.resize();
    }

    resize() {
        this.menuList.forEach(element => {
            element.style.transform = "scale(1, 1)";
        })
        this.menuList[this.targetIndex - 1].style.transform = "scale(1.09, 1.09)";
    }
}


class SlideService {
    constructor(firstIndex, containerTarget, menuList) {
        this.target = new TargetInfo(firstIndex, containerTarget, menuList);
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
            if (this.target.targetIndex > 5) {
                this.target.targetIndex = 1;

            }
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

    const containerTarget = document.querySelector(".content-container-childs");
    const menuList = document.querySelectorAll(".menu-list>li");
    const CONTAINER_WIDTH = -containerTarget.clientWidth / 6;



    containerTarget.style.transform = `translateX(${(firstIndex + 1) * CONTAINER_WIDTH}px)`;
    menuList[firstIndex].style.transform = "scale(1.09, 1.09)";

    const ss = new SlideService(firstIndex, containerTarget, menuList);
});