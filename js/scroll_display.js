const navLower = document.querySelector(".nav-lower");
const primeButton = document.querySelector(".prime-header-content .btn-prime-container");
const planLayer = document.querySelector(".nav-plan-layer");
const hiddenContent = document.querySelector(".nav-hidden-plan");
const hiddenBar = document.querySelector(".nav-hidden-bar");
const barCloseBtn = document.querySelector(".nav-hidden-close");
let isHiddenBarShow = false;

window.addEventListener("scroll", showHiddenBar);

function showHiddenBar() {
    const offsetForPosition = navLower.offsetTop + navLower.offsetHeight;
    const offsetForPlanLayer = primeButton.offsetTop + primeButton.offsetHeight;
    const isPassedNavLower = this.scrollY >= offsetForPosition;
    const isPassedPrimeButton = this.scrollY >= offsetForPlanLayer;
    
    if(isPassedNavLower) planLayer.classList.add("fixed");
    else planLayer.classList.remove("fixed");

    if(isPassedPrimeButton) {
        hiddenBar.classList.replace("hidden", "visible");
        setTimeout(() => {
            if(isHiddenBarShow) hiddenBar.style.height = "4.2rem"
        }, 0);
        isHiddenBarShow = true;
    } 
    else {
        hiddenBar.style.height = "0";
        setTimeout(() => {
            if(!isHiddenBarShow) hiddenBar.classList.replace("visible", "hidden")
        }, 500);
        isHiddenBarShow = false;
    }
}

const seeMoreBtn = document.querySelector(".bar-see-more .down-arrow");

seeMoreBtn.addEventListener("click", function(){
    // window.removeEventListener("scroll", showHiddenBar);
    hiddenContent.classList.replace("hidden", "visible");
    hiddenBar.classList.replace("visible", "hidden");
    barCloseBtn.classList.replace("hidden", "visible");

    const contentCloseBtn = document.querySelectorAll("#content-close-btn");
    contentCloseBtn.forEach(el => el.addEventListener("click", function(){
        window.addEventListener("scroll", showHiddenBar);
        hiddenContent.classList.replace("visible", "hidden");
        hiddenBar.classList.replace("hidden", "visible");
        barCloseBtn.classList.replace("visible", "hidden");
    }));
})