import fs from "fs";

export const getAllGames = (req, res) => {
  res.json(JSON.parse(fs.readFileSync("./data/games.json")));
};
