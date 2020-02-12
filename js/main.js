class Slide {
    constructor(option) {
        this.el = new Element(OPTION_DATA.elementOption);
        this.VIEWER_WIDTH = option.VIEWER_WIDTH;
        this.curItem = option.FIRST_ITEM_INDEX;
        this.itemsCount = this.el.items.length - 1;
        this.nextHandler = this.nextHandler.bind(this);
        this.prevHandler = this.prevHandler.bind(this);
        this.tsEndHandler = this.tsEndHandler.bind(this);
        this.init();
    }

    init() {
        navContainer.style.width = `${(OPTION_DATA.slideOption.NAV_CARD_WIDTH * DATA.itemContents.length) + (5 * DATA.itemContents.length)}px`;
        slideContainer.style.width = `${OPTION_DATA.slideOption.VIEWER_WIDTH * (DATA.itemContents.length + 2)}px`;
        this.el.wrap.style.transform = `translateX(${-this.VIEWER_WIDTH}px)`;
        this.makeDummy();
    }

    nextHandler() {
        this.el.next.style.transform = "scale(1)";
        if (this.curItem === 0 && this.el.wrap.style.transform !== `translateX(${(this.curItem + 1) * -this.VIEWER_WIDTH}px)`) return;
        if (this.curItem === this.itemsCount) {
            this.tsChecker();
            this.curItem = 0;
            this.navScaleCtl(this.curItem, this.itemsCount);
            const x = (this.itemsCount + 2) * -this.VIEWER_WIDTH;
            this.el.wrap.style.transform = `translateX(${x + "px"})`;
            this.el.wrap.addEventListener("transitionend", this.tsEndHandler);
        } else {
            this.tsChecker();
            this.curItem++;
            this.navScaleCtl(this.curItem, this.curItem - 1);
            const x = (this.curItem * -this.VIEWER_WIDTH) - this.VIEWER_WIDTH;
            this.el.wrap.style.transform = `translateX(${x + "px"})`;
        }
    }

    prevHandler() {
        this.el.prev.style.transform = "scale(1)";
        if (this.curItem === this.itemsCount && this.el.wrap.style.transform !== `translateX(${(this.curItem + 1) * -this.VIEWER_WIDTH}px)`) return;
        if (this.curItem === 0) {
            this.tsChecker();
            this.curItem = this.itemsCount;
            this.navScaleCtl(this.itemsCount, 0);
            const x = 0;
            this.el.wrap.style.transform = `translateX(${x + "px"})`;
            this.el.wrap.addEventListener("transitionend", this.tsEndHandler);
        } else {
            this.tsChecker();
            this.curItem--;
            this.navScaleCtl(this.curItem, this.curItem + 1);
            const x = (this.curItem * -this.VIEWER_WIDTH) - this.VIEWER_WIDTH;
            this.el.wrap.style.transform = `translateX(${x + "px"})`;
        }
    }

    tsEndHandler() {
        const x = this.curItem === 0 ? -this.VIEWER_WIDTH : -this.VIEWER_WIDTH * this.el.items.length;
        this.el.wrap.classList.remove("on-transition");
        this.el.wrap.style.transform = `translateX(${x + "px"})`;
        this.el.wrap.removeEventListener("transitionend", this.tsEndHandler);
    }

    tsChecker() {
        if (!this.el.wrap.classList.contains("on-transition")) {
            this.el.wrap.classList.add("on-transition");
        }
    }

    navScaleCtl(curItem, prevItem) {
        this.el.cards[curItem].classList.add("slide-nav-selected");
        this.el.cards[prevItem].classList.remove("slide-nav-selected");
    }

    makeDummy() {
        const firstItem = this.el.items[0];
        const lastDummy = _$("li");
        lastDummy.innerHTML = firstItem.innerHTML;
        lastDummy.classList.add("slide-item");
        this.el.wrap.lastElementChild.after(lastDummy);

        const lastItem = this.el.items[this.el.items.length - 1];
        const firstDummy = _$("li");
        firstDummy.innerHTML = lastItem.innerHTML;
        firstDummy.classList.add("slide-item");
        this.el.wrap.firstElementChild.before(firstDummy);
    }

    addBtnEvent() {
        this.el.cards.forEach((node, idx) => {
            node.addEventListener("click", () => {
                if (idx === this.curItem) return;
                this.tsChecker();
                const prevItem = this.curItem;
                this.curItem = idx;
                this.navScaleCtl(this.curItem, prevItem);
                const x = (this.curItem * -this.VIEWER_WIDTH) - this.VIEWER_WIDTH;
                this.el.wrap.style.transform = `translateX(${x + "px"})`;
            });
        });

        this.el.next.addEventListener("click", this.nextHandler);
        this.el.prev.addEventListener("click", this.prevHandler);

        this.el.next.addEventListener("mousedown", () => { this.el.next.style.transform = "scale(0.9)" });
        this.el.prev.addEventListener("mousedown", () => { this.el.prev.style.transform = "scale(0.9)" });

        this.el.next.addEventListener("mouseout", () => { this.el.next.style.transform = "scale(1)" });
        this.el.prev.addEventListener("mouseout", () => { this.el.prev.style.transform = "scale(1)" });
    }
}

class Element {
    constructor(option) {
        this.prev = $(option.prev);
        this.next = $(option.next);
        this.wrap = $(option.slide_item_wrap);
        this.items = $$(option.slide_items);
        this.cards = $$(option.slide_nav_li);
    }
}

const slide = new Slide(OPTION_DATA.slideOption);
slide.addBtnEvent();