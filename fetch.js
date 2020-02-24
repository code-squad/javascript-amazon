export class CarouselService {
    constructor(dataUrl) {
        this.dataUrl = dataUrl;
    }
    //로컬스토리지 구현예정

    fetchData() {
        return fetch(this.dataUrl)
            .then(response => response.json())
            .then(carouselData => carouselData);
    }
}
