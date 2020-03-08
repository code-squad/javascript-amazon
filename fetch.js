export class DataFetch {
    constructor({ dataUrl, localStorageKey,requestOption}) {
        this.dataUrl = dataUrl;
        this.localStorageKey = localStorageKey;
        this.requestOption = requestOption;
    }

    fetchData() {
        const localStorageValue = localStorage.getItem(this.localStorageKey);

        if (!localStorageValue) {
            return fetch(this.dataUrl, this.requestOption)
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
                    return data
                })
        } else {
            return this.getLocalStorageData(localStorageValue);
        }
    }

    getLocalStorageData(localStorageValue) {
        return new Promise((resolve, reject) => {
            try {
                resolve(JSON.parse(localStorageValue));
            } catch {
                reject('localStorage에 저장된 무언가는 있지만 실패..');
            }
        })
    }
}
