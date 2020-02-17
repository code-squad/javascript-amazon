import Slide from "./Slide.js";

const DirectionEnum = Object.freeze({"left": 0, "right": 1})

class SlideService extends Slide {
    constructor(contentArea) {
        super();

        this._components = [];
        this._currentIndex = 0;
        this._isAnimationRunning = false;
        this._contentArea = contentArea;
        this._contentCount = this._contentArea.children.length;

        this._appendAdditionalElementsForLoop(this._contentArea);
        this._registerEventListenerOnBottomContentArea(this._contentArea);

        const generatedNumber = 1 + Math.floor(Math.random() * (this._contentCount));
        this._setCurrentIndex(generatedNumber);
    }

    registerComponent(component) {
        this._components.push(component);
        component.onNotifyIndexChanged(this._convertIndex(this._contentCount, this._currentIndex) - 1);
    }

    mediate(message, index) {
        if ('increaseCurrentIndex' === message) {
            this._increaseCurrentIndex();
        }
        else if ('decreaseCurrentIndex' === message) {
            this._decreaseCurrentIndex();
        }
        else if ('changeCurrentIndex' === message) {
            this._changeCurrentIndex(index);
        }
        else {
            throw new Error("Undefined Interface");
        }
    }

    _increaseCurrentIndex() {
        if (this._currentIndex < this._contentCount + 1) {
            this._setCurrentIndex(this._currentIndex + 1);
        }
        else {
            this._setCurrentIndex(0);
        }
     }

    _decreaseCurrentIndex() {
        if (this._currentIndex > 0) {
            this._setCurrentIndex(this._currentIndex - 1);
        }
        else {
            this._setCurrentIndex(this._contentCount - 1);
        }
    }

    _changeCurrentIndex(index) {
        this._setCurrentIndex(index + 1);
    }

    _appendAdditionalElementsForLoop(elements) {
        const clonedFirstElementChild = elements.firstElementChild.cloneNode(true);
        const clonedLastElementChild = elements.lastElementChild.cloneNode(true);

        elements.appendChild(clonedFirstElementChild);
        elements.insertBefore(clonedLastElementChild, elements.firstElementChild);
    }

    _registerEventListenerOnBottomContentArea(element) {
        element.addEventListener('transitionstart', event => {
            this._onTransitionStart(event);
        });

        element.addEventListener('transitionend', event => {
            this._onTransitionEnd(event);
        });
    }

    _setCurrentIndex(index) {
        if (this._isAnimationRunning || this._currentIndex === index)
            return;

        this._components.forEach(element => {
            element.onNotifyIndexChanged(this._convertIndex(this._contentCount, index) - 1);
        });
        this._changeContentArea(index);
        this._currentIndex = this._convertIndex(this._contentCount, index);
    }

    _convertIndex(menuCount, index) {
        let convertedIndex = 0;

        if (menuCount < index) {
            convertedIndex = 1;
        }
        else if (1 > index) {
            convertedIndex = menuCount;
        }
        else {
            convertedIndex = index;
        }

        return convertedIndex;
    }

    _changeContentArea(index) {
        this._contentArea.style.transition = "margin-left 0.25s ease";

        const offsetWidth = -(index * this._contentArea.offsetWidth);
        this._contentArea.style.marginLeft = offsetWidth + 'px';
    }

    _onTransitionStart(event) {
        this._isAnimationRunning = true;
    }

    _onTransitionEnd(event) {
        this._contentArea.style.transition = "none";
        this._contentArea.style.marginLeft = -(this._currentIndex * this._contentArea.offsetWidth) + 'px';

        this._isAnimationRunning = false;
    }
}

export default SlideService;