export default {
    setup(el) {
        this.el = el;
        this.inputElement = el.querySelector('[type=text]');
        this.onEvent();
        return this;
    },
    on(event, handler) {
        this.el.addEventListener(event, handler);
        return this;
    },
    emit(event, data) {
        const customEvent = new CustomEvent(event, { detail: data });
        this.el.dispatchEvent(customEvent);
        return this;
    },
    onEvent() {
        this.inputElement.addEventListener('input', e => {
            const value = e.target.value;
            this.emit('@input', { input: value });
        });
        this.inputElement.addEventListener('keydown', e => {
            const arrowDownKeyCode = 40;
            const arrowUpKeyCode = 38;
            if (e.keyCode === arrowDownKeyCode) this.emit('@keydown');
            if (e.keyCode === arrowUpKeyCode) this.emit('@keyup');
        });
    }
};
