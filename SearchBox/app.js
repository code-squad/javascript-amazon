import InputFormView from "./src/components/InputFormView.js";
import AutoCompleteView from "./src/components/AutoCompleteView.js";
import RecentResultView from "./src/components/RecentResultView.js";
import EventBroker from "./EventBroker.js";
import SearchBoxController from "./SearchBoxController.js";
import AutoCompleteModel from "./src/components/AutoCompleteModel.js";
class App {
  constructor() {
    new SearchBoxController({
      broker: new EventBroker(),
      inputFormView: new InputFormView(),
      autoCompleteView: new AutoCompleteView(),
      autoCompleteModel: new AutoCompleteModel()
    });
  }
}

new App();
