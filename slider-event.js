class SliderEvent extends MyEvent {
    constructor() {
        super();
        this.isPrevious = false;
        this.distance = 0;
        this.previousIndex = 0;
        this.currentIndex = 0;
    }

    // From this point, 8 === half of the list length. It needs a change!!
    isRightWay (distance) {
        return 0 < distance && distance <= 8;
    }

    moveByDistance(currentIndex, distance) {
        const cardWrapper = $(".card-wrapper");
        if (this.isRightWay(distance) === true) {
            this.isPrevious = false;
            cardWrapper.style.transition = "transform 2s";
            cardWrapper.style.transform = `translateX(${-1080 * distance}px)`;
            return;    
        }
        this.isPrevious = true;
        cardWrapper.style.transition = "transform 2s";
        cardWrapper.style.transform = `translateX(${1080 * -distance}px)`;
    }

    getPreviousIndex(index) {
        return index - 1 === 0 ? 17 : index - 1;
    }

    getNextIndex(index) {
        return (index + 1) % 17;
    }

    previousButtonListener(event) {
        const selectedCard = $('.selected-card');
        const currentIndex = parseInt(selectedCard.id[selectedCard.id.length - 1]);
        this.previousIndex = currentIndex;
        this.distance = 1;
        this.moveByDistance(currentIndex, -1);
        selectedCard.classList.remove("selected-card");
        $(`#card-${this.getPreviousIndex(currentIndex)}`).classList.add('selected-card');    
    }

    nextButtonListener(event) {
        const selectedCard = $('.selected-card');
        const currentIndex = parseInt(selectedCard.id[selectedCard.id.length - 1]);
        this.previousIndex = currentIndex;
        this.distance = 1;
        this.moveByDistance(currentIndex, 1);
        selectedCard.classList.remove("selected-card");
        $(`#card-${this.getNextIndex(currentIndex)}`).classList.add('selected-card');
    }


    transitionEndEvent(event) {
        const cardWrapper = $(".card-wrapper");
        cardWrapper.style.transition = 'none';
        const childNodes = Array.from(cardWrapper.children);
        const firstParitialList = childNodes.slice(0, this.distance); 
        const firstSlide = childNodes[0];

        if (this.isPrevious === false) {
            //firstSlide.remove();
            //cardWrapper.appendChild(firstSlide);
            firstParitialList.forEach(node => node.remove());
            firstParitialList.forEach(node=>cardWrapper.appendChild(node));
        } else {
            // const lastSlide = childeNodes[childeNodes.length - 1];
            // lastSlide.remove();
            // cardWrapper.insertBefore(lastSlide, firstSlide);
            const lastParitialList = childNodes.slice(childNodes.length - distance);
            lastParitialList.forEach(node => node.remove());
            lastParitialList.forEach(node => cardWrapper.insertBefore(node, firstSlide));
        }

        cardWrapper.style.transform = 'translateX(0px)';
    }

}