
class MenuHandler {
    constructor(slideIndex, menuList) {
        this.slideIndex = slideIndex;
        this.menuList = menuList;
    }

    changeSize() {
        this.menuList.forEach(element => {
            element.style.transform = "scale(1, 1)";
        })
        this.menuList[this.slideIndex - 1].style.transform = "scale(1.09, 1.09)";
    }

    onMenuHandler(changePosition) {
        for (let i = 0; i < menuList.length; i++) {
            menuList[i].addEventListener("mousedown", () => {
                this.slideIndex = i;
            });
        }
        changePosition(this.slideIndex);
    }

}

class ButtonHandler {
    constructor(slideIndex, buttonList) {
        this.slideIndex = slideIndex;
        this.buttonList = buttonList
    }

    onButtonHandler() {
        buttonList[0].addEventListener("mousedown", () => {
            this.slideIndex--;
            if (this.slideIndex < 0) {
                this.slideIndex = 4;
            }
        });
        buttonList[1].addEventListener("mousedown", () => {
            this.slideIndex++;
            if (this.slideIndex > 5) {
                this.slideIndex = 1;
            }
        });
    }
}

class SlideHandler {
    constructor(slideIndex, slide, CONTAINER_WIDTH) {
        //this.slideIndex = slideIndex;
        this.slide = slide;
        this.CONTAINER_WIDTH = CONTAINER_WIDTH;
        this.changePosition(slideIndex);
    }

    changePosition(slideIndex) {
        console.log(slideIndex);
        this.slide.style.transform = `translateX(${slideIndex * this.CONTAINER_WIDTH}px)`;
        console.log(this.CONTAINER_WIDTH);
    }
}

window.addEventListener('DOMContentLoaded', () => {

    const slideIndex = (parseInt(Math.random() * 4));

    const menuList = document.querySelectorAll(".menu-list>li");
    const buttonList = document.querySelectorAll("button");
    const slide = document.querySelector(".content-container-childs");
    const CONTAINER_WIDTH = -document.querySelector(".content-container-child").clientWidth;

    const menuHandler = new MenuHandler(slideIndex, menuList);
    const buttonHandler = new ButtonHandler(slideIndex, buttonList);
    const slideHandler = new SlideHandler(slideIndex, slide, CONTAINER_WIDTH);

    // const applyMenuEvent = function(change) {
    //     change();
    // }

    menuHandler.onMenuHandler(slideHandler.changePosition());

});