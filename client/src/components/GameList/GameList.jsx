import "./GameList.scss";
import GameCard from "../GameCard/GameCard";
import { useState } from "react";

const GameList = ({ selectedFilters, games, setLike }) => {
  return (
    <section className="game-list">
      {games.map((game) => {
        return (
          <GameCard
            key={game.id}
            gameCard={game}
            userLike={game.like}
            setLike={setLike}
          />
        );
      })}
    </section>
  );
};

export default GameList;
