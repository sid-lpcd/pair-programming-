import { useNavigate, useParams } from "react-router-dom";
import "./GamePage.scss";
import { useState, useEffect } from "react";
import { apiHandler } from "../../utils/apiUtils.mjs";
import GameCard from "../../components/GameCard/GameCard";

const GamePage = () => {
  const navigate = useNavigate();

  const { gameId } = useParams();

  const [game, setGame] = useState(null);

  const initialRender = async (gameId) => {
    console.log(gameId);
    if (gameId) {
      const game = await apiHandler("GET", `games/${gameId}`);

      if (game?.error) {
        navigate("/not-found");
      } else {
        setGame(game);
      }
    }
  };

  useEffect(() => {
    initialRender(gameId);
  }, [gameId]);
  console.log(gameId);
  if (!game) {
    return <></>;
  }
  if (!game.like) {
    game.like = false;
    game.setLike = () => {
      game.like = !game.like;
    };
  }
  return (
    <main className="wrapper wrapper--max-width">
      <GameCard
        gameCard={game}
        userLike={game.like}
        handleLikeClick={game.setLike}
      />
    </main>
  );
};

export default GamePage;
