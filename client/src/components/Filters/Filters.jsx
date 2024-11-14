import Tag from "../Tag/Tag";
import "./Filters.scss";
import { v4 as uuidv4 } from "uuid";

const Filters = ({
  isFilterOpen,
  setIsFilterOpen,
  filters,
  handleFilters,
  selectedFilters,
}) => {
  return (
    <aside className={isFilterOpen ? "filters" : "filters filters--hidden"}>
      <div className="filters-wrapper">
        <div className="filters__header">
          <h3 className="filters__title">Filters</h3>

          <button
            className={`filters__close ${
              isFilterOpen ? "filters__close--active" : ""
            }`}
            onClick={() => {
              setIsFilterOpen(!isFilterOpen);
            }}
          >
            Close X
          </button>
        </div>

        <div className="filters__container">
          {filters.map((filter) => {
            return (
              <Tag
                key={uuidv4()}
                name={filter}
                className="filters__filter"
                isDisabled={false}
                isFilled={selectedFilters.includes(filter)}
                handleFilters={() => {
                  handleFilters(filter);
                }}
              />
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Filters;
