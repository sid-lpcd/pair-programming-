import express from "express";
import { getAllGames, getGenres } from "../controllers/gamesController.js";

const router = express.Router();

router.get("/", getAllGames);

// router.get("/genres", getGenres);

export default router;

//genres
//keywords
// platforms
// themes
