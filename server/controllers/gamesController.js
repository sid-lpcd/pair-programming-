import { AssertionError } from "assert";
import fs from "fs";

const games = JSON.parse(fs.readFileSync("./data/games.json"));

export const getAllGames = (req, res) => {
  return res.json(games);
};

export const getGenres = (req, res) => {
  let genres = [];

  try {
    return res.json(JSON.parse(fs.readFileSync("./data/games.json")));
  } catch (error) {
    console.error(error);
  }
};

// const getThemes = () => {
//   const themes = [];

//   games.forEach((game) => {
//     if (game.themes) {
//       game.themes.forEach((theme) => {
//         if (!themes.includes(theme.name)) {
//           themes.push(theme.name);
//         }
//       });
//     }
//   });

//   fs.writeFileSync("./data/genres.json", JSON.stringify(themes));
// };

// getThemes();

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

// getGamesData("themes");
