class Slide {
	constructor() {
        this._components = [];
    }

    registerComponent(component) {
        this._components.push(component);
        component.onNotifyIndexChanged(this._convertIndex(this._contentCount, this._currentIndex) - 1);
    }

    mediate(message, index) {
    }

    _increaseCurrentIndex() {
    }

    _decreaseCurrentIndex() {
    }

    _changeCurrentIndex(index) {
    }
}

export default Slide;