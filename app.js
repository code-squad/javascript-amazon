import express from "express";
import logger from "morgan";
import router from "./router.js";
import routes from "./routes.js";

const PORT = 8080;

const app = express();

app.use(logger("dev"));

app.use(routes.amazon, router);

const handleListening = () =>
  console.log(`Listening on http://localhost:${PORT}...`);

app.listen(PORT, handleListening);
