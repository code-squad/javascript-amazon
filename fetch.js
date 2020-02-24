export class DataFetch {
    constructor({ DATA_URL, LOCAL_STORAGE_KEY }) {
        this.dataUrl = DATA_URL;
        this.localStorageKey = LOCAL_STORAGE_KEY;
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

    fetchData() {
        const localStorageValue = localStorage.getItem(this.localStorageKey);

        if (!localStorageValue) {
            return fetch(this.dataUrl)
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
                    return data
                })
        } else {
            return this.getLocalStorageData(localStorageValue);
        }
    }
}
