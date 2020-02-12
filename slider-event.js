class SliderEvent extends MyEvent {
    constructor() {
        super();
        this.isNext = false;
    }

    previousButtonListener(event) {
        this.isNext = true;
        const cardWrapper = $(".card-wrapper");
        cardWrapper.style.transition = "transform 2s";
        cardWrapper.style.transform = `translateX(1080px)`;
    }

    nextButtonListener(event) {
        this.isNext = false;
        const cardWrapper = $(".card-wrapper");
        cardWrapper.style.transition = "transform 2s";
        cardWrapper.style.transform = `translateX(-1080px)`;
    }


    transitionEndEvent(event) {
        const cardWrapper = $(".card-wrapper");
        cardWrapper.style.transition = 'none';
        const childeNodes = cardWrapper.children;
        const firstSlide = childeNodes[0];

        if (this.isNext === false) {
            firstSlide.remove();
            cardWrapper.appendChild(firstSlide);
        } else {
            const lastSlide = childeNodes[childeNodes.length - 1];
            lastSlide.remove();
            cardWrapper.insertBefore(lastSlide, firstSlide);
        }

        cardWrapper.style.transform = 'translateX(0px)';
    }

}