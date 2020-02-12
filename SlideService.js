const DirectionEnum = Object.freeze({"left": 0, "right": 1})

class SlideService {
	constructor(option) {
        this._menuButtons = option.topElements.querySelectorAll('button');
        this._directionButtons = option.bottomElements.querySelectorAll('button');
        this._bottomContentArea = option.bottomElements.querySelector("#content");

        this._registerEventListenerOnMenuButtons(this._menuButtons);
        this._registerEventListenerOnDirectionButtons(this._directionButtons);
        this._appendAdditionalElementsForLoop(this._bottomContentArea);
        this._registerEventListenerOnBottomContentArea(this._bottomContentArea);

        this._isAnimationRunning = false;

        const generatedNumber = 1 + Math.floor(Math.random() * (this._menuButtons.length));
        this._initElementStatus(generatedNumber);
    }

    _initElementStatus(index) {
        this._menuButtons[index - 1].className = 'selected';

        const offsetWidth = -(index * this._bottomContentArea.offsetWidth);
        this._bottomContentArea.style.marginLeft = offsetWidth + 'px';

        this._currentIndex = index;
    }

    _onTransitionEnd(event) {
        this._bottomContentArea.style.transition = "none";
        this._bottomContentArea.style.marginLeft = -(this._currentIndex * this._bottomContentArea.offsetWidth) + 'px';

        this._isAnimationRunning = false;
    }

    _registerEventListenerOnBottomContentArea(element) {
        element.addEventListener('transitionend', event => {
            this._onTransitionEnd(event);
        });
    }

    _appendAdditionalElementsForLoop(elements) {
        const clonedFirstElementChild = elements.firstElementChild.cloneNode(true);
        const clonedLastElementChild = elements.lastElementChild.cloneNode(true);

        elements.appendChild(clonedFirstElementChild);
        elements.insertBefore(clonedLastElementChild, elements.firstElementChild);
    }

    _registerEventListenerOnMenuButtons(elements) {
        elements.forEach((element, index) => {
            element.addEventListener('click', event => {
                this._menuButtonHandler(event, index);
            });
        });
    }
    
    _registerEventListenerOnDirectionButtons(elements) {
        elements.forEach((element, index) => {
            element.addEventListener('click', event => {
                this._directionButtonHandler(event, index);
            });
        });
    }

    _menuButtonHandler(event, index) {
        if (true === this._isAnimationRunning)
            return;

        this._setCurrentIndex(index + 1);
    }

    _directionButtonHandler(event, direction) {
        if (true === this._isAnimationRunning)
            return;

        if (DirectionEnum.left === direction) {
            this._decreaseCurrentIndex();
        }
        else if (DirectionEnum.right === direction) {
            this._increaseCurrentIndex();
        }
        else {
            //Unexpected Flow.
        }
    }

    _increaseCurrentIndex() {
        if (this._currentIndex < this._menuButtons.length + 1) {
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
            this._setCurrentIndex(this._menuButtons.length - 1);
        }
    }

    _setCurrentIndex(index) {
        if (true === this._isAnimationRunning || this._currentIndex === index)
            return;

        this._isAnimationRunning = true;
        this._changeButtonStatus(this._currentIndex, index);
        this._changeContentArea(index);
        this._currentIndex = this._convertIndex(this._menuButtons.length, index);
    }

    _changeButtonStatus(currentIndex, nextIndex) {
        let cvtNextIndex = this._convertIndex(this._menuButtons.length, nextIndex);

        this._menuButtons[currentIndex - 1].className = '';
        this._menuButtons[cvtNextIndex - 1].className = 'selected';
    }

    _changeContentArea(index) {
        this._bottomContentArea.style.transition = "margin-left 0.25s ease";

        const offsetWidth = -(index * this._bottomContentArea.offsetWidth);
        this._bottomContentArea.style.marginLeft = offsetWidth + 'px';
    }

    _convertIndex(menuCount, index) {
        let convertedIndex = 0;

        if (menuCount < index) {
            convertedIndex = 1;
        }
        else if (1 > index) {
            convertedIndex = 4;
        }
        else {
            convertedIndex = index;
        }

        return convertedIndex;
    }
}