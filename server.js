const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const fs = require("fs");
const path = require("path");

const PORT = 8080;
const PATH_SLIDER = "/amazon/slider.json";
const JSON_PATH_SLIDER = "jsonData.json";

const app = express();

app.use(logger("dev"));

app.get(PATH_SLIDER, cors(), (_, res) => {
  const jsonPath = path.join(__dirname, JSON_PATH_SLIDER);
  const jsonData = fs.createReadStream(jsonPath);
  jsonData.pipe(res);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
