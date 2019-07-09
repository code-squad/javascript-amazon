import RecentModel from "./RecentModel.js";

const recentModelInit = () => {
  const rm = new RecentModel({ maxLen: 5 });
  return rm.queue;
};

const recentModelPush = () => {
  const rm = new RecentModel({ maxLen: 5 });

  rm.push(1);
  rm.push(2);
  rm.push(3);
  rm.push(4);
  rm.push(5);

  return rm.queue;
};

const recentModelOverPush = () => {
  const rm = new RecentModel({ maxLen: 5 });

  rm.push(1);
  rm.push(2);
  rm.push(3);
  rm.push(4);
  rm.push(5);
  rm.push(6);
  rm.push(7);
  rm.push(8);
  rm.push(9);

  return rm.queue;
};

describe("RecentModel Test", () => {
  test("생성 테스트", () => {
    expect(recentModelInit()).toEqual([]);
  });

  test("push 테스트", () => {
    expect(recentModelPush()).toEqual([1, 2, 3, 4, 5]);
  });

  test("over push 테스트", () => {
    expect(recentModelOverPush()).toEqual([5, 6, 7, 8, 9]);
  });
});
