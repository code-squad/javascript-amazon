const express = require("express");
// node Modules Path method
const path = require("path");

const app = express();

// PUG(View) Setting 
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


app.get("/", (request, response) => {
  response.send("home");
});

app.listen(3000, function () {
  console.log("Server is listening on 3000");
});

