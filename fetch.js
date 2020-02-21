class CarouselService {
    constructor(dataUrl) {
        this.dataUrl = dataUrl;
    }

    fetchData() {
        fetch(this.dataUrl)
            .then(response => response.json())
            .then(carouselData => {
                templateCarousel(carouselData);
                setCarousel();
                return carouselData;
            })
    }
}

function init() {
    const DATA_URL = 'http://127.0.0.1:8080/'
    const carouselService = new CarouselService(DATA_URL);

    carouselService.fetchData();
}

window.addEventListener("DOMContentLoaded", init) 