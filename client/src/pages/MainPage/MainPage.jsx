import { useEffect, useState } from "react";
import "./MainPage.scss";
import Filters from "../../components/Filters/Filters";

const MainPage = ({ isFilterOpen, setIsFilterOpen }) => {
  const [filters, setFilters] = useState(null);
  const [games, setGames] = useState(null);

  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilters = (filter) => {
    let newFilters = [];
    let newImagesFiltered = [];
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

    newImagesFiltered = images.filter((image) =>
      newFilters.some((filter) => image.tags.includes(filter))
    );
    {
      /* Diving deeper with sorting by number of matches in filter tags*/
    }
    newImagesFiltered.sort((a, b) => {
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
      ? setDisplayImages(newImagesFiltered)
      : setDisplayImages(images);
  };

  const initialRender = async () => {
    const imgs = await apiHandler("GET", "photos/");
    const filter = await apiHandler("GET", "tags/");
    if (imgs?.error || filter?.error) {
      navigate("/not-found");
    } else {
      setGames(imgs);
      setDisplayImages(imgs);
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
        className={`main__wrapper ${
          isFilterOpen ? "main__wrapper--filter-open" : ""
        }`}
      >
        <GameList games={games} selectedFilters={selectedFilters} />
      </main>
    </>
  );
};

export default MainPage;
