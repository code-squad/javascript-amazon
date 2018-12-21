import StickyNav from './stickyNav/StickyNav.js';
import MegaMenu from './megaMenu/MegaMenu.js';
import MiniCarousel from './miniCarousel/MiniCarousel.js';
import { debounce } from './ThrottleAndDebounce.js';

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
const miniCarouselMusic = new MiniCarousel({
  htmlElSelector: '.horizontalBanners__prime-music',
  resURI: '/res/primeMusic.json',
  util: { debounce },
});
const miniCarouselOriginal = new MiniCarousel({
  htmlElSelector: '.horizontalBanners__prime-original',
  resURI: '/res/primeOriginal.json',
  util: { debounce },
});

window.addEventListener('DOMContentLoaded', () => {
  console.log('main.js - DOMContentLoaded');
  stickyPlansLayer.displayDetailOnClick();
  stickyPlansLayer.closeDetailOnClick();
  megaMenu.setMenuOpenMouseEvent();
  megaMenu.setDetailOpenMouseEvent();
  miniCarouselMusic.fetchCarouselRes();
  miniCarouselOriginal.fetchCarouselRes();
});
window.addEventListener('load', () => {
  console.log('main.js - Page load completed');
  stickyPlansLayer.setWrapperHeight(); // Extend body height to make position:sticky work properly
  stickyPlansLayer.updateListenerForVisibility('add'); // Display sticky bar on scroll
  megaMenu.setBgDimHeight(); // Expand background dim div to entire viewport
  miniCarouselMusic.initOnLoad();
  miniCarouselOriginal.initOnLoad();
});
