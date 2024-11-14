import "./GameList.scss";
import GameCard from "../GameCard/GameCard";
import { useState } from "react";

const GameList = ({ selectedFilters, games }) => {
  return (
    <section className="game-list">
      {games.map((game) => {
        [game.like, game.setLike] = [
          false,
          () => {
            game.like = !game.like;
          },
        ];

        return (
          <GameCard
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
