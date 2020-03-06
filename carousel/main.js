import { _$ } from "/util.js";
import { CarouselSlider } from "./slider.js";
import { CarouselCardMenu } from "./cardMenu.js";
import { CarouselSliderBtn } from "./sliderBtn.js";

export const initCarouselCardSlider = () => {
  const carouselSlider = createCarouselSlider();
  const carouselCardMenu = createCarouselCardMenu(carouselSlider);
  const carouselSliderBtn = createSliderBtn(carouselSlider, carouselCardMenu);

  carouselSlider.getSliderInfo();
  carouselSlider.cloneSlide();
  carouselCardMenu.setCardBtns();
  carouselSliderBtn.setSliderBtns();
};

const createCarouselSlider = () => {
  const sliderInfo = {
    transitionProperty: {
      name: "all",
      duration: ".3s",
      timingFunc: "ease-in-out"
    },
    selector: {
      slides: ".slider__list",
      firstClone: "slider-firstClone",
      lastClone: "slider-lastClone",
      slideItem: ".slider__item"
    }
  };

  return new CarouselSlider(sliderInfo);
};

const createCarouselCardMenu = carouselSlider => {
  const selector = {
    card: ".card-menu__card",
    cardBtn: ".card-menu__card button",
    selected: "card-menu__selected"
  };

  return new CarouselCardMenu({ carouselSlider, selector });
};

const createSliderBtn = (carouselSlider, carouselCardMenu) => {
  const selector = {
    sliderBtns: "#slider__btn button"
  };

  return new CarouselSliderBtn({ carouselSlider, carouselCardMenu, selector });
};
