const defineProperty = require("./defineProperty");

const defineTest = () => {
  const obj = {};

  defineProperty(obj, "name", "banana");
  defineProperty(obj, "color", "yellow");
  defineProperty(obj, "taste", "sweet");

  return obj;
}

test("defined property test", () => {
  const obj = {
    name: "banana",
    color: "yellow",
    taste: "sweet"
  }
  expect(defineTest()).toEqual(obj);
});