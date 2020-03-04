export default {
    setup(jsonDataUrl) {
        if (!this.getLocalStorageData) {
            this.onFetch(jsonDataUrl);
        }
        this.getLocalStorageData = localStorage.getItem('keyword_json');
        return this;
    },
    onFetch(url) {
        fetch(url)
            .then(res => res.text())
            .then(data => {
                localStorage.setItem('keyword_json', data);
            });
    },
    getData() {
        return JSON.parse(localStorage.getItem('keyword_json')).keyword;
    }
};
