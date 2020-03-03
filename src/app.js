import express from "express";
import logger from "morgan";
import cors from "cors";
import path from "path";
import router from "./router.js";
import routes from "./routes.js";

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.static(path.join(path.resolve(), "src", "build")));
app.use(routes.amazon, router);

export default app;
