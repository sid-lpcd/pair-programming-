import "./GameCard.scss";
import Tag from "../Tag/Tag";
import { v4 as uuidv4 } from "uuid";
import LikeOutline from "../../../assets/icons/Like_Outline.svg?react";
import LikeFilled from "../../../assets/icons/Like_Filled.svg?react";

const GameCard = ({
  gameCard,
  selectedFilters,
  individualPage,
  userLike,
  handleLikeClick,
}) => {
  const convertDate = (time) => {
    const date = new Date(time);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };
  return (
    <article className="game-card">
      <div className="game-card__top">
        <img
          src={gameCard.photo}
          alt={gameCard.photoDescription}
          className="game-card__img"
        />
        {!individualPage && (
          <p className="game-card__name game-card__name--small">
            {gameCard.photographer}
          </p>
        )}
      </div>
      <div className="game-card__row">
        {gameCard.tags.map((tag) => {
          return (
            <Tag
              name={tag}
              className="game-card"
              isDisabled={true}
              isFilled={selectedFilters.includes(tag)}
              key={uuidv4()}
            />
          );
        })}
      </div>
      {individualPage && (
        <div className="game-card__row game-card__row--bottom">
          <div className="game-card__likes">
            {userLike ? (
              <LikeFilled onClick={handleLikeClick} />
            ) : (
              <LikeOutline onClick={handleLikeClick} />
            )}
            <span className="game-card__like-text">
              {gameCard?.likes} likes
            </span>
          </div>
          <p className="game-card__photographer">
            Game by {gameCard.photographer}
          </p>
          <p className="game-card__date">{convertDate(gameCard.timestamp)}</p>
        </div>
      )}
    </article>
  );
};

export default GameCard;
