class Slider {
    constructor(option) {
        (this.INIT_INDEX = 0),
            (this.CURRUNT_INDEX = option.view),
            (this.SPEED = option.speed),
            (this.VIEW = option.view);
        this.wrapEl = document.querySelector(option.wrapEl);
        this.navEl = document.querySelector(option.navEl);
        this.navLiEl = this.navEl.querySelectorAll('li');
        this.contentsEl = document.querySelector(option.contentsEl);
        this.itemsEl = document.querySelectorAll(option.itemsEl);
        this.itemEl = document.querySelector(option.itemEl);
        this.prevEl = document.querySelector(option.prevEl);
        this.nextEl = document.querySelector(option.nextEl);
        this.run();
    }
    initStyle() {
        const CLONE_NUMBER = 2;
        this.wrapEl.style.overflow = 'hidden';
        this.wrapEl.style.position = 'relative';
        this.wrapEl.style.width = this.itemEl.offsetWidth * this.VIEW + 'px';
        this.contentsEl.style.position = 'relative';
        this.contentsEl.style.width =
            this.itemEl.offsetWidth *
                (this.itemsEl.length + this.VIEW * CLONE_NUMBER) +
            'px';
        this.contentsEl.style.transform =
            'translateX(' + -this.itemEl.offsetWidth * this.VIEW + 'px)';

        for (let i = 0; i < this.navLiEl.length; i++) {
            this.navLiEl[i].dataset.item = [i];
        }
    }
    cloneEl() {
        const count = this.VIEW;
        for (let i = 0; i < count; i++) {
            const firstChild = this.itemsEl[i];
            const lastChild = this.itemsEl[this.itemsEl.length - (i + 1)];
            const firstCloned = firstChild.cloneNode(true);
            const lastCloned = lastChild.cloneNode(true);
            this.contentsEl.appendChild(firstCloned).classList.add('cloned');
            this.contentsEl
                .insertBefore(lastCloned, this.contentsEl.firstElementChild)
                .classList.add('cloned');
        }
    }
    onMove() {
        this.contentsEl.style.transform = `translateX(-${this.itemEl
            .offsetWidth * this.CURRUNT_INDEX}px)`;
    }
    onNextClick() {
        this.nextEl.addEventListener('click', () => {
            if (this.CURRUNT_INDEX === this.itemsEl.length + this.VIEW) return;
            this.contentsEl.addEventListener('transitionend', () => {
                if (this.CURRUNT_INDEX === this.itemsEl.length + this.VIEW) {
                    this.contentsEl.style.transition = 'none';
                    this.CURRUNT_INDEX = this.VIEW;
                    this.onMove();
                }
            });
            this.contentsEl.style.transition = this.SPEED + 'ms';
            this.CURRUNT_INDEX++;
            this.onMove();
        });
    }
    onPrevClick() {
        this.prevEl.addEventListener('click', () => {
            if (this.CURRUNT_INDEX === this.INIT_INDEX) return;
            this.contentsEl.addEventListener('transitionend', () => {
                if (this.CURRUNT_INDEX === this.INIT_INDEX) {
                    this.contentsEl.style.transition = 'none';
                    this.CURRUNT_INDEX = this.itemsEl.length;
                    this.onMove();
                }
            });
            this.contentsEl.style.transition = this.SPEED + 'ms';
            this.CURRUNT_INDEX--;
            this.onMove();
        });
    }
    onNavClick() {
        const INIT_ADD_NUMBER = 1;
        for (const iterator of this.navLiEl) {
            iterator.addEventListener('click', () => {
                this.CURRUNT_INDEX =
                    parseInt(iterator.dataset.item) + INIT_ADD_NUMBER;
                this.contentsEl.style.transition = this.SPEED + 'ms';
                this.onMove();
            });
        }
    }
    onNavIndex() {
        console.log('NAV INDEX => ', this.CURRUNT_INDEX);
    }
    run() {
        this.initStyle();
        this.cloneEl();
        this.onNavClick();
        this.onNextClick();
        this.onPrevClick();
    }
}
export default Slider ;
