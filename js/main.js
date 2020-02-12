const slideOption = {
    NAV_CARD_WIDTH: 220,
    VIEWER_WIDTH: 900,
    currentItemIndex: 0,
};

const elementOption = {
    prev: ".prev_btn",
    next: ".next_btn",
    slide_item_wrap: ".slide_item_wrap",
    slide_items: ".slide_item",
    slide_nav_li: ".slide_nav li",
};

navContainer.style.width = `${(slideOption.NAV_CARD_WIDTH * data.itemContents.length) + (5 * data.itemContents.length)}px`;
slideContentContainer.style.width = `${slideOption.VIEWER_WIDTH * (data.itemContents.length + 2)}px`;

class Slide {
    constructor(option) {
        this.element = new Element(elementOption);
        this.VIEWER_WIDTH = option.VIEWER_WIDTH;
        this.currentItemIndex = option.currentItemIndex;
        this.itemsCount = this.element.slide_items.length - 1;
        this.transitionendHandler = this.transitionendHandler.bind(this);
        this.nextBtnClickHandler = this.nextBtnClickHandler.bind(this);
        this.prevBtnClickHandler = this.prevBtnClickHandler.bind(this);
        this.init();
    }

    init() {
        this.element.slide_item_wrap.style.transform = `translateX(${-this.VIEWER_WIDTH}px)`;
        this.element.slide_nav_li.forEach((node, idx) => {
            node.addEventListener("click", () => {
                if (idx === this.currentItemIndex) return;
                if (!this.element.slide_item_wrap.classList.contains("on-transition")) {
                    this.element.slide_item_wrap.classList.add("on-transition");
                }
                const prevItemIndex = this.currentItemIndex;
                this.currentItemIndex = idx;
                this.navScaleCtl(this.currentItemIndex, prevItemIndex);
                const x = (this.currentItemIndex * -this.VIEWER_WIDTH) - this.VIEWER_WIDTH;
                this.element.slide_item_wrap.style.transform = `translateX(${x + "px"})`;
            });
        });
        const test = this.element.slide_items[0];
        const test2 = document.createElement("li");
        test2.innerHTML = test.innerHTML;
        test2.classList.add("slide_item");
        this.element.slide_item_wrap.lastElementChild.after(test2);

        const test3 = this.element.slide_items[this.element.slide_items.length - 1];
        const test4 = document.createElement("li");
        test4.innerHTML = test3.innerHTML;
        test4.classList.add("slide_item");
        this.element.slide_item_wrap.firstElementChild.before(test4);
    }

    nextBtnClickHandler() {
        if (this.currentItemIndex === 0 && this.element.slide_item_wrap.style.transform !== `translateX(${(this.currentItemIndex + 1) * -this.VIEWER_WIDTH}px)`) return;
        if (this.currentItemIndex === this.itemsCount) {
            this.transitionChecker();
            this.currentItemIndex = 0;
            this.navScaleCtl(this.currentItemIndex, this.itemsCount);
            const x = (this.itemsCount + 2) * -this.VIEWER_WIDTH;
            this.element.slide_item_wrap.style.transform = `translateX(${x + "px"})`;
            this.element.slide_item_wrap.addEventListener("transitionend", this.transitionendHandler);
        } else {
            this.transitionChecker();
            this.currentItemIndex++;
            this.navScaleCtl(this.currentItemIndex, this.currentItemIndex - 1);
            const x = (this.currentItemIndex * -this.VIEWER_WIDTH) - this.VIEWER_WIDTH;
            this.element.slide_item_wrap.style.transform = `translateX(${x + "px"})`;
        }
    }

    prevBtnClickHandler() {
        if (this.currentItemIndex === this.itemsCount && this.element.slide_item_wrap.style.transform !== `translateX(${(this.currentItemIndex + 1) * -this.VIEWER_WIDTH}px)`) return;
        if (this.currentItemIndex === 0) {
            this.transitionChecker();
            this.currentItemIndex = this.itemsCount;
            this.navScaleCtl(this.itemsCount, 0);
            const x = 0;
            this.element.slide_item_wrap.style.transform = `translateX(${x + "px"})`;
            this.element.slide_item_wrap.addEventListener("transitionend", this.transitionendHandler);
        } else {
            this.transitionChecker();
            this.currentItemIndex--;
            this.navScaleCtl(this.currentItemIndex, this.currentItemIndex + 1);
            const x = (this.currentItemIndex * -this.VIEWER_WIDTH) - this.VIEWER_WIDTH;
            this.element.slide_item_wrap.style.transform = `translateX(${x + "px"})`;
        }
    }

    transitionChecker() {
        if (!this.element.slide_item_wrap.classList.contains("on-transition")) {
            this.element.slide_item_wrap.classList.add("on-transition");
        }
    }

    navScaleCtl(currentItemIndex, prevItemIndex) {
        this.element.slide_nav_li[currentItemIndex].classList.add("slide_nav_selected");
        this.element.slide_nav_li[prevItemIndex].classList.remove("slide_nav_selected");
    }

    transitionendHandler() {
        const x = this.currentItemIndex === 0 ? -this.VIEWER_WIDTH : -this.VIEWER_WIDTH * this.element.slide_items.length;
        this.element.slide_item_wrap.classList.remove("on-transition");
        this.element.slide_item_wrap.style.transform = `translateX(${x + "px"})`;
        this.element.slide_item_wrap.removeEventListener("transitionend", this.transitionendHandler);
    }

    run() {
        this.element.next.addEventListener("click", this.nextBtnClickHandler);
        this.element.prev.addEventListener("click", this.prevBtnClickHandler);
    }
}

class Element {
    constructor(option) {
        this.prev = $(option.prev);
        this.next = $(option.next);
        this.slide_item_wrap = $(option.slide_item_wrap);
        this.slide_items = $$(option.slide_items);
        this.slide_nav_li = $$(option.slide_nav_li);
    }
}

const slide = new Slide(slideOption);
slide.run();