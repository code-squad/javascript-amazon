import { $, $$ } from '../Util.js';
import SearchView from '../views/SearchView.js';
import KeywordModel from '../models/KeywordModel.js'

export default {
    init() {
        SearchView.setup($('#search'))
            .on('@input', e => this.onInput(e.detail.input))
            .on('@keydown', () => this.onKeyDown())
            .on('@keyup', () => this.onKeyUp());
    },
    onInput(input) {
        const keywordList = [];
        if (input != '') {
            this.onSearch(input);
        }
    },
    onKeyDown() {
        console.log('keydown');
    },
    onKeyUp() {
        console.log('keyup');
    },
    onSearch(input) {
        KeywordModel.find(input)
    }
};
