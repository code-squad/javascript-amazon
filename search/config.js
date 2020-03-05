
export const fetchInfo = {
    dataUrl: 'http://127.0.0.1:8080/search/',
    localStorageKey: 'searchData',
    requestOption : {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
        },
     }
}

export const autoCompleteInfo = {
    option:{ 
        darkBackground:'.bg',
        inputFocusClassName: 'active',
    },
    suggestionBox: '.search__autoComplete',
    selectedTermClassName: 'selected',
}

export const controllerInfo = {
    option : {
        maxSuggestionLength: 9,
        delayTime: 300,
        inputFocus: true,
    },
    searchField: '#search',
    searchInput: '#search__input',
}

// export const searchInputInfo = {
//     option:{ 
//         inputFocusClassName: 'active',
//     },
// }