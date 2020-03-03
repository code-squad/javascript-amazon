export default {
    setup() {
        this.keywordDATA = localStorage.getItem('keywordDATA');
        if (!this.keywordDATA) {
            const apiServer =
                'https://baekcode.github.io/codesquad-FE/day4_search/keyword.json';
            fetch(apiServer)
                .then(res => res.text())
                .then(body => localStorage.setItem('keywordDATA', body));
        }
        return this;
    },
    find() {
        const getData = this.keywordDATA;
        const getDataParse = JSON.parse(getData).keyword;
        return new Promise((resolve, reject) => resolve(getDataParse));
    }
};
