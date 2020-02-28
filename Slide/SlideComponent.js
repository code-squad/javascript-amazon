class SlideComponent {
    constructor(slideService) {
        this._elements = null;
        this._data = null;
    }

    onNotifyIndexChanged(index) {
    }

    onNotifyDataChanged(data) {
    }

    onNotifyRenderFinished() {
    }

    _registerEventListenerOnElements(elements) {
        elements.forEach((element, index) => {
            element.addEventListener('click', event => {
                this._appendButtonHandler(event, this._slideService, index);
            });
        });
    }

    render() {
    }

    _appendButtonHandler() {
    }
}

export default SlideComponent;