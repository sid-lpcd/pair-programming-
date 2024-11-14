import fs from "fs";

export const getAllGames = (req, res) => {
  res.json(JSON.parse(fs.readFileSync("./data/games.json")));
};

export const getGenres = (req, res) => {
  try {
    return res.json(JSON.parse(fs.readFileSync("./data/genres.json")));
  } catch (error) {
    console.error(error);
  }
};
