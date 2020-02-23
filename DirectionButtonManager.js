import SlideComponent from "./SlideComponent.js";
import SlideEnum from "./SlideEnum.js";

const DirectionEnum = Object.freeze({"left": 0, "right": 1})

class DirectionButtonManager extends SlideComponent {
    constructor(slideService) {
        super(slideService);

        this._slideService = slideService;
    }

    _appendButtonHandler(event, slideService, direction) {
        if (DirectionEnum.left === direction) {
            slideService.mediate(SlideEnum.DECREASE_CURRENT_INDEX);
        }
        else if (DirectionEnum.right === direction) {
            slideService.mediate(SlideEnum.INCREASE_CURRENT_INDEX);
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
        this._registerEventListenerOnElements(this._elements);
    }

    render() {
        let result = `<button id="card_navigation_button_left" class="card_navigation_button">&#60;</button>`;
        result += `<button id="card_navigation_button_right" class="card_navigation_button">&#62;</button>`;

        return result;
    }
}

export default DirectionButtonManager;