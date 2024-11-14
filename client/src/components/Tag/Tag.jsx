import "./Tag.scss";

const Tag = ({ name, className, isDisabled, isFilled, handleFilters }) => {
  return (
    <button
      className={
        isFilled
          ? `${className}__tag-btn ${className}__tag-btn--small ${className}__tag-btn--filled`
          : `${className}__tag-btn ${className}__tag-btn--small`
      }
      disabled={isDisabled}
      onClick={handleFilters}
    >
      {name}
    </button>
  );
};

export default Tag;
