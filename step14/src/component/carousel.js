import carouselNav from './Nav/NavTPL.js';
import carouselMain from './Main/MainTPL.js';

const carousel = data =>
  `
  <div class="carousel">
    ${carouselNav(data)}
    ${carouselMain(data)}
    <div class="arrow-wrapper">
      <button class="arrow next" data-direction="next"></button>
      <button class="arrow prev" data-driection="prev" ></button>
    </div>
    
  </div>
`;

export default carousel;
