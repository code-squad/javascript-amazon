class Slide {
    constructor(option) {
        this.el = new Element(OPTION_DATA.elementOption);
        this.VIEWER_WIDTH = option.VIEWER_WIDTH;
        this.curItem = option.FIRST_ITEM_INDEX;
        this.itemsCount = this.el.items.length - 1;
        this.nextHandler = this.nextHandler.bind(this);
        this.prevHandler = this.prevHandler.bind(this);
        this.init();
    }

    init() {
        navContainer.style.width = `${(OPTION_DATA.slideOption.NAV_CARD_WIDTH * DATA.itemContents.length) + (5 * DATA.itemContents.length)}px`;
        slideContainer.style.width = `${OPTION_DATA.slideOption.VIEWER_WIDTH * DATA.itemContents.length}px`;
    }

    nextHandler() {
        this.el.next.style.transform = "scale(1)";
        if (this.curItem === this.itemsCount) {
            this.curItem = 0;
            this.navScaleCtl(this.curItem, this.itemsCount);
            const x = this.curItem * -this.VIEWER_WIDTH;
            this.el.wrap.style.transform = `translateX(${x + "px"})`;
        } else {
            this.curItem++;
            this.navScaleCtl(this.curItem, this.curItem - 1);
            const x = this.curItem * -this.VIEWER_WIDTH;
            this.el.wrap.style.transform = `translateX(${x + "px"})`;
        }
    }

    prevHandler() {
        this.el.prev.style.transform = "scale(1)";
        if (this.curItem === 0) {
            this.curItem = this.itemsCount;
            this.navScaleCtl(this.itemsCount, 0);
            const x = this.curItem * -this.VIEWER_WIDTH;
            this.el.wrap.style.transform = `translateX(${x + "px"})`;
        } else {
            this.curItem--;
            this.navScaleCtl(this.curItem, this.curItem + 1);
            const x = this.curItem * -this.VIEWER_WIDTH;
            this.el.wrap.style.transform = `translateX(${x + "px"})`;
        }
    }

    navScaleCtl(curItem, prevItem) {
        this.el.cards[curItem].classList.add("slide-nav-selected");
        this.el.cards[prevItem].classList.remove("slide-nav-selected");
    }

    addBtnEvent() {
        this.el.cards.forEach((node, idx) => {
            node.addEventListener("click", () => {
                if (idx === this.curItem) return;
                const prevItem = this.curItem;
                this.curItem = idx;
                this.navScaleCtl(this.curItem, prevItem);
                const x = this.curItem * -this.VIEWER_WIDTH;
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