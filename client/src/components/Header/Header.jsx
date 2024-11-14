import "./Header.scss";
import { Autocomplete, TextField } from "@mui/material";
import FilterIcon from "../../assets/icons/Filter.svg?react";
import BackIcon from "../../assets/icons/Arrow.svg?react";

const Header = ({ games, isFilterOpen, setIsFilterOpen, isIndividualPage }) => {
  return (
    <header>
      <h1>The Lord of the Games</h1>
      {!isIndividualPage ? (
        <div className="header__filters-container">
          <Autocomplete
            disablePortal
            options={games}
            getOptionLabel={(option) => option.name ?? option}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Game" />}
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
