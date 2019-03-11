const express = require('express');
const app = express();
const router = express.Router();
const dbAPI = require("../response.json")

// node Modules Path method
const path = require('path');

// Set URL
const setURL = "crong.codesquad.kr:8080/amazon/ac/";

// PUG(View) Setting 
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// request 요청시 response를 잘 받았는지 확인을 위한 기능
router.get("/", (request, response) => {
  response.send("right Signal!!");
});

router.get("/:inputWord", (request, response) => {
  let inputData = request.params.inputWord;
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, HEAD');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const responseData = response.json(dbAPI[inputData]);
  // 파싱한 데이터를 JS파일로 보내거나 활용 
  // response.end(JSON.stringify(dbAPI[inputData]));
  response.send(responseData);
});

// 무언가 데이터를 송신시 암호화 과정을 거친뒤 POST로 송신
router.post("");

module.exports = router;
