import { fetchOption, carouselOption, templateOption } from './config.js';
import { $ } from '/util.js';
import { DataFetch } from './fetch.js'
import { CarouselSlider } from './carousel/slider.js'
import { CarouselCardMenu } from './carousel/cardMenu.js'
import { CarouselSliderBtn } from './carousel/sliderBtn.js'
import { CardMenuTemplate } from './template/cardMenu.js';
import { SliderTemplate } from './template/slider.js';

const init = () => {
    const carouselService = new DataFetch(fetchOption);

    carouselService.fetchData()
        .then(carouselData => initTemplate(carouselData))
        .then(() => initCarouselCardSlider())
        .catch((err) => console.error(err));
}

const initTemplate = (carouselData) => {
    const dataArea = $(templateOption.DATA_AREA);
    const cardMenuData = new CardMenuTemplate(carouselData.menuData);
    const sliderData = new SliderTemplate(carouselData.contentData);

    let data = '';
    data += cardMenuData.render();
    data += sliderData.render();
    dataArea.innerHTML = data;
}

const initCarouselCardSlider = () => {
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