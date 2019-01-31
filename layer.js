class PlansUI {
    constructor() {
        this.isExtenderShown = false;
        this.closeExtenderBtn = document.querySelector('.plans-extender-btn');
        this.plansMoreBtn = document.querySelector('.plans-see-more');
    }

    showLayer() {
        this.isExtenderShown ? this.checkExtender() : this.showPlansLayer();
    };

    showPlansLayer() {
        const plansLayer = document.querySelector('.plans-layer');
        if (window.scrollY > 366) plansLayer.classList.add('shown');
        else plansLayer.classList.remove('shown');
    };

    checkExtender() {
        const header = document.querySelector('.header');
        const plansExtender = document.querySelector('.plans-extender');

        if (window.scrollY < 99) {
            plansExtender.classList.add('top');
            header.classList.add('extended');
        } else {
            plansExtender.classList.remove('top');
            header.classList.remove('extended');
        }
    };

    showExtender() {
        const plansLayer = document.querySelector('.plans-layer');
        const plansExtender = document.querySelector('.plans-extender');

        plansLayer.classList.remove('shown');
        plansExtender.classList.add('shown');
        this.isExtenderShown = true;
    };

    closeExtender() {
        const plansExtender = document.querySelector('.plans-extender');
        const plansLayer = document.querySelector('.plans-layer');

        if (window.scrollY > 366) {
            plansExtender.classList.remove('shown');
            plansLayer.classList.add('shown');
            plansExtender.classList.remove('top');
            this.isExtenderShown = false;
        } else {
            plansExtender.classList.remove('shown');
            plansExtender.classList.remove('top');
            this.isExtenderShown = false;
        }
    }
}

const plansUI = new PlansUI();

document.addEventListener("scroll", plansUI.showLayer.bind(plansUI));
document.addEventListener("scroll", plansUI.checkExtender.bind(plansUI));
plansUI.closeExtenderBtn.addEventListener("click", plansUI.closeExtender.bind(plansUI));
plansUI.plansMoreBtn.addEventListener("click", plansUI.showExtender.bind(plansUI));