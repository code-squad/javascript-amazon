import SlideComponent from "./SlideComponent.js";
import SlideEnum from "./SlideEnum.js";

class MenuButtonManager extends SlideComponent {
    constructor(slideService) {
        super(slideService);

        this._slideService = slideService;
    }

    _appendButtonHandler(event, slideService, index) {
        slideService.mediate(SlideEnum.CHANGE_CURRENT_INDEX, index);
    }

    //Override
    onNotifyIndexChanged(index) {
        this._elements.forEach((element, elementIndex) => {
            element.className = elementIndex === index ? 'selected' : '';
        })
    }

    onNotifyDataChanged(slideData) {
        this._data = slideData.contentData;
    }

    onNotifyRenderFinished() {
        this._elements = document.querySelector("#menu").querySelectorAll('button');
        this._registerEventListenerOnElements(this._elements);
    }

    render() {
        let result = `<ul id="menu">`;

        for (let i = 0; i < this._data.length; ++i) {
            result += `<li><button id="button${i}">${this._data[i].title}</button></li>`;
        }

        result += `</ul>`
        return result;
    }
}

export default MenuButtonManager;