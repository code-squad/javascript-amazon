import StickyNav from './stickyNav/StickyNav.js';
import MegaMenu from './megaMenu/MegaMenu.js';
// import MiniCarousel from './miniCarousel/MiniCarousel.js';

const stickyPlansLayer = new StickyNav({
  htmlEl: document.querySelector('.stickyNav'),
  threshold:
    document.querySelector('.masthead').clientHeight
    + document.querySelector('.header').clientHeight,
});
const megaMenu = new MegaMenu({
  htmlEl: document.querySelector('.megaMenu'),
  triggerEl: document.querySelector('.megaMenu__trigger'),
  canvasEl: document.querySelector('.megaMenu__trackerCanvas'),
});

window.addEventListener('DOMContentLoaded', () => {
  stickyPlansLayer.displayDetailOnClick();
  stickyPlansLayer.closeDetailOnClick();
  megaMenu.setMenuOpenMouseEvent();
  megaMenu.setDetailOpenMouseEvent();
});
window.addEventListener('load', () => {
  stickyPlansLayer.setMainHeight(); // Extend body height to make position:sticky work properly
  megaMenu.setBgDimHeight(); // Expand background dim div to entire viewport
  window.addEventListener('scroll', () => {
    stickyPlansLayer.updateVisibility(); // Display sticky bar on scroll
  });
});
