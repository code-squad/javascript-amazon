import { $, $All } from "../util.js";

class StickyLayer{
    constructor( bindTo ){
        this.stickyEl = $(bindTo);
        this.init();
    }

    init() {
        window.addEventListener("scroll", this.pinElement(".nav-lower"));
        window.addEventListener("scroll", this.displayHiddenBar(".prime-header-content .btn-prime-container"));
        this.displayHiddenPlan();
    }

    pinElement( selector ){
        const thresholdEl = $(selector);
        let bPinEl = false;

        return _ => {
            const threshold = thresholdEl.offsetTop + thresholdEl.offsetHeight;
            const isPassedThreshold = scrollY >= threshold;

            if(isPassedThreshold && bPinEl) return;
            
            if(isPassedThreshold) {
                this.stickyEl.classList.add("fixed");
                bPinEl = true;
            }
            else {
                this.stickyEl.classList.remove("fixed");
                bPinEl = false;
            }
        }
    }

    displayHiddenBar( selector ){
        const thresholdEl = $(selector);
        const hiddenBar = $(".hidden-bar", this.stickyEl);
        let bHiddenbar = false;

        return _ => {
            const threshold = thresholdEl.offsetTop + thresholdEl.offsetHeight;
            const isPassedThreshold = scrollY >= threshold;

            if(isPassedThreshold && bHiddenbar) return;

            if(isPassedThreshold) {
                hiddenBar.classList.add("visible");
                bHiddenbar = true;
            }
            else {
                hiddenBar.classList.remove("visible");
                bHiddenbar = false;
            }
        }
    }

    displayHiddenPlan(){
        const seeMoreBtn = $(".bar-see-more .down-arrow", this.stickyEl);
        const contentCloseBtn = $All("#content-close-btn", this.stickyEl);
        
        seeMoreBtn.addEventListener("click", this.toggleHiddenEl);

        contentCloseBtn.forEach(el => el.addEventListener("click", this.toggleHiddenEl));
    }

    toggleHiddenEl(){
        const hiddenBar = $(".hidden-bar", this.stickyEl);
        const hiddenPlan = $(".hidden-plan", this.stickyEl);
        const hiddenClose = $(".hidden-close", this.stickyEl);

        hiddenBar.classList.toggle("hidden");
        hiddenPlan.classList.toggle("visible");
        hiddenClose.classList.toggle("visible");
    }
}

export { StickyLayer }