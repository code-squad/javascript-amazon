import SearchList from "./searchList.js"

class AutoList extends SearchList {
    constructor(el) {
        super();
        this.el = el;
        this.list = this.el.querySelector('.auto-complete-list');
        this.currentInput = "";
    }

    render(target, data) {
        if(!data || data === this.currenInput) {
            return;
        }

        this.currentInput = data;
        this.list.style.display = 'block';

        const node = data
            .filter(v => v.includes(target))
            .reduce((acc, cur)  => {
                cur = cur.replace(target, `<strong>${target}</strong>`);
                cur = `<li>${cur}</li>`;
                acc += cur;
                return acc;
            }, '')

        this.list.innerHTML = node;        
    }
}

export default AutoList;