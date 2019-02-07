class PlansUI {
    constructor() {
        this.isExtenderShown = false;
        this.closeExtenderBtn = document.querySelector('.plans-extender-btn');
        this.closeExtenderBtn2 = document.querySelector('.plans-extender-closeBtn')
        this.plansMoreBtn = document.querySelector('.plans-see-more');
        this.plansLayer = document.querySelector('.plans-layer');
        this.plansLayerWrapper = document.querySelector('.plans-wrapper');
        this.header = document.querySelector('.header');
        this.plansExtender = document.querySelector('.plans-extender');
        this.layerPosition = 366;
        this.headerPosition = 99;
    }

    showLayer() {
        this.isExtenderShown ? this.checkExtender() : this.showPlansLayer();
    };

    showPlansLayer() {
        if (window.scrollY > this.layerPosition) {
            this.plansLayer.classList.add('shown');
            this.header.classList.remove('extended');
            this.plansLayerWrapper.classList.remove('closing');
        }

        else this.closePlansLayer();
    };

    closePlansLayer(){
        if (window.scrollY < this.headerPosition) {
            this.plansLayerWrapper.classList.add('closing');
            this.header.classList.add('extended');
        }
        else {
            this.plansLayer.classList.remove('shown');
            this.header.classList.remove('extended');
            this.plansLayerWrapper.classList.remove('closing');
        }
    }

    checkExtender() {
        if (window.scrollY < this.headerPosition) {
            this.plansExtender.classList.add('top');
            this.header.classList.add('extended');
        } else {
            this.plansExtender.classList.remove('top');
            this.header.classList.remove('extended');
        }
    };

    showExtender() {
        this.plansLayer.classList.remove('shown');
        this.plansExtender.classList.add('shown');
        this.isExtenderShown = true;
    };

    closeExtender() {
        if (window.scrollY > this.layerPosition) {
            this.plansExtender.classList.remove('shown');
            this.plansLayer.classList.add('shown');
            this.plansExtender.classList.remove('top');
            this.isExtenderShown = false;
        } else {
            this.plansExtender.classList.remove('shown');
            this.plansExtender.classList.remove('top');
            this.isExtenderShown = false;
        }
    }
}

const plansUI = new PlansUI();

document.addEventListener("scroll", plansUI.showLayer.bind(plansUI));
document.addEventListener("scroll", plansUI.checkExtender.bind(plansUI));
plansUI.closeExtenderBtn.addEventListener("click", plansUI.closeExtender.bind(plansUI));
plansUI.closeExtenderBtn2.addEventListener("click", plansUI.closeExtender.bind(plansUI));
plansUI.plansMoreBtn.addEventListener("click", plansUI.showExtender.bind(plansUI));