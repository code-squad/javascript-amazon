import carouselNav from './carouselNav.js/index.js.js';
import carouselMain from './carouselMain.js/index.js.js';

const carousel = data =>
  `
  <div class="carousel">
    ${carouselNav(data)}
    ${carouselMain(data)}
    <button class="arrow next"></button>
    <button class="arrow prev"></button>
  </div>
`;

export default carousel;
