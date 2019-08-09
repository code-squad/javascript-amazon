import SearchBox from "./src/components/SearchBox.js";
import AutoComplete from "./src/components/AutoComplete.js";
import RecentResult from "./src/components/RecentResult.js";
import EventBroker from "./eventBroker.js";

class App {
  constructor() {
    const broker = new EventBroker();
    new SearchBox(broker);
    new AutoComplete(broker);
  }
}

new App();
