import { useEffect, useState } from "react";
import "./MainPage.scss";
import Filters from "../../components/Filters/Filters";
import GameList from "../../components/GameList/GameList";
import { apiHandler } from "../../utils/apiUtils.mjs";

const MainPage = ({
  isFilterOpen,
  setIsFilterOpen,
  games,
  setLike,
  setGames,
}) => {
  const [filters, setFilters] = useState(null);

  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilters = async (filter) => {
    let newFilters = [];

    if (selectedFilters.length) {
      if (selectedFilters.find((item) => item.id === filter.id)) {
        newFilters = selectedFilters.filter((item) => item.id !== filter.id);
        setSelectedFilters(newFilters);
      } else {
        newFilters = [...selectedFilters, filter];
        setSelectedFilters(newFilters);
      }
    } else {
      newFilters = [...selectedFilters, filter];
      setSelectedFilters(newFilters);
    }
    const filteredGames = await apiHandler("GET", `games/filter-by-genre`, {
      filters: newFilters,
    });
    setGames(filteredGames);
  };

  const initialRender = async () => {
    const filter = await apiHandler("GET", "games/genres");
    if (filter?.error) {
      navigate("/not-found");
    } else {
      setFilters(filter);
    }
  };

  useEffect(() => {
    initialRender();
  }, []);

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
        {games && (
          <GameList
            games={games}
            selectedFilters={selectedFilters}
            setLike={setLike}
          />
        )}
      </main>
    </>
  );
};

export default MainPage;
