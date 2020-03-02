import express from "express";
import logger from "morgan";
import cors from "cors";
import path from "path";
import router from "./router.js";
import routes from "./routes.js";

const PORT = 8080;

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use("/build", express.static(path.join(path.resolve(), "build")));

app.use(routes.amazon, router);

const handleListening = () => console.log(`Listening on http://localhost:${PORT}...`);

app.listen(process.env.PORT || PORT, handleListening);
