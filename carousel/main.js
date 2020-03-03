import { fetchOption, carouselOption, templateOption } from './config.js';
import { _$ } from '../util.js';
import { DataFetch } from '../fetch.js'
import { CarouselSlider } from './slider.js'
import { CarouselCardMenu } from './cardMenu.js'
import { CarouselSliderBtn } from './sliderBtn.js'
import { CardMenuTemplate } from '../template/cardMenu.js';
import { SliderTemplate } from '../template/slider.js';

export function init() {
    const carouselService = new DataFetch(fetchOption);
    carouselService.fetchData()
        .then(carouselData => initTemplate(carouselData))
        .then(() => initCarouselCardSlider())
        .catch((err) => console.error(err));
}

function initTemplate(carouselData) {
    const dataArea = _$(templateOption.dataArea);
    const cardMenuData = new CardMenuTemplate(carouselData.menuData);
    const sliderData = new SliderTemplate(carouselData.contentData);

    let data = '';
    data += cardMenuData.render();
    data += sliderData.render();
    dataArea.innerHTML = data;
}

function initCarouselCardSlider() {
    const cardMenuInfo = carouselOption.cardMenuInfo;
    const sliderBtnInfo = carouselOption.sliderBtnInfo;

    const carouselSlider = new CarouselSlider(carouselOption.sliderInfo);
    const carouselCardMenu = new CarouselCardMenu({ carouselSlider, cardMenuInfo });
    const carouselSliderBtn = new CarouselSliderBtn({ carouselSlider, carouselCardMenu, sliderBtnInfo });

    carouselSlider.getSliderInfo();
    carouselSlider.cloneSlide();
    carouselCardMenu.setCardBtns();
    carouselSliderBtn.setSliderBtns();
}

window.addEventListener("DOMContentLoaded", init);
