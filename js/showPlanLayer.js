import Event from "./module/PlanLayer.js"

window.addEventListener("DOMContentLoaded", () => {
    const planLayer = document.querySelector(".nav-plan-layer");
    const event = new Event(planLayer);
    window.addEventListener("scroll", event.pinElement());
    window.addEventListener("scroll", event.displayHiddenBar());  
    event.displayHiddenPlan();
})
