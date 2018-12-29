let isHiddenBarShow = false;

window.addEventListener("scroll", function () {
    const navLower = document.querySelector(".nav-lower");
    const primeButton = document.querySelector(".prime-header-content .btn-prime-container");
    const hiddenBar = document.querySelector(".nav-hidden-bar");
    const hiddenBarWrapper = document.querySelector(".bar-wrapper");

    const offsetForPosition = navLower.offsetTop + navLower.offsetHeight;
    const offsetForPlanLayer = primeButton.offsetTop + primeButton.offsetHeight;
    const isPassedNavLower = this.scrollY >= offsetForPosition;
    const isPassedPrimeButton = this.scrollY >= offsetForPlanLayer;
    
    if(isPassedNavLower) hiddenBarWrapper.style.position = "fixed";
    else hiddenBarWrapper.style.position = "absolute";

    if(isPassedPrimeButton) {
        hiddenBar.classList.replace("hidden", "visible");
        isHiddenBarShow = true;
    } 
    else {
        hiddenBar.classList.replace("visible", "hidden");
        isHiddenBarShow = false;
    }
});