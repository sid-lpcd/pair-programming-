import fs from "fs";

const games = JSON.parse(fs.readFileSync("./data/games.json"));
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
      return res.json([game]);
    } else {
      return res.status(404).json({ msg: "Game not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

export const toggleLike = (req, res) => {
  try {
    const id = Number(req.params.id);

    const gamesUpdate = games.map((game) => {
      game.id === id ? (game.like = !game.like) : null;
      return game;
    });
    // fs.writeFileSync(`./data/games.json`, JSON.stringify(gamesUpdate));

    return res.status(201).send("Sucessfully updated likes");
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

export const getGamesByGenre = (req, res) => {
  let newGamesFiltered = [];
  try {
    const { filters } = req.query;

    if (!filters) {
      return res.json(games);
    }

    const filterArray = Array.isArray(filters) ? filters : [filters];

    if (filterArray) {
      console.log(filterArray);

      newGamesFiltered = games.filter((game) =>
        filterArray.some((filter) => {
          let genresArr = [];
          if (game.genres?.length) {
            genresArr = game.genres?.map((genre) => genre.name);
          }
          return genresArr.includes(filter);
        })
      );
      newGamesFiltered.sort((a, b) => {
        const aFilterCount = filterArray.reduce(
          (count, filter) =>
            a.genres?.map((genre) => genre.name).includes(filter)
              ? count + 1
              : count,
          0
        );
        const bFilterCount = filterArray.reduce(
          (count, filter) =>
            b.genres?.map((genre) => genre.name).includes(filter)
              ? count + 1
              : count,
          0
        );
        return bFilterCount - aFilterCount;
      });
      console.log(filterArray.length);
      return filterArray.length ? res.json(newGamesFiltered) : res.json(games);
    }
    res.status(400).send("Bad Request: No Filters");
  } catch (error) {
    res.status(500).send("Server Crached");
  }
};

// const getGamesData = (category) => {
//   let items = [];

//   games.forEach((game) => {
//     if (game[category]) {
//       game[category].forEach((cat) => {
//         if (!items.map((item) => item.name).includes(cat.name)) {
//           items.push({ name: cat.name, id: cat.id });
//         }
//       });
//     }
//   });

//   console.log(games);
//   fs.writeFileSync(`./data/${category}.json`, JSON.stringify(items));
// };

// getGamesData("themes");
