import { useNavigate, useParams } from "react-router-dom";
import "./GamePage.scss";
import { useState, useEffect } from "react";
import { apiHandler } from "../../utils/apiUtils.mjs";
import GameCard from "../../components/GameCard/GameCard";

const GamePage = () => {
  const navigate = useNavigate();

  const { gameId } = useParams();

  const [game, setGame] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [similarGames, setSimilarGames] = useState(null);

  const initialRender = async (gameId) => {
    if (gameId) {
      const game = await apiHandler("GET", `games/${gameId}`);

      if (game?.error) {
        navigate("/not-found");
      } else {
        setGame(game[0]);
        const similarGamesList = [];
        console.log(game[0].similar_games);
        game[0].similar_games?.forEach(async (element) => {
          const newGame = await apiHandler("GET", `games/${element}`);
          if (newGame[0]) {
            similarGamesList.push(newGame[0]);
          }
        });
        console.log(similarGamesList);
        if (similarGamesList.length) {
          setSimilarGames(similarGamesList);
        }
      }
    }
  };

  useEffect(() => {
    initialRender(gameId);
  }, [gameId]);
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
      <section className="main-game">
        <GameCard
          gameCard={game}
          userLike={game.like}
          handleLikeClick={game.setLike}
          individualPage={true}
        />
        <div className="game__container">
          <h2 className="game__title">{game.name}</h2>
          <p className="game__summary">{game.summary}</p>
          <button
            className="game__read-more"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Close" : "Read More"}
          </button>
          {isExpanded && (
            <p className="game__description game__description--light">
              {game.storyline}
            </p>
          )}
        </div>
      </section>
      {similarGames && (
        <section className="similar-games">
          {similarGames.map((el) => (
            <GameCard
              gameCard={el}
              userLike={el.like}
              handleLikeClick={el.setLike}
            />
          ))}
        </section>
      )}
    </main>
  );
};

export default GamePage;
