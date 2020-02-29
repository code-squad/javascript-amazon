import { $, $$ } from '../Util.js';
import SearchView from '../views/SearchView.js';

export default {
    init() {
        SearchView.setup($('#search'))
            .on('@input', e => this.onInput(e.detail.input))
            .on('@keydown', () => this.onKeyDown())
            .on('@keyup', () => this.onKeyUp())
    },
    onInput(input) {
        console.log('controller',input);
    },
    onKeyDown() {
        console.log('keydown');
    },
    onKeyUp() {
        console.log('keyup');
    }
};
