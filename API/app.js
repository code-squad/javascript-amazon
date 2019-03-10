const express = require('express');
const app = express();
const path = require('path')
const router = require('./router/index');

app.listen(8080, () => {
  console.log("Start server on port 8080!!");
});

app.use(express.static('public'));
app.use(router);