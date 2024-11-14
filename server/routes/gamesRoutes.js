import express from "express";
import {
  getAllGames,
  getGenres,
  getKeywords,
  getPlatforms,
  getThemes,
} from "../controllers/gamesController.js";

const router = express.Router();

router.get("/", getAllGames);

router.get("/genres", getGenres);
router.get("/platforms", getPlatforms);
router.get("/themes", getThemes);
router.get("/keywords", getKeywords);

export default router;
