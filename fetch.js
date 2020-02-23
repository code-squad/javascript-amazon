class CarouselService {
    constructor(dataUrl) {
        this.dataUrl = dataUrl;
    }
    //로컬스토리지 구현예정
    setCarouselService(carouselData) {
        const templateManager = new TemplateManager({ carouselData, templateOption });
        templateManager.init();

        const carouselManager = new CarouselManager(carouselOption);
        carouselManager.init();
    }

    fetchData() {
        fetch(this.dataUrl)
            .then(response => response.json())
            .then(carouselData => this.setCarouselService(carouselData))
    }
}


function init() {
    const DATA_URL = 'http://127.0.0.1:8080/';
    const carouselService = new CarouselService(DATA_URL);

    carouselService.fetchData();
}

const $ = (selector, all) => {
    return all ? document.querySelectorAll(selector) : document.querySelector(selector);
}

window.addEventListener("DOMContentLoaded", init);