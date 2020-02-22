import SlideComponent from "./SlideComponent.js";

const DirectionEnum = Object.freeze({"left": 0, "right": 1})

class MenuButtonManager extends SlideComponent {
    constructor(slideService) {
        super(slideService);

        this._slideService = slideService;
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

    onNotifyDataChanged(slideData) {
        this._data = slideData.contentData;
    }

    onNotifyRenderFinished() {
        this._elements = document.querySelector("#menu").querySelectorAll('button');
        this._registerEventListenerOnElements(this._slideService, this._elements);
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