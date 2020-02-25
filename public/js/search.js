const word = ['apple', 'hello', 'world', 'appstore'];
const search = document.querySelector('#search input');

const inputValue = e => {
    const value = e.target.value;
    const result = [];
    word.forEach(str => {
        if (str.slice(0, value.length) === value) {
            result.push(str);
        }
    });
    console.log(result);
    return result;
};

search.addEventListener('input', inputValue);
