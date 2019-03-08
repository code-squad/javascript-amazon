// routing: 클라이언트의 요청에 대한 응답을 설정
// app.js에서의 라우팅 처리를 별도의 스크립트로 분리해서 처리하게끔 하는 것.

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('amazon_cocoa');
  // Render a view template.
  console.log('성공!'); // 터미널에 나타난다. 
});

module.exports = router;

