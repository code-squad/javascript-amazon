import express from "express";
import routes from "./routes.js";
import { getSearchData } from "./controllers/searchController.js";

const router = express.Router();

router.get("/", (req, res) => res.send("Amazon"));
router.get(routes.search, getSearchData);

export default router;
