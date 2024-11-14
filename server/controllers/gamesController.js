import { AssertionError } from "assert";
import fs from "fs";

const games = JSON.parse(fs.readFileSync("./data/games.json"));
const genres = JSON.parse(fs.readFileSync("./data/genres.json"));
const keywords = JSON.parse(fs.readFileSync("./data/keywords.json"));
const themes = JSON.parse(fs.readFileSync("./data/themes.json"));
const platforms = JSON.parse(fs.readFileSync("./data/platforms.json"));

export const getAllGames = (req, res) => {
  try {
    return res.json(games);
  } catch (error) {
    console.error(error);
  }
};

export const getGenres = (req, res) => {
  try {
    return res.json(genres);
  } catch (error) {
    console.error(error);
  }
};
export const getKeywords = (req, res) => {
  try {
    return res.json(keywords);
  } catch (error) {
    console.error(error);
  }
};
export const getThemes = (req, res) => {
  try {
    return res.json(themes);
  } catch (error) {
    console.error(error);
  }
};
export const getPlatforms = (req, res) => {
  try {
    return res.json(platforms);
  } catch (error) {
    console.error(error);
  }
};

// const getGamesData = (category) => {
//   let items = [];

//   games.forEach((game) => {
//     if (game[category]) {
//       game[category].forEach((cat) => {
//         if (!items.includes(cat.name)) {
//           items.push(cat.name);
//         }
//       });
//     }
//   });

//   console.log(items);
//   fs.writeFileSync(`./data/${category}.json`, JSON.stringify(items));
// };

// getGamesData("genres");
