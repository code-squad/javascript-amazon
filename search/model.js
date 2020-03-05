import { _$ } from '/util.js';
import { DataFetch } from '/fetch.js'
import { fetchInfo } from './config.js';

export function SearchModel() {
    this.fetchInfo = fetchInfo;
}

SearchModel.prototype = {
    findMatchingTerms(searchTerm) {
        const userSearchTerm = searchTerm.toLowerCase();
        const searchTerms = new DataFetch(this.fetchInfo);

        return searchTerms.fetchData()
            .then(terms => terms.searchData
                .filter(term => term.startsWith(userSearchTerm))
            )
    }
}
