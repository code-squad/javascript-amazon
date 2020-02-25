import SearchEnum from "./SearchEnum.js";

class SearchController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.render();
    }
}

export default SearchController;
