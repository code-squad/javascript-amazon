const plansLayer = document.querySelector('.plans-layer');

window.addEventListener("scroll", function (e) {
    if (window.scrollY > 366) plansLayer.classList.add('shown');
    else plansLayer.classList.remove('shown');
});

const seeMoreBtn = document.querySelector('.plans-see-more-txt');
const plansPopUp = document.querySelector('.plans-pop-up');
const closePopUpBtn = document.querySelector('.pop-up-btn');
const header = document.querySelector('.header')

seeMoreBtn.addEventListener("click", function () {
    plansPopUp.classList.add('shown');
});

closePopUpBtn.addEventListener("click", function (e) {
    plansPopUp.classList.remove('shown');
})