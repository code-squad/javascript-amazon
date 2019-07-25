const express = require("express");
const fs = require("fs");
const path = require("path");
const router = require("./router/index");

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, "public")));
app.use("/", router);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
