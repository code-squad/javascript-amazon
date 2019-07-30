const express = require('express');
const app = express();
const path = require('path')
const indexRouter = require('./routes/index');

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);

app.listen(3000, () => {
  console.log("Start server on port 3000!!");
});