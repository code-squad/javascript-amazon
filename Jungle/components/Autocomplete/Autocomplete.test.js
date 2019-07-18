import AutoListView from "./AutoListView.js";

const autoListView = new AutoListView({ maxLen: 5 });

const autoData = ["apple", "abc", "best", "bee", "character", "cat"];

describe("Autocomplete test", () => {
  test("텍스트 일치 검사", () => {
    expect(autoListView.getFilteredData("a", autoData)).toEqual([
      "apple",
      "abc",
      "cat",
      "character"
    ]);

    expect(autoListView.getFilteredData("b", autoData)).toEqual([
      "best",
      "bee",
      "abc"
    ]);
  });
});
