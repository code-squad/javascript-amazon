import SearchBox from "./src/components/SearchBox.js";
import AutoComplete from "./src/components/AutoComplete.js";
import RecentResult from "./src/components/RecentResult.js";

class App {
  constructor() {
    new SearchBox();
    new AutoComplete("ipho");
  }
}

new App();
