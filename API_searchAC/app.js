const express = require('express');
const router = require('./router/index');

const app = express();

app.listen(8080, () => {
  console.log('Server has started: port 8080');
});

app.use(express.static('public'));
app.use(router);
