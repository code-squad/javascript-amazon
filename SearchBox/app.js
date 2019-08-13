import EventBroker from "./EventBroker.js";
import SearchBoxController from "./SearchBoxController.js";

import InputFormView from "./src/components/InputFormView.js";
import AutoCompleteView from "./src/components/AutoCompleteView.js";
import RecentResultView from "./src/components/RecentResultView.js";

import AutoCompleteModel from "./src/components/AutoCompleteModel.js";
import RecentResultModel from "./src/components/RecentResultModel.js";

class App {
  constructor() {
    new SearchBoxController({
      broker: new EventBroker(),
      inputFormView: new InputFormView(),
      recentResultView: new RecentResultView(),
      recentResultModel: new RecentResultModel(),
      autoCompleteView: new AutoCompleteView(),
      autoCompleteModel: new AutoCompleteModel()
    });
  }
}

new App();
