class AutoModel {
    constructor(url) {
        this.api = url;
    }

    async fetchKeyword(keyword) {
        try {
            let requestKeyword = await fetch(this.api + keyword);
            let responseData = await requestKeyword.json();
            let suggestionsData = [];

            suggestionsData = responseData.body.suggestions.map(v => v.value);

            return suggestionsData;
            
        } catch(e) {
            console.log(e);
            return [];
        }
    }
}

export default AutoModel;
