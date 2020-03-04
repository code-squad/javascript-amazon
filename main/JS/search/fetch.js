import util from "../util.js";
import searchData from "./searchData.js";

import SearchView from "./searchView.js";
import AutoView from "./autoView.js";

import SearchUI from "./searchUI.js";
import AutoUI from "./autoUI.js";

const searchForm = util.$(".search-form");

const searchView = new SearchView(searchForm);
const autoView = new AutoView(searchForm);
searchView.innerHTML();
autoView.innerHTML();

const listFrom = util.$(".auto_list");
const inputDOM = util.$(".search_input");

const test1 = new SearchUI(inputDOM, listFrom, searchData);
const test2 = new AutoUI(listFrom);

test1.onSearchEvent(test2.insertListData);
test1.onKeydownEvent();
