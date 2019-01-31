const plansLayer = document.querySelector('.plans-layer');

window.addEventListener("scroll", function (e) {
    if (window.scrollY > 366) plansLayer.classList.add('shown');
    else plansLayer.classList.remove('shown');
});

const seeMoreBtn = document.querySelector('.plans-see-more-txt');
const plansExtender = document.querySelector('.plans-extender');
const closeExtenderBtn = document.querySelector('.plans-extender-btn');
const header = document.querySelector('.header')

document.addEventListener("scroll", function () {
    const plansExtenderShown = document.querySelector('.plans-extender.shown');
    if (window.scrollY < 99 && plansExtenderShown) {
        plansExtender.style.position = 'absolute';
        plansExtender.style.top = '6.5rem';
        header.style.position = 'relative';
        plansExtenderShown.style.transition = "none";
    }
    else if (plansExtenderShown) {
        plansExtender.style.position = 'fixed';
        plansExtender.style.top = '0';
        header.style.position = '';
        plansExtenderShown.style.transition = "all 0.5s ease-in-out;";
    }
});

seeMoreBtn.addEventListener("click", function () {
    plansExtender.classList.add('shown');
});

closeExtenderBtn.addEventListener("click", function (e) {
    plansExtender.classList.remove('shown');
})