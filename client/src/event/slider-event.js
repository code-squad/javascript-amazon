import CoreEvent from "./core-event.js";
import { $ } from "../util/util.js";

class SliderEvent extends CoreEvent {
    constructor(isEventEnded, defaultOption = { defaultCurrentIndex : 1, defaultListLength : 17, defaultCardLength : 1080}) {
        super();

        const { defaultCurrentIndex, defaultListLength, defaultCardLength } = defaultOption;
        this.isPrevious = false;
        this.distance = 0;
        this.previousIndex = 0;
        this.currentIndex = defaultCurrentIndex;
        this.listLength = defaultListLength;
        this.halfListLength = parseInt(this.listLength / 2);
        this.selectedCard = $('.selected-card');
        this.movedFinished = true;
        this.isEventEnded = isEventEnded;
        this.cardLength = defaultCardLength;
    }

    isRightWay(distance) {
        return distance >= 0;
    }

    moveByDistance(distance) {
        const cardWrapper = $(".card-wrapper");
        if (this.isRightWay(distance) === true) {
            this.isPrevious = false;
            cardWrapper.style.transition = "transform 0.5s";
            cardWrapper.style.transform = `translateX(${-this.cardLength * distance}px)`;
            return;
        }
        this.isPrevious = true;
        cardWrapper.style.transition = "transform 0.5s";
        cardWrapper.style.transform = `translateX(${this.cardLength * -distance}px)`;
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
        if (this.isEventEnded.ended === false) {
            return;
        }
        this.isEventEnded.ended =  false;

        this.setCurrentIndexAsPreviousIndex()
        this.currentIndex = this.getPreviousIndex(this.previousIndex);
        this.distance = -1;
        this.moveByDistance(this.distance);
        this.giveSelectedClassToCurrentIndexNode();
    }

    nextButtonListener(event) {
        if (this.isEventEnded.ended === false) {
            return;
        }
        this.isEventEnded.ended =  false;

        this.setCurrentIndexAsPreviousIndex();
        this.currentIndex = this.getNextIndex(this.previousIndex);
        this.distance = 1;
        this.moveByDistance(this.distance);
        this.giveSelectedClassToCurrentIndexNode();
    }

    transitionEndEvent(event) {
        const cardWrapper = $(".card-wrapper");
        cardWrapper.style.transition = 'none';
        const childNodes = [...cardWrapper.children];
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
        
        this.isEventEnded.ended = true;
    }

    setDistanceInRevertedOrder(middle, target) {
        if (middle <= target && target <= this.listLength) {
            this.distance = (target - middle);
            return;
        }
        
        const distanceFromMiddle = middle - this.listLength;

        if (1 <= target && target <=  this.halfListLength + distanceFromMiddle) {    
            this.distance = target - distanceFromMiddle;
            return;
        }

        this.distance = (middle - target) * -1;
        return;
    }

    setDistanceInNormalOrder(middle, target) {
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

    setDistance(middle, target) {
        if (middle + this.halfListLength > this.listLength) {
            this.setDistanceInRevertedOrder(middle, target);
            return;
        }

        this.setDistanceInNormalOrder(middle, target);
    }

    hasClickedSameIndex(target) {
        return parseInt(target.dataset.id) === this.currentIndex;
    }

    smallBoxIndexEventListener(event) {
        if (this.hasClickedSameIndex(event.target) === true) {
            this.isEventEnded === true;
            return;
        }
        
        if (this.isEventEnded.ended === false) {
            return;
        }
        this.isEventEnded.ended =  false;

        this.setCurrentIndexAsPreviousIndex();
        const targetIndex = parseInt(event.target.dataset.id);
        this.currentIndex = targetIndex;

        this.setDistance(this.previousIndex, this.currentIndex);

        this.moveByDistance(this.distance);
        this.giveSelectedClassToCurrentIndexNode();

        $(`#card-${targetIndex}`).click();
    }
}

export default SliderEvent;