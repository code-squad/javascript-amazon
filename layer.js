export default class PlansUI {
    constructor() {
        this.isExtenderShown = false;
        this.closeExtenderBtn = document.querySelector('.plans-extender-btn');
        this.closeExtenderBtn2 = document.querySelector('.plans-extender-closeBtn')
        this.plansMoreBtn = document.querySelector('.plans-see-more');
        this.plansLayer = document.querySelector('.plans-layer');
        this.plansLayerWrapper = document.querySelector('.plans-wrapper');
        this.header = document.querySelector('.header');
        this.plansExtender = document.querySelector('.plans-extender');
    }

    init() {
        window.addEventListener("scroll", this.controlLayer.bind(this));
        this.closeExtenderBtn.addEventListener("click", this.controlClosingExtender.bind(this));
        this.closeExtenderBtn2.addEventListener("click", this.controlClosingExtender.bind(this));
        this.plansMoreBtn.addEventListener("click", this.showExtender.bind(this));

    }

    controlLayer() {
        this.isExtenderShown ? this.checkExHeader() : this.controlPlansLayer();
    }

    checkExHeader() {
        this.isHeaderShown() ? this.moveExTopToHeader() : this.moveExTopToZero();
    }

    isHeaderShown() {
        return window.scrollY < 99;
    }

    moveExTopToHeader() {
        this.plansExtender.classList.add('top');
        this.header.classList.add('extended');
    }

    moveExTopToZero() {
        this.plansExtender.classList.remove('top');
        this.header.classList.remove('extended');
    }

    controlPlansLayer() {
        if (this.isScrollToShowPL()) this.plansLayer.classList.add('shown');
        else if (this.isHeaderShown()) this.moveTopToHeader();
        else this.closePlansLayer();
    }

    isScrollToShowPL() {
        return window.scrollY > 366;
    }

    moveTopToZero() {
        this.header.classList.remove('extended');
        this.plansLayerWrapper.classList.remove('closing');
    }

    moveTopToHeader() {
        this.header.classList.add('extended');
        this.plansLayerWrapper.classList.add('closing');
    }

    closePlansLayer() {
        if (this.isHeaderShown()) this.moveTopToHeader();
        else {
            this.plansLayer.classList.remove('shown');
            this.moveTopToZero();
        }
    }

    showExtender() {
        this.plansLayer.classList.remove('shown');
        this.plansExtender.classList.add('shown');
        this.isExtenderShown = true;
    }

    controlClosingExtender() {
        if (this.isScrollToShowPL()) this.plansLayer.classList.add('shown');
        else if (this.isExTopToHeader()) this.moveTopToHeader();
        this.closeExtender();
    }

    isExTopToHeader() {
        return this.plansExtender.classList.contains("top");
    }

    closeExtender() {
        this.plansExtender.classList.remove('shown');
        this.plansExtender.classList.remove('top');
        this.isExtenderShown = false;
    }
}