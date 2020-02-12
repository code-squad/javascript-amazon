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
       return distance >= 0;
    }

    moveByDistance(distance) {
        const cardWrapper = $(".card-wrapper");
        if (this.isRightWay(distance) === true) {
            this.isPrevious = false;
            cardWrapper.style.transition = "transform 1s";
            cardWrapper.style.transform = `translateX(${-1080 * distance}px)`;
            return;    
        }
        this.isPrevious = true;
        cardWrapper.style.transition = "transform 1s";
        cardWrapper.style.transform = `translateX(${1080 * -distance}px)`;
    }

    getPreviousIndex(index) {
        return index - 1 === 0 ? 17 : index - 1;
    }

    getNextIndex(index) {
        return (index + 1) % 17 === 0 ? 17 : (index + 1) % 17;
    }

    returnCurrentIndex() {
        const selectedCard = $('.selected-card');
        const [_, targetId] = selectedCard.id.split('-');
        return parseInt(targetId);
    }

    previousButtonListener(event) {
        const currentIndex = this.returnCurrentIndex();
        this.previousIndex = currentIndex;
        this.currentIndex = this.getPreviousIndex(currentIndex);
        this.distance = -1;
        this.moveByDistance(-1);
        const selectedCard = $('.selected-card');
        selectedCard.classList.remove("selected-card");
        $(`#card-${this.currentIndex}`).classList.add('selected-card');    
    }

    nextButtonListener(event) {
        const currentIndex = this.returnCurrentIndex();
        this.previousIndex = currentIndex;
        this.currentIndex = this.getNextIndex(currentIndex);
        this.distance = 1;
        this.moveByDistance(1);
        const selectedCard = $('.selected-card');
        selectedCard.classList.remove("selected-card");
        $(`#card-${this.currentIndex}`).classList.add('selected-card');        
    }

    initializeStatus() {
        $$('.header-list').forEach(list => {
            if (list.classList.contains("header-selected")) {
                list.classList.remove("header-selected");
            }
        })

        $$('.circles').forEach(circle => {
            if (circle.classList.contains("invisible") === false) {
                circle.classList.add("invisible");
            }
        })

        $$(".dot").forEach(dot => {
            if (dot.classList.contains("selected-dot")) {
                dot.classList.remove("selected-dot");
            }
        })
    }


    transitionEndEvent(event) {
        const cardWrapper = $(".card-wrapper");
        cardWrapper.style.transition = 'none';
        const childNodes = Array.from(cardWrapper.children);
        const firstParitialList = childNodes.slice(0, Math.abs(this.distance)); 
        const firstSlide = childNodes[0];

        if (this.isPrevious === false) {
            firstParitialList.forEach(node => node.remove());
            firstParitialList.forEach(node=>cardWrapper.appendChild(node));
        } else {
            const lastParitialList = childNodes.slice(childNodes.length - Math.abs(this.distance));
            lastParitialList.forEach(node => node.remove());
            lastParitialList.forEach(node => cardWrapper.insertBefore(node, firstSlide));
        }

        this.initializeStatus();
        const target = $(`[data-id="${this.currentIndex}"]`);
        target.classList.add("selected-dot");
        target.parentNode.classList.remove("invisible");
        target.parentNode.parentNode.classList.add('header-selected');

        cardWrapper.style.transform = 'translateX(0px)';
    }

    getDistance (middle, target) {
        if (middle + 8 > 17) {
            // right
            if (middle <= target && target<= 17) {
                this.distance = (target - middle);
                return;
            } 
            if (1 <= target && target <= middle + 8 - 17) {
                this.distance = (17 + target - middle);
                return;
            }
            this.distance = (middle - target) * -1;
            return;
        }

        if (target <= middle + 8) {
            this.distance = target - middle;
            return;
        }

        if (target < middle) {
            this.distance = (middle - target) * -1;
            return;
        }
        this.distance = (17 + middle - target) * -1;
        return;
    }

    dotEventListener (event) {
        const currentIndex = this.returnCurrentIndex();
        this.previousIndex = currentIndex;
        const targetIndex = parseInt(event.target.dataset.id);
        this.currentIndex = targetIndex;
        this.getDistance(currentIndex, targetIndex);

        this.moveByDistance(this.distance);
        const selectedCard = $('.selected-card');
        selectedCard.classList.remove("selected-card");
        $(`#card-${targetIndex}`).classList.add('selected-card');
        $(`#card-${targetIndex}`).click();
    }

}