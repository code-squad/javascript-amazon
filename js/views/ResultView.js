export default {
    setup(el) {
        this.el = el;
        this.createEl = document.createElement('div');
        this.createEl.classList.add('keyword-list');
        el.appendChild(this.createEl);
        return this;
    },
    render(list) {
        const result = list.reduce((acc, cur) => {
            return (acc += `<div>${cur}</div>`);
        }, '');
        // console.log(list.length);
        this.createEl.classList.add('open');
        return (this.createEl.innerHTML = result);
    },
    reset() {
        this.createEl.innerHTML = '';
        return this.createEl.classList.remove('open');
    }
};
