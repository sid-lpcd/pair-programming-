import { useEffect, useState } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import { apiHandler } from "./utils/apiUtils.mjs";
import GamePage from "./pages/gamePage/gamePage";
import { NotFound } from "./pages/NotFound/NotFound";

function App() {
  const [games, setGames] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [gameName, setGameName] = useState(null);

  const location = useLocation();

  const getGames = async () => {
    const listGames = await apiHandler("GET", "games/");
    setGames(listGames.splice(0, 50));
  };

  const setLike = async (id) => {
    const listGames = await apiHandler("POST", "games/:id");
    setGames(listGames.splice(0, 50));
  };

  const getGame = async (newGame) => {
    if (!newGame) {
      getGames();
      return setGameName(null);
    }
    const game = await apiHandler("GET", `games/${newGame.id}`);
    setGameName(game[0]);
    setGames(game);
  };

  useEffect(() => {
    getGames();
  }, []);

  return (
    <>
      <Header
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        isIndividualPage={location.pathname !== "/"}
        gameName={gameName}
        getGame={getGame}
      />

      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              games={games}
              setLike={setLike}
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
            />
          }
        />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/:gameId" element={<GamePage />} />
      </Routes>
    </>
  );
}

export default App;
