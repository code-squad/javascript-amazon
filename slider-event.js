class SliderEvent extends MyEvent {
    constructor() {
        super();
        this.isPrevious = false;
        this.distance = 0;
        this.previousIndex = 0;
        this.currentIndex = 0;
        this.listLength = 17;
        this.halfListLength = parseInt(this.listLength / 2);
        this.selectedCard = $('.selected-card');
    }

    isRightWay(distance) {
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
        return index - 1 === 0 ? this.listLength : index - 1;
    }

    getNextIndex(index) {
        return (index + 1) % this.listLength === 0 ? this.listLength : (index + 1) % this.listLength;
    }

    returnCurrentIndex() {
        const [_, targetId] = this.selectedCard.id.split('-');
        return parseInt(targetId);
    }

    giveSelectedClassToCurrentIndexNode() {
        this.selectedCard.classList.remove("selected-card");
        this.selectedCard = $(`#card-${this.currentIndex}`);
        this.selectedCard.classList.add('selected-card');
    }

    setCurrentIndexAsPreviousIndex() {
        const currentIndex = this.returnCurrentIndex();
        this.previousIndex = currentIndex;
    }

    previousButtonListener(event) {
        this.setCurrentIndexAsPreviousIndex()
        this.currentIndex = this.getPreviousIndex(this.previousIndex);
        this.distance = -1;
        this.moveByDistance(-1);
        this.giveSelectedClassToCurrentIndexNode();
    }

    nextButtonListener(event) {
        this.setCurrentIndexAsPreviousIndex();
        this.currentIndex = this.getNextIndex(this.previousIndex);
        this.distance = 1;
        this.moveByDistance(1);
        this.giveSelectedClassToCurrentIndexNode();
    }

    transitionEndEvent(event) {
        const cardWrapper = $(".card-wrapper");
        cardWrapper.style.transition = 'none';
        const childNodes = Array.from(cardWrapper.children);
        const firstParitialList = childNodes.slice(0, Math.abs(this.distance));
        const firstSlide = childNodes[0];

        if (!this.isPrevious) {
            firstParitialList.forEach(node => node.remove());
            firstParitialList.forEach(node => cardWrapper.appendChild(node));
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

    getDistanceInRevertedOrder(middle, target) {
        if (middle <= target && target <= this.listLength) {
            this.distance = (target - middle);
            return;
        }
        if (1 <= target && target <= middle + this.halfListLength - this.listLength) {
            this.distance = (this.listLength + target - middle);
            return;
        }
        this.distance = (middle - target) * -1;
        return;
    }

    getDistanceInNormalOrder(middle, target) {
        if (target <= middle + this.halfListLength) {
            this.distance = target - middle;
            return;
        }

        if (target < middle) {
            this.distance = (middle - target) * -1;
            return;
        }

        this.distance = (this.listLength + middle - target) * -1;
        return;
    }

    getDistance(middle, target) {
        if (middle + this.halfListLength > this.listLength) {
            this.getDistanceInRevertedOrder(middle, target);
        }

        this.getDistanceInNormalOrder(middle, target);
    }

    dotEventListener(event) {
        this.setCurrentIndexAsPreviousIndex();
        const targetIndex = parseInt(event.target.dataset.id);
        this.currentIndex = targetIndex;

        this.getDistance(this.previousIndex, this.currentIndex);

        this.moveByDistance(this.distance);
        this.giveSelectedClassToCurrentIndexNode();

        $(`#card-${targetIndex}`).click();
    }
}