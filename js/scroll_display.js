let isHiddenBarShow = false;

window.addEventListener("scroll", function () {
    const navLower = document.querySelector(".nav-lower");
    const primeButton = document.querySelector(".prime-header-content .btn-prime-container");
    const layer = document.querySelector(".nav-plan-layer .nav-hidden-layer");

    const offsetForPosition = navLower.offsetTop + navLower.offsetHeight;
    const offsetForPlanLayer = primeButton.offsetTop + primeButton.offsetHeight;
    const isPassedNavLower = this.scrollY >= offsetForPosition;
    const isPassedPrimeButton = this.scrollY >= offsetForPlanLayer;
    
    if(isPassedNavLower) {
        layer.style.position = "fixed";
    } else {
        layer.style.position = "absolute";
    }

    if(isPassedPrimeButton) {
        layer.classList.add("visible");
        isHiddenBarShow = true;
    } 
    else {
        layer.classList.remove("visible");
        isHiddenBarShow = false;
    }
});