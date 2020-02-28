export default {
    setup(el) {
        this.el = el;
        this.inputElement = el.querySelector('[type=text]');
        this.bindEvent();
        return this;
    },
    bindEvent() {
        this.inputElement.addEventListener('input', e => {
            const value = e.target.value;
            console.log(value);
        });
        this.inputElement.addEventListener('keydown', e => {
            if (e.keyCode === 40) {
                console.log('방향키 다운');
            }
            if (e.keyCode === 38) {
                console.log('방향키 업');
            }
        });
    }
};
