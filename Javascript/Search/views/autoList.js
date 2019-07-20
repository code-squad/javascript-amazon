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

        let node;
        data.forEach((v) => {
            if(v.includes(target)) {
                node = `<li>${v}</li>`;
                node = node.replace(target, `<strong>${target}</strong>`);
            } else {
                node = ''
            }

            this.list.innerHTML += node;
        })

        
    }

    hide() {
        this.list.innerHTML = '';
        this.list.style.display = 'none';
    }

}

export default AutoList;