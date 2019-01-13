class StickyLayer{
    constructor({ stickyEl }){
        this.stickyEl = stickyEl;
    }

    pinElement({ thresholdEl }){
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

    displayHiddenBar({ thresholdEl }){
        const hiddenBar = this.stickyEl.querySelector(".nav-hidden-bar");
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
        const seeMoreBtn = this.stickyEl.querySelector(".bar-see-more .down-arrow");
        const contentCloseBtn = this.stickyEl.querySelectorAll("#content-close-btn");
        
        seeMoreBtn.addEventListener("click", () => {
            this.toggleHiddenEl();
        });

        contentCloseBtn.forEach(el => el.addEventListener("click", () => {
            this.toggleHiddenEl();
        }));
    }

    toggleHiddenEl(){
        const hiddenBar = this.stickyEl.querySelector(".nav-hidden-bar");
        const hiddenPlan = this.stickyEl.querySelector(".nav-hidden-plan");
        const hiddenClose = this.stickyEl.querySelector(".nav-hidden-close");

        hiddenBar.classList.toggle("hidden");
        hiddenPlan.classList.toggle("visible");
        hiddenClose.classList.toggle("visible");
    }

    run() {
        window.addEventListener("scroll", this.pinElement({
            thresholdEl: document.querySelector(".nav-lower")
        }))

        window.addEventListener("scroll", this.displayHiddenBar({
            thresholdEl: document.querySelector(".prime-header-content .btn-prime-container")
        }))

        this.displayHiddenPlan();
    }
}

export { StickyLayer }