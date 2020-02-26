const word = ['apple', 'hello', 'world', 'appstore'];
const search = document.querySelector('#search input');

const searchList = (el,arr) => {
    const createEl = document.createElement('div')
    document.body.appendChild(createEl);
    const inputValue = e => {
        const value = e.target.value;
        const result = [];
        
        arr.forEach(str => {
            if (str.slice(0, value.length) === value) {
                result.push(str);
            }
        });
        return createEl.innerHTML = result;
    };

    el.addEventListener('input', inputValue)
};
searchList(search,word);