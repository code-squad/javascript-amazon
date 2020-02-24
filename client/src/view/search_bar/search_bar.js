import { $ } from "../../util/util.js";
import { URL } from "../../util/constants.js";

import css from "./search_bar.scss";

class SearchBar {
    constructor(searchList) {
        this.searchList = searchList;
    }

    inputEventListener(event) {
        const targetString = event.target.value;
        if (targetString === "") {
            $(".hitlist-wrapper").style.display = "none";
            return;
        }
        fetch(URL.DEV.API_SERVER_SEARCH.ADDRESS + targetString)
            .then(res => res.json())
            .then(titles => this.searchList.setTargetTitle(titles));
    }

    addInputEvent() {
        $('#search-bar-input').addEventListener('input', this.inputEventListener.bind(this));
    }

    render() {
        return `<div class="search-bar-wrapper">
                    <div class="category-wrapper">
                        <div class="search-bar-category">
                            <select name="category">
                                <option value="all">All</option>
                                <option value="album">Album</option>
                                <option value="app">App & Game</option>
                                <option value="book">Book</option>
                                <option value="home">Home</option>
                                <option value="sports">Sports</option>
                                <option value="software">Software</option>
                                <option value="toy">Toy</option>
                            </select>
                        </div>
                    </div>
                    <div class="input-wrapper">
                        <input id="search-bar-input" type="text"></input>
                        <div class="hitlist-wrapper"></div>
                    </div>
                    <div class="icon-wrapper">
                        <div class="search-bar-icon">
                            <i class="fas fa-search"></i>
                        </div>
                    </div>
                </div>`;
    }
}

export default SearchBar;