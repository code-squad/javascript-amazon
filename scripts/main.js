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

function suggestionTemplateFn({ value, refTag }, searchWord) {
  const replaceWhiteSpace = (string, replaceChar) => string.replace(/\s/g, replaceChar);
  const ref = replaceWhiteSpace(refTag, '+');
  const fieldKeyword = replaceWhiteSpace(value, '+');
  const prefix = replaceWhiteSpace(searchWord, '+');

  const leftoverStr = value.slice(searchWord.length);
  const displayVal = `<span class="search__suggestion--matchStr">${searchWord}</span>`
    + `<span class="search__suggestion--otherStr">${leftoverStr}</span>`;

  return `
  <li class="search__suggestionLi">
    <a href="/search?ref=${ref}&field-keywords=${fieldKeyword}&prefix=${prefix}">${displayVal}</a>
  </li>`;
}
const searchAutoFill = new SearchAutoFill({
  apiURI: 'https://codesquadacapi.herokuapp.com/ac/',
  el: {
    inputEl: document.querySelector('.search__input'),
    suggestionWrapperEl: document.querySelector('.search__suggestion'),
  },
  suggestionTemplateFn,
  awaitTiming: 500,
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
