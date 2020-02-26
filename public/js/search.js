const $$ = target => document.querySelector(target);
const search = $$('#search');
const searchInput = $$('#search input');

const localStorageSetItem = () => {
    const keywordDATA = localStorage.getItem('keywordDATA');
    if (!keywordDATA) {
        const apiServer = 'http://localhost:8081/keyword';
        fetch(apiServer)
            .then(res => res.text())
            .then(body => {
                localStorage.setItem('keywordDATA', body);
            });
    }
    return JSON.parse(keywordDATA).keyword;
};

const searchList = (el, arr) => {
    const createEl = document.createElement('div');
    createEl.classList.add('keyword-list');
    search.appendChild(createEl);
    const inputValue = e => {
        const value = e.target.value;
        const keywordList = [];
        if (value !== '') {
            createEl.classList.add('open');
            arr.forEach(str => {
                if (str.slice(0, value.length) === value) {
                    keywordList.push(str);
                }
            });
        } else {
            createEl.classList.remove('open');
        }
        const result = keywordList.reduce((acc, cur) => {
            return (acc += `<div><strong>${cur.slice(
                0,
                value.length
            )}</strong>${cur.slice(value.length, cur.length)}</div>`);
        }, '');
        return (createEl.innerHTML = result);
    };
    el.addEventListener('input', inputValue);
};
searchList(searchInput, localStorageSetItem());
