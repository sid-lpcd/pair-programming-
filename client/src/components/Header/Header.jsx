import "./Header.scss";
import { Autocomplete, TextField } from "@mui/material";
import FilterIcon from "../../assets/icons/Filter.svg?react";
import BackIcon from "../../assets/icons/Arrow.svg?react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiHandler } from "../../utils/apiUtils.mjs";
import { v4 as uuidv4 } from "uuid";

const Header = ({
  isFilterOpen,
  setIsFilterOpen,
  isIndividualPage,
  gameName,
  getGame,
}) => {
  const [allGames, setAllGames] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const getAllGames = async () => {
    const allGamesList = await apiHandler("GET", "games/");
    setAllGames(allGamesList);
  };

  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <header className="header header--wrapper">
      <h1 className="header__logo">The Lord of the Games</h1>
      {!isIndividualPage ? (
        <div className="header__filters-container">
          <Autocomplete
            disablePortal
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={allGames}
            getOptionLabel={(option) => option.name ?? option}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <li key={option.id ? option.id : uuidv4()} {...optionProps}>
                  {option.name}
                </li>
              );
            }}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label="Game" />}
            className="header__filter-autocomplete"
            value={gameName}
            onChange={(event, newValue) => {
              getGame(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
          />
          <button
            className={`header__filter-btn header__filter-btn--small ${
              isFilterOpen ? "header__filter-btn--active" : ""
            }`}
            onClick={() => {
              setIsFilterOpen(!isFilterOpen);
            }}
          >
            Filters
            <FilterIcon alt="Filter Icon" className="header__filter-icon" />
          </button>
        </div>
      ) : (
        <Link to="/" className="header__nav-link-home">
          <BackIcon /> <h3 className="header__home">Home</h3>
        </Link>
      )}
    </header>
  );
};

export default Header;
