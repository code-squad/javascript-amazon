import SlideComponent from "./SlideComponent.js";

const DirectionEnum = Object.freeze({"left": 0, "right": 1})

class MenuButtonManager extends SlideComponent {
	constructor(slideService, buttons) {
        super(slideService, buttons);
    }

    //Override
    _registerEventListenerOnElements(slideService, elements) {
        elements.forEach((element, index) => {
            element.addEventListener('click', event => {
                this._menuButtonHandler(event, slideService, index);
            });
        });
    }

    _menuButtonHandler(event, slideService, index) {
        slideService.mediate('changeCurrentIndex', index);
    }

    //Override
    onNotifyIndexChanged(index) {
        this._elements.forEach((element, elementIndex) => {
            element.className = elementIndex === index ? 'selected' : '';
        })
    }
}

export default MenuButtonManager;