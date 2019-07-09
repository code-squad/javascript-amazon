import EventEmitter from "./index.js";

const ee = new EventEmitter();

const initTest = () => {
  return ee._events;
};

const onTest = () => {
  const listenerAdd = (a, b) => a + b;
  try {
    ee.on("Add", listenerAdd);
  } catch (error) {
    return false;
  }
  return true;
};

const onTest2 = () => {
  const listenerAdd = 1;
  try {
    ee.on("Add", listenerAdd);
  } catch (error) {
    return false;
  }
  return true;
};

const emitTest = () => {
  ee.on("print", (arg) => {
    console.log(arg);
  });

  try {
    ee.emit("print", "abc");
  } catch (error) {
    return false;
  }
  return true;
}

describe("EventEmiiter Test", () => {
  test("생성 테스트", () => {
    expect(initTest()).toEqual({});
  });

  test("on() 테스트 1", () => {
    expect(onTest()).toBeTruthy();
  });

  test("on() 테스트 2", () => {
    expect(onTest2()).not.toBeTruthy();
  });

  test("emit() 테스트", () => {
    expect(emitTest()).toBeTruthy();
  })
});
