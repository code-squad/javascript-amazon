import Slide from "./Slide.js";
import DirectionButtonManager from './DirectionButtonManager.js';
import MenuButtonManager from './MenuButtonManager.js';
import SlideComponent from "./SlideComponent.js";
import SlideEnum from "./SlideEnum.js";

class SlideService extends Slide {
    constructor(url) {
        super();

        this._components = [];
        this._data = null;

        this._menuButtonManager = new MenuButtonManager(this);
        this.registerComponent(this._menuButtonManager);

        this._directionButtonManager = new DirectionButtonManager(this);
        this.registerComponent(this._directionButtonManager);

        this._currentIndex = 0;
        this._isAnimationRunning = false;
        this._contentArea = null;
        this._contentCount = 0;

        this._fetchSlideData(url);
    }

    _fetchSlideData(url) {
        if(localStorage.getItem('slideData')) {
            this._initialize(localStorage.getItem('slideData'));
        }
        else {
            fetch(url)
                .then(response => response.json())
                .then(slideData => {
                    this._setLocalstorageData(JSON.stringify(slideData));
                    this._initialize(JSON.stringify(slideData));
                });
        }
    }

    _initialize(slideData) {
        const parsedData = JSON.parse(slideData);
        this._setSlideData(parsedData);
        this._template(parsedData);

        this._currentIndex = 0;
        this._isAnimationRunning = false;
        this._contentArea = document.querySelector("#content");
        this._contentCount = this._contentArea.children.length;
        this._appendAdditionalElementsForLoop(this._contentArea);
        this._registerEventListenerOnBottomContentArea(this._contentArea);

        const generatedNumber = 1 + Math.floor(Math.random() * (this._contentCount));
        this._setCurrentIndex(generatedNumber);
    }

    _setLocalstorageData(slideData) {
        localStorage.setItem("slideData", slideData);
    }

    _setSlideData(slideData) {
        this._data = slideData.contentData;

        this._components.forEach(element => {
            element.onNotifyDataChanged(slideData);
        });
    }

    _template(slideData) {
        const result = this._menuButtonManager.render() + this._render() + this._directionButtonManager.render();

        const temp = document.querySelector(".card_navigation");
        temp.insertAdjacentHTML('afterbegin', result);

        this._components.forEach(element => {
            element.onNotifyRenderFinished(slideData);
        });
    }

    registerComponent(component) {
        if (!component instanceof SlideComponent)
            return;

        this._components.push(component);
    }

    mediate(target, index) {
        if (SlideEnum.INCREASE_CURRENT_INDEX === target) {
            this._increaseCurrentIndex();
        }
        else if (SlideEnum.DECREASE_CURRENT_INDEX === target) {
            this._decreaseCurrentIndex();
        }
        else if (SlideEnum.CHANGE_CURRENT_INDEX === target) {
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

    _render() {
        let result = `<div class="content-container"><ul id="content">`;

        this._data.forEach(element => {
            result += `<li><div class="content_wrap"><div class="image" style="background-image:Url('${element.imageUrl}'")></div><div class="container"><div class="title">${element.title}</div><ul class="description">`

            element.contents.forEach(element => {
                result += `<li>${element}</li>`
            });

            result += `</ul></div></div></li>`;            
        });

        result += `</ul></div>`;

        return result;
    }
}

export default SlideService;