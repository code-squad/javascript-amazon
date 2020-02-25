class SearchInputView {
    constructor() {
    }

    render() {
        return `
        <div class="searchBox">
            <input type="text" class="searchInputField" placeholder="What are you looking for?">
            <button type="submit" class="searchButton">
                <i class="fa fa-search"></i>
            </button>
        </div>
        `
    }
}

export default SearchInputView;