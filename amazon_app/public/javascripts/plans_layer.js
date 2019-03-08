// amazon_step4 js
// plans layer / more plans layer class

class PlansLayer {
    constructor() {
        this.upperPlansLayer = document.querySelector(".upper-plans-layer");
        this.upperPlansLayerLine = document.querySelector(".upper-plans-layer-line");
        this.upperPlansLayerPanel = document.querySelector(".upper-plans-layer-panel");
        this.headerbarHeight = document.querySelector("#header-bar").clientHeight;
        this.tryPrimeButtonElement = document.querySelector("#try-prime-button");
        this.tryPrimeBottomHeight = document.querySelector("#try-prime-button").offsetHeight +
            document.querySelector("#try-prime-button").offsetTop +
            document.querySelector("#header-bar").clientHeight;
        this.initShowUpperPlansLayer();
    }

    initShowUpperPlansLayer() {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset < this.headerbarHeight)
                this.inactivateUpperPlansLayer();
            if (window.pageYOffset >= this.headerbarHeight && window.pageYOffset < this.tryPrimeBottomHeight)
                this.standByUpperPlansLayer();
            if (window.pageYOffset >= this.tryPrimeBottomHeight)
                this.showUpperPlansLayer();
        });
    }

    inactivateUpperPlansLayer() {
        this.upperPlansLayer.classList.remove("position-fixed");
        this.upperPlansLayerLine.classList.remove("position-fixed-line");
        
    }

    standByUpperPlansLayer() {
        this.upperPlansLayer.classList.add("position-fixed");
        this.upperPlansLayerLine.classList.add("position-fixed-line");
        this.upperPlansLayer.classList.remove("height-layer", "position-bottom", "position-bottom-keep");
        this.upperPlansLayerLine.classList.remove("top-layer-line", "position-bottom-line", "position-bottom-line-keep");
        this.upperPlansLayerPanel.classList.remove("height-layer-panel");
        
    }

    showUpperPlansLayer() {
        this.upperPlansLayer.classList.add("height-layer");
        this.upperPlansLayerLine.classList.add("top-layer-line");
        this.upperPlansLayerPanel.classList.add("height-layer-panel");

    }
}

class MorePlansLayer extends PlansLayer {
    constructor(
        upperPlansLayer,
        upperPlansLayerLine,
        upperPlansLayerPanel,
        headerbarHeight,
        tryPrimeButtonElement,
        tryPrimeBottomHeight
    ) {
        super(
            upperPlansLayer,
            upperPlansLayerLine,
            upperPlansLayerPanel,
            headerbarHeight,
            tryPrimeButtonElement,
            tryPrimeBottomHeight
        );

        this.morePlansLayer = document.querySelector(".see-more-plans-layer");
        this.layerExpandAnchor = document.querySelector(".expand-more-plans-layer");
        this.plansLayerHeight = document.querySelector(".upper-plans-layer");
        this.initExpandMorePlansLayer();
    }

    initExpandMorePlansLayer() {
        this.openMorePlansLayer();
        this.closeMorePlansLayer();
    }

    openMorePlansLayer() {
        this.layerExpandAnchor.addEventListener("click", () => {
            this.morePlansLayer.style.height = `${window.innerHeight}px`;
            this.upperPlansLayer.style.top = this.morePlansLayer.style.height;
            this.upperPlansLayerLine.style.top = `${window.innerHeight + this.upperPlansLayer.clientHeight}px`;
            this.upperPlansLayer.classList.add("position-bottom", "position-bottom-keep");
            this.upperPlansLayerLine.classList.add("position-bottom-line", "position-bottom-line-keep");
        });
    }

    closeMorePlansLayer() {
        this.morePlansLayer.addEventListener("click", () => {
            this.morePlansLayer.style.height = "";
            this.upperPlansLayer.style.top = "";
            this.upperPlansLayerLine.style.top = "";
            this.upperPlansLayer.classList.remove("position-bottom");
            this.upperPlansLayerLine.classList.remove("position-bottom-line");
        });
    }
}

const plansLayer = new MorePlansLayer();