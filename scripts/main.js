import StickyNav from './stickyNav/StickyNav.js';
import MegaMenu from './megaMenu/MegaMenu.js';
import MiniCarousel from './miniCarousel/MiniCarousel.js';

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
});
const miniCarouselOriginal = new MiniCarousel({
  htmlElSelector: '.horizontalBanners__prime-original',
});

window.addEventListener('DOMContentLoaded', () => {
  stickyPlansLayer.displayDetailOnClick();
  stickyPlansLayer.closeDetailOnClick();
  megaMenu.setMenuOpenMouseEvent();
  megaMenu.setDetailOpenMouseEvent();
  miniCarouselMusic.fetchCarouselRes('./res/primeMusic.json');
  miniCarouselOriginal.fetchCarouselRes('./res/primeOriginal.json');
});
window.addEventListener('load', () => {
  stickyPlansLayer.setWrapperHeight(); // Extend body height to make position:sticky work properly
  stickyPlansLayer.updateListenerForVisibility('add'); // Display sticky bar on scroll
  megaMenu.setBgDimHeight(); // Expand background dim div to entire viewport
  miniCarouselMusic.initOnLoad();
  miniCarouselOriginal.initOnLoad();
});
