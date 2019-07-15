import MyPromise from "../MyPromise/index.js";

export default function(time) {
  return new MyPromise(resolve => setTimeout(resolve, time));
}