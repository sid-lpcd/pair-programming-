import { useEffect, useState } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import { apiHandler } from "./utils/apiUtils.mjs";

function App() {
  const [games, setGames] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [gameName, setGameName] = useState(null);

  const location = useLocation();

  const getAllGames = async () => {
    const listGames = await apiHandler("GET", "games/");
    console.log(listGames[0]);
    setGames(listGames.splice(0, 50));
  };

  const getGame = async (newGame) => {
    console.log(newGame.id);
    const game = await apiHandler("GET", `games/${newGame.id}`);
    console.log(game);
    setGameName(null);
    setGames(game);
  };

  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <>
      <Header
        games={games}
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
              setGames={setGames}
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
