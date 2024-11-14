import express from "express";
import {
  getAllGames,
  getGamesById,
  getGamesByTheme,
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
// router.get("/themes/:themeId", getGamesByTheme);
router.get("/:id", getGamesById);
export default router;
