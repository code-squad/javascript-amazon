const plansLayer = document.querySelector('.plans-layer');
const plansExtender = document.querySelector('.plans-extender');
const plansMoreBtn = document.querySelector('.plans-see-more');
const closeExtenderBtn = document.querySelector('.plans-extender-btn');
let isExtenderShown = false;

document.addEventListener("scroll", function () {
    if (window.scrollY > 366 && !isExtenderShown) plansLayer.classList.add('shown');
    else plansLayer.classList.remove('shown');
});

plansMoreBtn.addEventListener("click", function (){
    plansLayer.classList.remove('shown');
    plansExtender.classList.add('shown');
    isExtenderShown = true;
})

closeExtenderBtn.addEventListener("click", function(){
    plansExtender.classList.remove('shown');
    plansLayer.classList.add('shown');
    isExtenderShown = false;
})