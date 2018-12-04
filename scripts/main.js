import StickyNav from './StickyNav.js';
import MegaMenu from './MegaMenu.js';

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
  stickyPlansLayer.setBodyHeight(); // Extend body height to make position:sticky work properly
  megaMenu.setBgDimHeight(); // Expand background dim div to entire viewport
  window.addEventListener('scroll', () => {
    stickyPlansLayer.updateVisibility(); // Display sticky bar on scroll
  });
});

/* Test codes */
window.tester = () => {
  window.megaMenu = megaMenu;
  window.canvas = megaMenu.canvasPath.canvas;
  window.ctx = megaMenu.canvasPath.context;
  window.detail = document.querySelector('.megaMenu__detail');
  document.querySelector('.megaMenu').classList.replace('closed', 'opened');
  document.querySelector('.megaMenu__detail').classList.add('opened');
  document.querySelector('.megaMenu__detail > .item1').classList.add('opened');
  window.canvas.classList.add('opened');
  megaMenu.canvasPath.drawThresholdToDetail({ cursorX: 50, cursorY: 50 });
};
