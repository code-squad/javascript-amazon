import { fetchOption, carouselOption, templateOption } from './config.js';
import { $ } from '/util.js';
import { DataFetch } from './fetch.js'
import { CarouselSlider } from './carousel/slider.js'
import { CarouselCardMenu } from './carousel/cardMenu.js'
import { CarouselSliderBtn } from './carousel/sliderBtn.js'
import { CardMenuTemplate } from './template/cardMenu.js';
import { SliderTemplate } from './template/slider.js';

const init = () => {
    const carouselService = new DataFetch(fetchOption.DATA_URL);

    carouselService.fetchData()
        .then(carouselData => initTemplate(carouselData, templateOption))
        .then(() => initCarouselCardSlider(carouselOption))
        .catch((err) => console.error(err));
}

const initTemplate = (carouselData, templateOption) => {
    const dataArea = $(templateOption.DATA_AREA);
    const cardMenuData = new CardMenuTemplate(carouselData.menuData);
    const sliderData = new SliderTemplate(carouselData.contentData);

    let data = '';
    data += cardMenuData.render();
    data += sliderData.render();
    dataArea.innerHTML += data;
}

const initCarouselCardSlider = (option) => {
    const cardMenuInfo = option.cardMenuInfo;
    const sliderBtnInfo = option.sliderBtnInfo;

    const carouselSlider = new CarouselSlider(option.sliderInfo);
    const carouselCardMenu = new CarouselCardMenu({ carouselSlider, cardMenuInfo });
    const carouselSliderBtn = new CarouselSliderBtn({ carouselSlider, carouselCardMenu, sliderBtnInfo });

    carouselSlider.getSliderInfo();
    carouselSlider.cloneSlide();
    carouselCardMenu.setCardBtns();
    carouselSliderBtn.setSliderBtns();
}

window.addEventListener("DOMContentLoaded", init);