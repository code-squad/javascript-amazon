import carouselHeader from './carouselHeader.js';
import carouselMain from './carouselMain.js';

const carousel = data =>
  `
  <div class="carousel">
    ${carouselHeader(data)}
    ${carouselMain(data)}
    <button class="arrow next"></button>
    <button class="arrow prev"></button>
  </div>
`;

export default carousel;
