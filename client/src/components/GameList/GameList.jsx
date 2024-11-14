import "./GameList.scss";
import GameCard from "../GameCard/GameCard";
import { useState } from "react";

const GameList = ({ selectedFilters, games }) => {
  return (
    <section className="game-list">
      {games.map((game) => {
        [game.like, game.setLike] = useState(false);

        return (
          <GameCard
            key={game.id}
            gameCard={game}
            userLike={game.like}
            handleLikeClick={() => game.setLike(!game.like)}
          />
        );
      })}
    </section>
  );
};

export default GameList;
