const express = require("express");
const path = require("path");

const app = express();
app.use(express.static("resources"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "resources/html", "search.html"));
});
app.listen(8080, () => {
  console.log("Express App on port 8080!");
});
