import { useState } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";

function App() {
  const [games, setGames] = useState([
    { id: 1, name: "Fifa 2012" },
    { id: 2, name: "Fifa 2014" },
    { id: 3, name: "Call of Duty" },
    { id: 4, name: "Call of Duty: Modern Warefare" },
  ]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const location = useLocation();

  // useEffect(() => {
  //   // setGames(getAllGames())
  // }, []);

  return (
    <>
      <Header
        games={games}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        isIndividualPage={location.pathname !== "/"}
      />

      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
