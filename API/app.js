const express = require("express");
const app = express();
const router = require("./router/index.js");

app.use(express.static('public'));
app.use(router);

const port = process.env.PORT ? process.env.PORT : 5000;

app.listen(port, function () {
  console.log(`Server is listening on ${port}`);
});
