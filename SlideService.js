class SlideService {
	constructor(option) {
        this._topButtons = option.topElements.querySelectorAll('button');
        this._bottomButtons = option.bottomElements.querySelectorAll('button');
        this._bottomContent = option.bottomElements.querySelector("#content");

        this._onMenuButtonDownHandler(this._topButtons);
        this._onDirectionButtonDownHandler(this._bottomButtons);

        this._currentIndex = 0;
        this._setCurrentIndex(0);
    }

    _onMenuButtonDownHandler(element) {
        let buttons = element;

        for (let i = 0 ; i < buttons.length ; ++i) {
            buttons[i].addEventListener('mousedown', e => {
                this._setCurrentIndex(i);
            });
        }
    }
    
    _onDirectionButtonDownHandler(element) {
        let [left, right] = element;

        left.addEventListener('mousedown', e => {
            this._decreaseCurrentIndex();
        });

        right.addEventListener('mousedown', e => {
            this._increaseCurrentIndex();
        });
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