export default {
    localStorageJson() {
        const keywordDATA = localStorage.getItem('keywordDATA');
        if (!keywordDATA) {
            const apiServer =
                'https://baekcode.github.io/codesquad-FE/day4_search/keyword.json';
            fetch(apiServer)
                .then(res => res.text())
                .then(body => {
                    localStorage.setItem('keywordDATA', body);
                });
        }
    },
    find() {
        const getData = localStorage.getItem('keywordDATA');
        const getDataParse = JSON.parse(getData).keyword;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(getDataParse);
            }, 0);
        });
    }
};
