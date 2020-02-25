class SearchInputView {
    constructor() {
        this.searchInputView = null;
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

    onNotifyRenderFinished() {
        this.searchInputView = document.querySelector(".searchInputField");
    }

    onNotifySuggestionChanged(suggestion) {
    }

    onNotifyBackgroundClicked() {
    }

    onNotifyListElementClicked(target) {
        this.searchInputView.value = target.innerHTML;
    }
}

export default SearchInputView;