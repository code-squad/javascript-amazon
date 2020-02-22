import SlideComponent from "./SlideComponent.js";

const DirectionEnum = Object.freeze({"left": 0, "right": 1})

class DirectionButtonManager extends SlideComponent {
    constructor(slideService) {
        super(slideService);

        this._slideService = slideService;
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

    onNotifyDataChanged(data) {
        this._data = data.menuData;
    }

    onNotifyRenderFinished() {
        this._elements = document.querySelector(".card_navigation").querySelectorAll('.card_navigation_button');
        this._registerEventListenerOnElements(this._slideService, this._elements);
    }

    render() {
        let result = `<button id="card_navigation_button_left" class="card_navigation_button">&#60;</button>`;
        result += `<button id="card_navigation_button_right" class="card_navigation_button">&#62;</button>`;

        return result;
    }
}

export default DirectionButtonManager;