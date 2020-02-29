import express from "express";
import logger from "morgan";
import cors from "cors";
import path from "path";
import router from "./router.js";
import routes from "./routes.js";
import webpack from "webpack";
import webpackConfig from "./webpack.config.cjs";
import webpackMiddleware from "webpack-dev-middleware";

const PORT = 8080;

const app = express();

app.use(cors());
app.use("/build", express.static(path.join(path.resolve(), "build")));
app.use(logger("dev"));
// app.use(webpackMiddleware(webpack(webpackConfig)));

app.use(routes.amazon, router);

const handleListening = () =>
  console.log(`Listening on http://localhost:${PORT}...`);

app.listen(PORT, handleListening);
