import SearchList from "./searchList.js"

class RecentList extends SearchList {
    constructor(el) {
        super();
        this.el = el;
        this.list = this.el.querySelector('.recent-list');
    }

    render(data) {
        if(data.length === 0) {
            this.list.style.display = 'block';
            return;
        }

        let node;
        data.forEach((v) => {
            node = `<li>${v}</li>`;
            this.list.innerHTML += node;
        })
        this.list.style.display = 'block';
    }

    hide() {
        this.list.innerHTML = '';
        this.list.style.display = 'none';
        this.status = false;
        this.currentPointer = 0;
    }
}

export default RecentList;