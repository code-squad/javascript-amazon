import { _$ } from '/util.js';
import { DataFetch } from '/fetch.js'

export function SearchModel(modelOption) {
    this.modelOption = modelOption;
}

SearchModel.prototype = {
    findMatchingWords(searchWord) {
        const userSearchWord = searchWord.toLowerCase();
        const searchWords = new DataFetch(this.modelOption);
        return searchWords.fetchData()
            .then(words => words.searchData
                .filter(word => word.startsWith(userSearchWord)))
    }
}

