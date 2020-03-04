
export const modelConfig = {
    dataUrl: 'http://127.0.0.1:8080/search/',
    localStorageKey: 'searchData',
}

export const autoCompleteConfig = {
 
        // darkBackground: {use: true, className:'.bg'},
        darkBackground:'.bg',
        inputFocusClassName: 'active',
    
    suggestionBox: '.search__autoComplete',
    selectedTermClassName: 'selected',
}

export const controllerConfig = {
        maxSuggestionLength: 9,
        delayTime: 300,
        inputFocus: true,
    
    searchField: '#search',
    searchInput: '#search__input',
}

