import StickyNav from './StickyNav.js';

const stickyPlansLayer = new StickyNav({
  htmlEl: document.querySelector('.stickyNav'),
  threshold:
    document.querySelector('.masthead').clientHeight
    + document.querySelector('.header').clientHeight,
});

window.addEventListener('DOMContentLoaded', () => {
  stickyPlansLayer.displayDetailOnClick();
  stickyPlansLayer.closeDetailOnClick();
});
window.addEventListener('load', () => {
  stickyPlansLayer.setBodyHeight(); // Extend body height to make position:sticky work properly
  window.addEventListener('scroll', () => {
    stickyPlansLayer.updateVisibility(); // Display sticky bar on scroll
  });
});
