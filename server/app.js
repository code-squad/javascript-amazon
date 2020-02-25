var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

var wordSearchRouter = require('./routes/wordSearch');

const port = 8080;

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.raw());
app.use(bodyParser.text());

app.use('/wordSearch', wordSearchRouter);

app.listen(port, function () {
  console.log(`${port} 서버 시작`);
})

module.exports = app;