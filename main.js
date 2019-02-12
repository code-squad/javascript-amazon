import PlansUI from './test.js';
const plansUI = new PlansUI();


document.addEventListener("scroll", plansUI.controlLayer.bind(plansUI));
plansUI.closeExtenderBtn.addEventListener("click", plansUI.controlClosingExtender.bind(plansUI));
plansUI.closeExtenderBtn2.addEventListener("click", plansUI.controlClosingExtender.bind(plansUI));
plansUI.plansMoreBtn.addEventListener("click", plansUI.showExtender.bind(plansUI));
