import CardModel from "../Models/CardModel.js";

const initCardModel = () => {
  const cm = new CardModel();
  return cm.carouselItems;
};

describe("Carousel Model Test", () => {
  test("초기화 테스트", () => {
    expect(initCardModel()).toEqual({});
  });
});
