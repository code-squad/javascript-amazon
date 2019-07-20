class SearchList {
    constructor() {
        this.currentPointer = 0;
        this.status = false;
    }

    focus(direction) {
        let itemsCount = this.list.children.length;
        this.list.children[this.currentPointer].classList.remove('focus');

        if(direction === 'up') {
            this.focusUp(itemsCount)

        } else if(direction === 'down') {
            this.focusDown(itemsCount);
        }

        this.list.children[this.currentPointer].classList.add('focus');
        this.status = true;

        return this.list.children[this.currentPointer].innerText;
    }

    focusUp(itemsCount) {
        if(this.status) {
            if(this.currentPointer === 0) {
                this.currentPointer = itemsCount - 1;
            } else {
                this.currentPointer -= 1;
            }

        } else {
            this.currentPointer = itemsCount - 1;
        }
    }

    focusDown(itemsCount) {
        if(this.status) {
            if(this.currentPointer === (itemsCount - 1)) {
                this.currentPointer = 0;
            } else {
                this.currentPointer += 1;
            }

        } else {
            this.currentPointer = 0;
        }   
    }

}

export default SearchList;