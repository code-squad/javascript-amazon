import AutoListView from "./AutoListView.js";

const autoListView = new AutoListView({ maxLen: 1 });

autoListView.autoData = ["apple", "abc", "best", "bee", "character", "cat"];

describe("Autocomplete test", () => {
  test("텍스트 일치 검사", () => {
    expect(autoListView.getFilteredData("a")).toEqual(["apple", "abc", "character", "cat"]);
    expect(autoListView.getFilteredData("b")).toEqual(["abc", "best", "bee"]);
  });
});
