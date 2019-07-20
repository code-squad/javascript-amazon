class SearchForm {
    constructor(el) {
        this.el = el
        this.inputEl = this.el.getElementsByTagName('input')[0];
        this.focusEvent = null;
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        this.inputEl.addEventListener('focus', () => {
            this.focusEvent({'detail' : '@onFocus'});       
        })

        this.inputEl.addEventListener('blur', () => {
            this.focusEvent({'detail' : '@outFocus'});
        })

        this.inputEl.addEventListener('keyup', (evt) => {
            this.focusEvent({
                'detail' : '@onKeyUp',
                'target' : evt.key
            })
        })
    }
}

export default SearchForm; 