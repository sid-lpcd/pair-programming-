import "./GameCard.scss";
import Tag from "../Tag/Tag";
import { v4 as uuidv4 } from "uuid";
import LikeOutline from "../../assets/icons/Like_Outline.svg?react";
import LikeFilled from "../../assets/icons/Like_Filled.svg?react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Rating,
} from "@mui/material";

import ExpandMoreIcon from "../../assets/icons/Dropdown.svg?react";
import { Link } from "react-router-dom";

const GameCard = ({ gameCard, userLike, setLike, individualPage }) => {
  const convertDate = (time) => {
    const date = new Date(time);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
    });
  };
  if (!gameCard.cover?.url) {
    return <></>;
  }
  return (
    <article className="game-card">
      <div className="game-card__likes">
        {userLike ? (
          <LikeFilled onClick={() => setLike(gameCard.id)} />
        ) : (
          <LikeOutline onClick={() => setLike(gameCard.id)} />
        )}
      </div>
      <Link to={`/${gameCard.id}`} key={gameCard.id} className="game-card-link">
        <div className="game-card__top">
          {gameCard.cover?.url && (
            <img
              src={gameCard.cover?.url}
              alt={gameCard.summary}
              className="game-card__img"
            />
          )}
          <div className="game-card__overlay-img">
            {gameCard.genres?.map((genre) => {
              return (
                <Tag
                  name={genre.name}
                  className="game-card"
                  isDisabled={true}
                  key={uuidv4()}
                />
              );
            })}
          </div>
        </div>
        <div className="game-card__row game-card__row--bottom">
          <Rating
            className="game-card__rating"
            name="rating"
            defaultValue={
              gameCard.total_rating ? (gameCard.total_rating / 100) * 5 : 0
            }
            precision={0.5}
            readOnly
          />
          <p className="game-card__date">{convertDate(gameCard.created_at)}</p>
        </div>
        {!individualPage && (
          <h3 className="game-card__title">{gameCard.name}</h3>
        )}
      </Link>
      <Accordion slotProps={{ heading: { component: "h4" } }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="dropdown-icon" />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Platforms
        </AccordionSummary>
        <AccordionDetails>
          {gameCard.platforms?.map((plat) => (
            <Tag
              name={plat.name}
              className="game-card__tag"
              isDisabled={true}
              key={uuidv4()}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </article>
  );
};

export default GameCard;
