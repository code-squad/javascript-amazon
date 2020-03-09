import { $, $$ } from '../Util.js';
import SearchView from '../views/SearchView.js';
import ResultView from '../views/ResultView.js';
import SearchModel from '../models/SearchModel.js';

const JSON_DATA_URL =
    'https://baekcode.github.io/codesquad-FE/day4_search/keyword.json';

export default {
    init() {
        this.resultList = -1;
        SearchModel.setup(JSON_DATA_URL);
        SearchView.setup($('#search'))
            .on('@input', e => this.onInput(e.detail.input))
            .on('@keydown', () => this.onKeyDown())
            .on('@keyup', () => this.onKeyUp());
        ResultView.setup($('#search'));
    },
    onInput(input) {
        this.resultList = -1;
        return this.onSearch(input);
    },
    onKeyDown() {
        const list = $('.keyword-list.open');
        const listChild = Array.from(list.children);
        if (this.resultList === listChild.length - 1) return false;
        listChild.forEach(v => {
            if (v.classList.contains('on')) {
                v.classList.remove('on');
            }
        });
        this.resultList++;
        list.children[this.resultList].classList.add('on');
    },
    onKeyUp() {
        const list = $('.keyword-list.open');
        if (this.resultList === 0) return false;
        const listChild = Array.from(list.children);
        listChild.forEach(v => {
            if (v.classList.contains('on')) {
                v.classList.remove('on');
            }
        });
        this.resultList--;
        list.children[this.resultList].classList.add('on');
    },
    onSearch(input) {
        if (!input) return this.onResultReset();
        const resultList = [];
        SearchModel.getData().forEach(str => {
            if (str.slice(0, input.length) === input) resultList.push(str);
        });
        this.onSearchResult(resultList);
    },
    onSearchResult(list) {
        ResultView.render(list);
    },
    onResultReset() {
        ResultView.reset();
    }
};
