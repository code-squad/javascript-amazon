import { _$ } from '/util.js';
import { DataFetch } from '/fetch.js'
import { searchFetchOption } from '/config.js';


window.addEventListener("DOMContentLoaded", () => {
    const userSearch = _$('#search__input');
    userSearch.addEventListener('input', (event) => {
        if (!userSearch.value) return;
        const searchService = new DataFetch(searchFetchOption);
        searchService.fetchData()
            .then(res => res.searchData
                .filter(data => data.startsWith(userSearch.value)))
            .then(userSearchValue => console.log(userSearchValue))

    })



    const searchField = document.querySelector('.search__container')

    userSearch.addEventListener('blur', () => { searchField.classList.remove('active') })
    userSearch.addEventListener('click', () => { searchField.classList.add('active') })
})