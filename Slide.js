class Slide {
	constructor() {
        this._components = [];
        this._currentIndex = 0;
        this._contentCount = 0;
        this._isAnimationRunning = false;
        this._contentArea = null;
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