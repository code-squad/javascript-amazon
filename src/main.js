import './assets/sass/main.scss';

if (module.hot) {
  module.hot.accept()
}

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector('.test__link-nav');
  const popup = document.querySelector('.test__link-popup');
  const plans = document.querySelector('.plans');
  nav.addEventListener("click", (e) => {
    console.log(plans);
    plans.classList.toggle('plans--scroll');
  })
  popup.addEventListener("click", (e) => {
    plans.classList.toggle('plans--open');
  })
});
