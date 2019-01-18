
// scroll Event(hidden Menu)
const upperPlansLayer = document.querySelector(".upper-plans-layer");
const upperPlansLayerLine = document.querySelector(".upper-plans-layer-line");
const upperPlansLayerPanel = document.querySelector(".upper-plans-layer-panel");
const headerbarHeight = document.querySelector("#header-bar").clientHeight; 
const tryPrimeButtonElement = document.querySelector("#try-prime-button");
const tryPrimeBottomHeight = tryPrimeButtonElement.offsetHeight + tryPrimeButtonElement.offsetTop + headerbarHeight;


function showUpperPlansLayer() {
    if (window.pageYOffset < headerbarHeight) {
        upperPlansLayer.classList.remove("scroll-position-fixed-upper-plans-layer");
        upperPlansLayerLine.classList.remove("scroll-position-fixed-upper-plans-layer-line"); 
    }
    if (window.pageYOffset >= headerbarHeight && window.pageYOffset < tryPrimeBottomHeight) {
        upperPlansLayer.classList.add("scroll-position-fixed-upper-plans-layer");
        upperPlansLayerLine.classList.add("scroll-position-fixed-upper-plans-layer-line");
        upperPlansLayer.classList.remove("scroll-height-upper-plans-layer", "upper-plans-layer-position-bottom", "upper-plans-layer-position-bottom-keep");
        upperPlansLayerLine.classList.remove("scroll-height-upper-plans-layer-line", "upper-plans-layer-line-position-bottom", "upper-plans-layer-line-position-bottom-keep");
        upperPlansLayerPanel.classList.remove("upper-plans-layer-panel-expand");
    }
    if (window.pageYOffset >= tryPrimeBottomHeight) {
        upperPlansLayer.classList.add("scroll-height-upper-plans-layer");
        upperPlansLayerLine.classList.add("scroll-height-upper-plans-layer-line");
        upperPlansLayerPanel.classList.add("upper-plans-layer-panel-expand");
    }
}

window.addEventListener("scroll", showUpperPlansLayer);


// 클릭했을 때 펼치지는 이벤트
const morePlansLayer = document.querySelector(".see-more-plans-layer");
const layerExpandAnchor = document.querySelector(".expand-more-plans-layer");
const plansLayerHeight = document.querySelector(".upper-plans-layer");

function expandMorePlansLayer() {
    morePlansLayer.style.height = `${window.innerHeight}px`;
    upperPlansLayer.style.top = morePlansLayer.style.height;
    upperPlansLayerLine.style.top = `${window.innerHeight + upperPlansLayer.clientHeight}px`;

    upperPlansLayer.classList.add("upper-plans-layer-position-bottom", "upper-plans-layer-position-bottom-keep");
    upperPlansLayerLine.classList.add("upper-plans-layer-line-position-bottom", "upper-plans-layer-line-position-bottom-keep");
}

layerExpandAnchor.addEventListener("click", expandMorePlansLayer);


// 클릭했을 때 접혀지는 이벤트
const closingAreaMorePlansLayer = document.querySelector(".see-more-plans-layer");

function closeMorePlansLayer() {
    morePlansLayer.style.height = "";
    upperPlansLayer.style.top = "";
    upperPlansLayerLine.style.top = "";
    upperPlansLayer.classList.remove("upper-plans-layer-position-bottom");
    upperPlansLayerLine.classList.remove("upper-plans-layer-line-position-bottom");
}

closingAreaMorePlansLayer.addEventListener("click", closeMorePlansLayer);





