const express = require("express");

const app = express();
const PORT = 8080;
const indexRouter = require("./routes/index");
const carouselRouter = require("./routes/carousel");
const productRouter = require("./routes/product");


app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use(express.static("client"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/carousel", carouselRouter);
app.use("/product", productRouter);


app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

module.exports = app;
