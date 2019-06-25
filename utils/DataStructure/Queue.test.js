const Queue = require("./Queue");

const testQ = new Queue();

test("큐에 1 푸쉬하기", () => {
  testQ.enqueue(1);
  expect(testQ.top()).toBe(1);
});

test("큐에 2 푸쉬하기", () => {
  testQ.enqueue(2);
  expect(testQ.top()).toBe(2);
});

test("큐에 3 푸쉬하기", () => {
  testQ.enqueue(3);
  expect(testQ.top()).toBe(3);
});

test("큐 팝하기", () => {
  testQ.dequeue();
  expect(testQ.front()).toBe(2);
});

test("큐 팝하기", () => {
  testQ.dequeue();
  expect(testQ.front()).toBe(3);
});

test("empty test", () => {
  testQ.dequeue();
  expect(testQ.empty()).toBeTruthy();
  testQ.enqueue(1);
  expect(testQ.empty()).toBeFalsy();
});

test("clear test", () => {
  testQ.enqueue(2);
  testQ.enqueue(3);
  testQ.enqueue(123);
  testQ.clear();
  expect(testQ.empty()).toBeTruthy();
});