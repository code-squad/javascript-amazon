import { _$, _$e, _$c, __$ } from '/util.js';
// import { searchFetchOption } from '/config.js';

export function SearchController({ model, inputView, autoCompleteView, controllerOption }) {
    this.model = model;
    // this.inputVeiw = inputView;
    this.autoCompleteView = autoCompleteView;
    // this.option = controllerConfig;
    this.keyDownCount = 0;
}

// 클릭시 백그라운드 컬러 변경

SearchController.prototype = {

    onAutoCompleteEvent() {
        const searchInput = _$('#search__input');
        const searchField = _$('#search');

        __$(searchInput).on('click', () => _$c(searchField).add('active'));
        __$(searchInput).on('blur', () => {
            _$c(searchField).remove('active')
            this.autoCompleteView.hideSuggestions()
        });
        __$(searchInput).on('input', () => _$e.debounce(300, this, this.getSearchTerms));

        __$(searchField).on('keydown', (e) => {
            const a = e.currentTarget.childNodes[3].childNodes
            const aLength = e.currentTarget.childNodes[3].childNodes.length
            if (e.keyCode === 40) {
                this.keyDownCount++;
                if (!a[this.keyDownCount - 1] || aLength < this.keyDownCount) {
                    this.autoCompleteView.hideSelected();
                    return this.keyDownCount = 0;
                }
                this.autoCompleteView.showSelected(a[this.keyDownCount - 1]);
            } else if (e.keyCode === 38) {
                this.keyDownCount--;
                if (!a[this.keyDownCount - 1]) {
                    this.autoCompleteView.hideSelected();
                    return this.keyDownCount = aLength + 1;
                }
                this.autoCompleteView.showSelected(a[this.keyDownCount - 1]);
            } else if (e.keyCode === 13) {
                e.preventDefault();
                this.autoCompleteView.SelecteSearchTerm(e.target, a[this.keyDownCount - 1])
            }
        });
    },

    getSearchTerms() {
        const searchInput = _$('#search__input');
        const searchTerm = searchInput.value;
        this.keyDownCount = 0;
        if (!searchTerm) return this.autoCompleteView.hideSuggestions();

        const terms = this.model.findMatchingTerms(searchTerm);
        terms.then(terms => {
            if (terms.length === 0) return this.autoCompleteView.hideSuggestions();
            const slicedTerms = terms.slice(0, 9);

            //해당하는 문자 색바꾸기 
            const length = searchTerm.length
            ///
            console.log(length)
            this.autoCompleteView.render(slicedTerms, length);

        })
    }
}

