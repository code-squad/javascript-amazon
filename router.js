import express from "express";
import routes from "./routes.js";

const router = express.Router();

router.get("/", (req, res) => res.send("Amazon"));
router.get(routes.carouselSlider, (req, res) => res.send("carousel slider"));
router.get(routes.searchAutocomplete, (req, res) => res.send("autocomplete"));

export default router;
