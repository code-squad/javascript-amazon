import { StickyLayer } from "./module/StickyLayer.js"
import { Scroll } from "./module/Scroll.js"

window.addEventListener("load", () => {
    const scroll = new Scroll;
    const stickyLayer = new StickyLayer({
        stickyEl: document.querySelector(".nav-plan-layer")
    });

    scroll.addEvent(
        stickyLayer.pinElement({
            thresholdEl: document.querySelector(".nav-lower")
        }),
        stickyLayer.displayHiddenBar({
            hiddenBar: stickyLayer.stickyEl.querySelector(".nav-hidden-bar"),
            thresholdEl: document.querySelector(".prime-header-content .btn-prime-container")
        })
    );
 
    stickyLayer.displayHiddenPlan();
})