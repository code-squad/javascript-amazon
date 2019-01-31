const plansLayer = document.querySelector('.plans-layer');
const plansExtender = document.querySelector('.plans-extender');
const plansMoreBtn = document.querySelector('.plans-see-more');
const closeExtenderBtn = document.querySelector('.plans-extender-btn');
let isExtenderShown = false;

document.addEventListener("scroll", function () {
    console.log(window.scrollY)
    if (isExtenderShown) {
        if(window.scrollY < 99) plansExtender.classList.add('top');
        else plansExtender.classList.remove('top');
    }
    else if (!isExtenderShown){
        if (window.scrollY > 366) plansLayer.classList.add('shown');
        else plansLayer.classList.remove('shown');
    }
});

plansMoreBtn.addEventListener("click", function (){
    plansLayer.classList.remove('shown');
    plansExtender.classList.add('shown');
    isExtenderShown = true;
})

closeExtenderBtn.addEventListener("click", function(){
    if (window.scrollY > 366) {
        plansExtender.classList.remove('shown');
        plansLayer.classList.add('shown');
        plansExtender.classList.remove('top');
        isExtenderShown = false;
    }
    else {
        plansExtender.classList.remove('shown');
        plansExtender.classList.remove('top');
        isExtenderShown = false;
    }
})