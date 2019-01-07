import StickyNav from './stickyNav/StickyNav.js';
import MegaMenu from './megaMenu/MegaMenu.js';
import MiniCarousel from './miniCarousel/MiniCarousel.js';
import SearchAutoFill from './searchAutoFill/SearchAutoFill.js';

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

/* miniCarousel setup */
const miniCarouselTiming = {
  autoRotationTiming: 3000, // ms
  autoRotationDebounce: 5000, // ms
};
const miniCarouselMusic = new MiniCarousel({
  htmlElSelector: '.horizontalBanners__prime-music',
  timer: miniCarouselTiming,
});
const miniCarouselOriginal = new MiniCarousel({
  htmlElSelector: '.horizontalBanners__prime-original',
  timer: miniCarouselTiming,
});

const searchAutoFill = new SearchAutoFill({
  apiURI: 'http://crong.codesquad.kr:8080/amazon/ac/',
  el: {
    inputEl: document.querySelector('.search__input'),
    suggestionWrapperEl: document.querySelector('.search__suggestion'),
  },
  suggestionTemplateFn: ({ value, refTag }) => `<li><a href="/${refTag}">${value}</a></li>`,
});

window.addEventListener('DOMContentLoaded', () => {
  stickyPlansLayer.displayDetailOnClick();
  stickyPlansLayer.closeDetailOnClick();
  megaMenu.setMenuOpenMouseEvent();
  megaMenu.setDetailOpenMouseEvent();
  miniCarouselMusic.fetchCarouselRes('./res/primeMusic.json');
  miniCarouselOriginal.fetchCarouselRes('./res/primeOriginal.json');
  searchAutoFill.init();
});
window.addEventListener('load', () => {
  stickyPlansLayer.setWrapperHeight(); // Extend body height to make position:sticky work properly
  stickyPlansLayer.updateListenerForVisibility('add'); // Display sticky bar on scroll
  megaMenu.setBgDimHeight(); // Expand background dim div to entire viewport
  miniCarouselMusic.initOnLoad();
  miniCarouselOriginal.initOnLoad();
});
