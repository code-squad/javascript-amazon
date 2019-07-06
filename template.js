class MakeTemplate {
    constructor() {
        this.navigation = document.querySelector('.navigation-list');
        this.carousel = document.querySelector('.carousel');
    }

    init(data) {
        this.specifyData(data);
        this.buildNavi();
        this.buildCarousel();
    }    

    specifyData(data) {
        this.naviInfo = [];
        this.carouselInfo = [];
        
        data.forEach((element) => {
            let carouselInfoObj = {
                'imgURL' : element.imgURL,
                'mainTitle' : element.mainTitle,
                'mainDesc' : element.mainDesc
            }

            this.extractInfo(this.naviInfo, element.navTitle);
            this.extractInfo(this.carouselInfo, carouselInfoObj);
        });
    }

    extractInfo(targetArray, element) {
        targetArray.push(element);
    }

    buildNavi() {
        this.naviInfo.forEach((v) => {
            v = this.getNaviItemHTML(v);
            this.navigation.innerHTML += v;
        })
    }
    buildCarousel() {
        this.carouselInfo.forEach((v) => {
            v = this.getCarouselItemHTML(v);
            this.carousel.innerHTML += v;
        })
    }

    getNaviItemHTML(item) {
        return `<li class="item">${item}</li>`
    }
    
    getCarouselItemHTML(item) {
        let desc = item.mainDesc.reduce((bef, aft) => {
            bef += `<li>${aft}</li>`
            return bef;
        }, '<ul>') + '</ul>';

        return `
            <li class="carousel-item">
                <div class="info-img">
                    <img src="${item.imgURL}">
                </div>
                <div class="info-text">
                    <h3>${item.mainTitle}</h3>
                    ${desc}
                </div>
            </li>`
    }
}


export default MakeTemplate;

