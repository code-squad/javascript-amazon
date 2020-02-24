export class DataFetch {
    constructor(dataUrl) {
        this.dataUrl = dataUrl;
    }

    getLocalStorageData(localStorageCarouselData) {
        return new Promise((resolve, reject) => {
            try {
                resolve(JSON.parse(localStorageCarouselData));
            } catch {
                reject('localStorage에 저장된 무언가는 있지만 실패..');
            }
        })
    }

    fetchData() {
        const CAROUSEL_DATA = 'carouselData';
        const localStorageCarouselData = localStorage.getItem(CAROUSEL_DATA);

        if (!localStorageCarouselData) {
            return fetch(this.dataUrl)
                .then(response => response.json())
                .then(carouselData => {
                    localStorage.setItem(CAROUSEL_DATA, JSON.stringify(carouselData));
                    return carouselData
                })
        } else {
            return this.getLocalStorageData(localStorageCarouselData);
        }
    }
}
