import { $, $$ } from '../Util.js';
import SearchView from '../views/SearchView.js';

export default {
    init() {
        SearchView.setup($('#search'));
    }
};
