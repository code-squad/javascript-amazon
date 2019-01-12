import StickyNav from './stickyNav/StickyNav.js';
import MegaMenu from './megaMenu/MegaMenu.js';
import MiniCarousel from './miniCarousel/MiniCarousel.js';
import SearchAutoFill from './searchAutoFill/SearchAutoFill.js';
import settings from './settings/settings.js';

const stickyPlansLayer = new StickyNav(settings.stickyPlansLayer);
const megaMenu = new MegaMenu(settings.megaMenu);
const miniCarouselMusic = new MiniCarousel(settings.miniCarousel.music);
const miniCarouselOriginal = new MiniCarousel(settings.miniCarousel.original);
const searchAutoFill = new SearchAutoFill(settings.searchAutoFill);

window.addEventListener('DOMContentLoaded', () => {
  stickyPlansLayer.init();
  megaMenu.init();
  miniCarouselMusic.fetchCarouselRes('./res/primeMusic.json');
  miniCarouselOriginal.fetchCarouselRes('./res/primeOriginal.json');
  searchAutoFill.init();
});

window.addEventListener('load', () => {
  stickyPlansLayer.layout();
  megaMenu.setBgDimHeight(); // Expand background dim div to entire viewport
  miniCarouselMusic.initOnLoad();
  miniCarouselOriginal.initOnLoad();
});
