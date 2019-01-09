class StickyLayer{
    constructor({ stickyEl }){
        this.stickyEl = stickyEl;
        this.bPinEl = false;
        this.bHiddenbar = false;
    }

    pinElement({ thresholdEl }){
        
        return (e) => {
            const threshold = thresholdEl.offsetTop + thresholdEl.offsetHeight;
            const isPassedThreshold = window.scrollY >= threshold;

            if(isPassedThreshold && this.bPinEl) return;
            
            if(isPassedThreshold) {
                this.stickyEl.classList.add("fixed");
                this.bPinEl = true;
            }
            else {
                this.stickyEl.classList.remove("fixed");
                this.bPinEl = false;
            }
        }
    }

    displayHiddenBar({ hiddenBar, thresholdEl }){
        return (e) => {
            const threshold = thresholdEl.offsetTop + thresholdEl.offsetHeight;
            const isPassedThreshold = window.scrollY >= threshold;

            if(isPassedThreshold && this.bHiddenbar) return;

            if(isPassedThreshold) {
                hiddenBar.classList.add("visible");
                this.bHiddenbar = true;
            }
            else {
                hiddenBar.classList.remove("visible");
                this.bHiddenbar = false;
            }
        }
    }

    displayHiddenPlan(){
        const seeMoreBtn = this.stickyEl.querySelector(".bar-see-more .down-arrow");
        const hiddenPlan = this.stickyEl.querySelector(".nav-hidden-plan");
        const hiddenBar = this.stickyEl.querySelector(".nav-hidden-bar");
        const barCloseBtn = this.stickyEl.querySelector(".nav-hidden-close");
        const contentCloseBtn = this.stickyEl.querySelectorAll("#content-close-btn");
        
        seeMoreBtn.addEventListener("click", () => {
            hiddenPlan.classList.add("visible");
            hiddenBar.classList.add("hidden");
            barCloseBtn.classList.add("visible");
        });

        contentCloseBtn.forEach(el => el.addEventListener("click", () => {
            hiddenPlan.classList.remove("visible");
            hiddenBar.classList.remove("hidden");
            barCloseBtn.classList.remove("visible");
        }));
    }
}

export { StickyLayer }