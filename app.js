import express from "express";
import logger from "morgan";

const PORT = 8080;

const app = express();

app.use(logger("dev"));

const handleListening = () =>
  console.log(`Listening on http://localhost:${PORT}...`);

app.listen(PORT, handleListening);
