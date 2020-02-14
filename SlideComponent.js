class SlideComponent {
	constructor(slideService, elements) {
        this._slideService = slideService;
        this._elements = elements;
        this._registerEventListenerOnElements(slideService, elements);
    }

    onNotifyIndexChanged(index) {
    }

    _registerEventListenerOnElements(elements) {
    }
}

export default SlideComponent;