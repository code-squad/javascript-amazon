import { _$ } from '/util.js';
import { DataFetch } from '/fetch.js'

export function SearchModel(modelOption) {
    this.modelOption = modelOption;
}

SearchModel.prototype = {
    findMatchingTerms(searchTerm) {
        const userSearchTerm = searchTerm.toLowerCase();
        const searchTerms = new DataFetch(this.modelOption);

        return searchTerms.fetchData()
            .then(terms => terms.searchData
                .filter(term => term.startsWith(userSearchTerm))
            )
    }
}

