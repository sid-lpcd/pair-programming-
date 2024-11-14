import { AssertionError } from "assert";
import fs from "fs";

const games = JSON.parse(fs.readFileSync("./data/games.json"));
// const singleGame = JSON.parse(fs.readFileSync("./data/games.json"));
// const singleGame = JSON.parse()
const genres = JSON.parse(fs.readFileSync("./data/genres.json"));
const keywords = JSON.parse(fs.readFileSync("./data/keywords.json"));
const themes = JSON.parse(fs.readFileSync("./data/themes.json"));
const platforms = JSON.parse(fs.readFileSync("./data/platforms.json"));

export const getAllGames = (req, res) => {
  return res.json(games);
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

export const getGamesByName = (req, res) => {
  try {
    const name = req.query.name;
    // const id = Number(req.params.name);

    const game = games.find((game) => game.name === name);

    if (game) {
      console.log(game);
      return res.json(game);
    } else {
      return res.status(404).json({ msg: "Game not found" });
    }
  } catch (error) {
    console.error(error);
  }
};
export const getGamesById = (req, res) => {
  try {
    const id = Number(req.params.id);

    const game = games.find((game) => game.id === id);

    if (game) {
      console.log(game);
      return res.json(game);
    } else {
      return res.status(404).json({ msg: "Game not found" });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getGamesByTheme = (req, res) => {
  try {
    console.log(req.query);

    if (req.query.themeId) {
      const filteredGames = games.filter((game) => {
        const someGames = game.themes?.some((theme) => {
          return theme.id === Number(req.query.themeId);
        });

        return someGames;
      });

      return res.json({ count: filteredGames.length, games: filteredGames });
    }

    return res.json({ count: games.length, games: games });
  } catch (error) {
    console.error(error);
  }

  // try {
  //   console.log("Hello");
  //   const themeId = req.params.themeId;
  //   console.log(themeId);
  //   const matchingGames = games.filter((game) => {
  //     console.log(game.themes);
  //     return game.themes.id.includes(themeId);
  //   });
  //   // const matchingGames = games.filter((game) => game.theme === theme);

  //   if (matchingGames.length > 0) {
  //     console.log(matchingGames);

  //     return res.json(matchingGames);
  //   } else {
  //     return res.status(404).json({ msg: "Games not found" });
  //   }
  // } catch (error) {
  //   console.error(error);
  // }
};

// export const getGamesBy = (req, res) => {
//   try {
//     const id = Number(req.params.id);

//     const game = games.find((game) => game.id === id);

//     if (game) {
//       console.log(game);
//       return res.json(game);
//     } else {
//       return res.status(404).json({ msg: "Game not found" });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// const getGamesData = (category) => {
//   let items = [];

//   games.forEach((game) => {
//     if (game[category]) {
//       game[category].forEach((cat) => {
//         if (!items.includes(cat.name)) {
//           items.push({ name: cat.name, id: cat.id });
//         }
//       });
//     }
//   });

//   console.log(items);
//   fs.writeFileSync(`./data/${category}.json`, JSON.stringify(items));
// };

// getGamesData("platforms");
