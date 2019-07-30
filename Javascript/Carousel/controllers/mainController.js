class MainController {
    constructor(option, carousel, arrows, cardNavi) {
        this.option = option;
        this.carousel = carousel;
        this.arrows = arrows;
        this.cardNavi = cardNavi;
        this.eventSetting();
    }

    init(url) {
        let data = new Request(url)
        
        fetch(data)
            .then((response) => {
                return response.json();
            }) 
            .then((data) => {
                this.carousel.init(data);
                this.checkingOption(data);
            })
    }

    eventSetting() {
        this.arrows.arrowsEvent = this.mainEventHandler.bind(this);
        this.cardNavi.mainEvent = this.mainEventHandler.bind(this);
        this.cardNavi.setItemAttribute = this.carousel.setItemAttribute.bind(this);
    }

    checkingOption(data) {
        if(this.option.arrows) {
            this.arrows.init(this.carousel.el);
            this.carousel.setValues();
        } 

        if(this.option.cardNavi) {
            this.cardNavi.init(data);
        }  
    }

    mainEventHandler(event) {
        let distance;
        let direction;

        if(event.detail === "@next") {
            this.carousel.currentPointer -= this.carousel.elementWidth; 
            direction = 1;

        } else if(event.detail === "@prev") {
            this.carousel.currentPointer += this.carousel.elementWidth; 
            direction = -1;

        } else if(event.detail === '@cardNavi') {
            this.carousel.currentPointer = -(this.carousel.elementWidth * event.target)
            direction = Number(event.target) + 1;
        }

        distance = this.carousel.currentPointer 

        this.carousel.moveCarousel(distance, direction); 
        this.optionEvent();
    }

    optionEvent() {
        if(this.option.cardNavi) {
            let currentPosition = this.carousel.findCurrentPosition();
            this.cardNavi.scaleUp(currentPosition);
        }
    }

}

export default MainController;