export default {
    setup(el) {
        this.el = el;
        this.inputElement = el.querySelector('[type=text]');
        this.buttonElement = el.querySelector('button');
        console.log(this.el);
        console.log(this.inputElement);
        console.log(this.buttonElement);
    }
};
