import PlansUI from './layer.js';
const plansUI = new PlansUI();

document.addEventListener("scroll", plansUI.showLayer.bind(plansUI));
document.addEventListener("scroll", plansUI.checkExtender.bind(plansUI));
plansUI.closeExtenderBtn.addEventListener("click", plansUI.closeExtender.bind(plansUI));
plansUI.closeExtenderBtn2.addEventListener("click", plansUI.closeExtender.bind(plansUI));
plansUI.plansMoreBtn.addEventListener("click", plansUI.showExtender.bind(plansUI));