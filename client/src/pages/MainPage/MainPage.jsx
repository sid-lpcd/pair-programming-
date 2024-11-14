import { useEffect, useState } from "react";
import "./MainPage.scss";
import Filters from "../../components/Filters/Filters";
import GameList from "../../components/GameList/GameList";
import axios from "axios";

const MainPage = ({ isFilterOpen, setIsFilterOpen, games, setGames }) => {
  const [filters, setFilters] = useState(["1", "2"]);

  let allThemes = [];

  const fetchThemes = async () => {
    const res = await axios.get(`http://localhost:3000/games/themes`);
    const themes = res.data;

    themes.forEach((theme) => {
      console.log(theme.name);
      if (!allThemes.includes(theme.name)) {
        allThemes.push(theme.name);
      }
    });

    setFilters(allThemes);
  };

  console.log("filters", filters);

  useEffect(() => {
    fetchThemes();
  }, []);

  const [selectedFilters, setSelectedFilters] = useState([]);

  console.log("selected", selectedFilters);

  const handleFilters = (filter) => {
    let newFilters = [];
    let newGamesFiltered = [];
    if (selectedFilters.length) {
      if (selectedFilters.find((item) => item === filter)) {
        newFilters = selectedFilters.filter((item) => item !== filter);
        setSelectedFilters(newFilters);
      } else {
        newFilters = [...selectedFilters, filter];
        setSelectedFilters(newFilters);
      }
    } else {
      newFilters = [...selectedFilters, filter];
      setSelectedFilters(newFilters);
    }

    newGamesFiltered = games.filter((image) =>
      newFilters.some((filter) => image.tags.includes(filter))
    );
    {
      /* Diving deeper with sorting by number of matches in filter tags*/
    }
    newGamesFiltered.sort((a, b) => {
      const aFilterCount = newFilters.reduce(
        (count, filter) => (a.tags.includes(filter) ? count + 1 : count),
        0
      );
      const bFilterCount = newFilters.reduce(
        (count, filter) => (b.tags.includes(filter) ? count + 1 : count),
        0
      );
      return bFilterCount - aFilterCount;
    });

    newFilters.length
      ? setDisplayImages(newGamesFiltered)
      : setDisplayImages(games);
  };

  const initialRender = async () => {
    const filter = await apiHandler("GET", "tags/");
    if (filter?.error) {
      navigate("/not-found");
    } else {
      setFilters(filter);
    }
  };

  // useEffect(() => {
  //   initialRender();
  // }, []);

  return (
    <>
      <Filters
        isFilterOpen={isFilterOpen}
        filters={filters}
        selectedFilters={selectedFilters}
        handleFilters={handleFilters}
        setIsFilterOpen={setIsFilterOpen}
      />
      <main
        className={`main__wrapper${
          isFilterOpen ? " main__wrapper--filter-open" : ""
        }`}
      >
        {/* {games?.themes?.includes(selectedFilters) && (
          <GameList games={games} selectedFilters={selectedFilters} />
        )} */}
        {games && <GameList games={games} selectedFilters={selectedFilters} />}
      </main>
    </>
  );
};

export default MainPage;
