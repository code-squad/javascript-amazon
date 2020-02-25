var express = require('express');
var cors = require('cors');
var app = express();
const port = 8080;

app.use(cors());
app.use(express.static('public'));

app.get('/products/:id', function (req, res, next) {
  res.json({ msg: 'This is CORS-enabled for all origins!' });
})

app.listen(port, function () {
  console.log(`${port} 서버 시작`);
})

module.exports = app;