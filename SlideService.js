const DirectionEnum = Object.freeze({"left": 0, "right": 1})

class SlideService {
	constructor(option) {
        this._topButtons = option.topElements.querySelectorAll('button');
        this._bottomButtons = option.bottomElements.querySelectorAll('button');
        this._bottomContent = option.bottomElements.querySelector("#content");

        this._registerEventListenerOnMenuButtons(this._topButtons);
        this._registerEventListenerOnDirectionButtons(this._bottomButtons);

        this._currentIndex = 0;
        const generatedNumber = Math.floor(Math.random() * this._topButtons.length);
        this._setCurrentIndex(generatedNumber);
    }

    _registerEventListenerOnMenuButtons(element) {
        let buttons = element;

        for (let i = 0 ; i < buttons.length ; ++i) {
            buttons[i].addEventListener('mousedown', e => {
                this._menuButtonHandler(event, i);
            });
        }
    }
    
    _registerEventListenerOnDirectionButtons(element) {
        let [left, right] = element;

        left.addEventListener('mousedown', e => {
            this._directionButtonHandler(event, DirectionEnum.left)
        });


        right.addEventListener('mousedown', e => {
            this._directionButtonHandler(event, DirectionEnum.right)
        });
    }

    _menuButtonHandler(event, index) {
        this._setCurrentIndex(index);
    }

    _directionButtonHandler(event, direction) {
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
        if (this._currentIndex < this._topButtons.length - 1) {
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
            this._setCurrentIndex(this._topButtons.length - 1);
        }
    }

    _setCurrentIndex(index) {
        this._topButtons[this._currentIndex].className = '';
        this._currentIndex = index;
        const offsetWidth = -(index * this._bottomContent.offsetWidth);
        this._bottomContent.style.marginLeft = offsetWidth + 'px';
        this._topButtons[index].className = "selected";
    }
}