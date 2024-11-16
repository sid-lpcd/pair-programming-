import express from "express";
import {
  getAllGames,
  getGamesByGenre,
  getGamesById,
  getGamesByName,
  getGenres,
  getKeywords,
  getPlatforms,
  getThemes,
  toggleLike,
} from "../controllers/gamesController.js";

const router = express.Router();

router.get("/", getAllGames);

router.get("/genres", getGenres);
router.get("/platforms", getPlatforms);
router.get("/themes", getThemes);
router.get("/keywords", getKeywords);
router.get("/filter-by-genre", getGamesByGenre);
router.get("/name", getGamesByName);
router.get("/:id", getGamesById);
router.post("/:id/like", toggleLike);
export default router;
