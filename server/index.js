import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import gamesRoutes from "./routes/gamesRoutes.js";
import axios from "axios";

const app = express();

app.use(express.static("public"));

dotenv.config();

app.use(cors());

app.use(express.json());

app.use("/games", gamesRoutes);

const fetchGames = async () => {
  console.log("HEloo");
  const params = {
    headers: {
      Accept: "application/json",
      "Client-ID": process.env.CLIENT_ID,
      Authorization: "Bearer " + process.env.ACCESS_TOKEN,
    },
    body: "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,collections,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;",
  };

  console.log("params", params);
  // const response = await axios.post("https://api.igdb.com/v4/games", params);
  // console.log(res);
  // console.log(response);
  // return response;
};

app.get("/", (req, res) => {
  fetchGames();
  console.log("tetss");
  res.json();
});

const port = process.env.SNAPS_PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
