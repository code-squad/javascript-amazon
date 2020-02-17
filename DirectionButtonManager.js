import SlideComponent from "./SlideComponent.js";

const DirectionEnum = Object.freeze({"left": 0, "right": 1})

class DirectionButtonManager extends SlideComponent {
	constructor(slideService, buttons) {
        super(slideService, buttons);
    }

    //Override
    _registerEventListenerOnElements(slideService, elements) {
        elements.forEach((element, index) => {
            element.addEventListener('click', event => {
                this._directionButtonHandler(event, slideService, index);
            });
        });
    }

    _directionButtonHandler(event, slideService, direction) {
        if (DirectionEnum.left === direction) {
            slideService.mediate('decreaseCurrentIndex');
        }
        else if (DirectionEnum.right === direction) {
            slideService.mediate('increaseCurrentIndex');
        }
        else {
            throw new Error("Undefined button.");
        }
    }
}

export default DirectionButtonManager;