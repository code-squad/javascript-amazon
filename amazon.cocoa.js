// amazon_step2 js
// plans layer / more plans layer class

const elementObjectForPlansLayer = {
    upperPlansLayer: document.querySelector(".upper-plans-layer"),
    upperPlansLayerLine: document.querySelector(".upper-plans-layer-line"),
    upperPlansLayerPanel: document.querySelector(".upper-plans-layer-panel"),
    headerbarHeight: document.querySelector("#header-bar").clientHeight,
    tryPrimeButtonElement: document.querySelector("#try-prime-button"),
    tryPrimeBottomHeight: document.querySelector("#try-prime-button").offsetHeight + document.querySelector("#try-prime-button").offsetTop + document.querySelector("#header-bar").clientHeight
}

const elementObjectForMorePlansLayer = {
    morePlansLayer: document.querySelector(".see-more-plans-layer"),
    layerExpandAnchor: document.querySelector(".expand-more-plans-layer"),
    plansLayerHeight: document.querySelector(".upper-plans-layer"),
    closingAreaMorePlansLayer: document.querySelector(".see-more-plans-layer")
}


class PlansLayer {
    constructor(element) {
        this.upperPlansLayer = element.upperPlansLayer
        this.upperPlansLayerLine = element.upperPlansLayerLine
        this.upperPlansLayerPanel = element.upperPlansLayerPanel
        this.headerbarHeight = element.headerbarHeight
        this.tryPrimeButtonElement = element.tryPrimeButtonElement
        this.tryPrimeBottomHeight = element.tryPrimeBottomHeight
        this.initShowUpperPlansLayer();
    }

    initShowUpperPlansLayer() {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset < this.headerbarHeight) {
                this.upperPlansLayer.classList.remove("scroll-position-fixed-upper-plans-layer");
                this.upperPlansLayerLine.classList.remove("scroll-position-fixed-upper-plans-layer-line");
            }
            if (window.pageYOffset >= this.headerbarHeight && window.pageYOffset < this.tryPrimeBottomHeight) {
                this.upperPlansLayer.classList.add("scroll-position-fixed-upper-plans-layer");
                this.upperPlansLayerLine.classList.add("scroll-position-fixed-upper-plans-layer-line");
                this.upperPlansLayer.classList.remove("scroll-height-upper-plans-layer", "upper-plans-layer-position-bottom", "upper-plans-layer-position-bottom-keep");
                this.upperPlansLayerLine.classList.remove("scroll-height-upper-plans-layer-line", "upper-plans-layer-line-position-bottom", "upper-plans-layer-line-position-bottom-keep");
                this.upperPlansLayerPanel.classList.remove("upper-plans-layer-panel-expand");
            }
            if (window.pageYOffset >= this.tryPrimeBottomHeight) {
                this.upperPlansLayer.classList.add("scroll-height-upper-plans-layer");
                this.upperPlansLayerLine.classList.add("scroll-height-upper-plans-layer-line");
                this.upperPlansLayerPanel.classList.add("upper-plans-layer-panel-expand");
            }
        });
    }
}

class MorePlansLayer extends PlansLayer {
    constructor(element, element2) {
        super(element);
        this.morePlansLayer = element2.morePlansLayer;
        this.layerExpandAnchor = element2.layerExpandAnchor
        this.plansLayerHeight = element2.plansLayerHeight
        this.closingAreaMorePlansLayer = element2.closingAreaMorePlansLayer
        this.initExpandMorePlansLayer();
    }

    initExpandMorePlansLayer() {
        this.layerExpandAnchor.addEventListener("click", () => {
            this.morePlansLayer.style.height = `${window.innerHeight}px`;
            this.upperPlansLayer.style.top = this.morePlansLayer.style.height;
            this.upperPlansLayerLine.style.top = `${window.innerHeight + this.upperPlansLayer.clientHeight}px`;
            this.upperPlansLayer.classList.add("upper-plans-layer-position-bottom", "upper-plans-layer-position-bottom-keep");
            this.upperPlansLayerLine.classList.add("upper-plans-layer-line-position-bottom", "upper-plans-layer-line-position-bottom-keep");
        });

        this.closingAreaMorePlansLayer.addEventListener("click", () => {
            this.morePlansLayer.style.height = "";
            this.upperPlansLayer.style.top = "";
            this.upperPlansLayerLine.style.top = "";
            this.upperPlansLayer.classList.remove("upper-plans-layer-position-bottom");
            this.upperPlansLayerLine.classList.remove("upper-plans-layer-line-position-bottom");
        });
    }
}

const plansLayer = new MorePlansLayer(elementObjectForPlansLayer, elementObjectForMorePlansLayer);