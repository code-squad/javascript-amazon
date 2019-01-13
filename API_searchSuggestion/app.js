const express = require('express');
const router = require('./router/index');

const app = express();

const port = process.env.PORT ? process.env.PORT : 3030;

app.listen(port, () => {
  console.log(`Server opened on port ${port}`);
});

app.use(express.static('public'));
app.use(router);
