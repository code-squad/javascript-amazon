import { $, $$ } from '../Util.js';
import SearchView from '../views/SearchView.js';
import ResultView from '../views/ResultView.js';
import SearchModel from '../models/SearchModel.js';

export default {
    init() {
        SearchModel.localStorageJson();
        SearchView.setup($('#search'))
            .on('@input', e => this.onInput(e.detail.input))
            .on('@keydown', () => this.onKeyDown())
            .on('@keyup', () => this.onKeyUp());
        ResultView.setup($('#search'));
    },
    onInput(input) {
        return this.onSearch(input);
    },
    onKeyDown() {
        console.log('keydown');
    },
    onKeyUp() {
        console.log('keyup');
    },
    onSearch(input) {
        if (!input) return this.onResultReset();
        SearchModel.find().then(data => {
            const list = [];
            data.forEach(str => {
                if (str.slice(0, input.length) === input) {
                    list.push(str);
                }
            });
            this.onSearchResult(list);
        });
    },
    onSearchResult(list) {
        ResultView.render(list);
    },
    onResultReset() {
        ResultView.reset();
    }
};
