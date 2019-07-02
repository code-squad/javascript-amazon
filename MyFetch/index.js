import MyPromise from "../MyPromise/index.js";
import errMsg from "../constants/ErrorMessages.js";
import type from "../constants/TypesString.js";

const defaultOptions = {
  method: "GET"
}

function MyFetch(url, options) {
  if(!url) new Error(errMsg.fetch.NO_URL);
  const mergedOption = {...defaultOptions, options};

  return new MyPromise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.addEventListener("load", () => {
      let data = JSON.parse(req.responseText);
      if(typeof data !== type.OBJECT) reject(errMsg.fetch.DATA_TYPE);
      else resolve(data);
    });
    req.open(mergedOption.method, url);
    req.send();
  })
}

export default MyFetch;