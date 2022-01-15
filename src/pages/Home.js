//On refactor toute cette logique qui était dans l'App à la base pour garder l'App clean
import React, { useEffect } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";
// Components :
import Game from "../components/Game";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";

const Home = () => {
  //FETCH GAMES
  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch(loadGames());
    },
    // Important, il faut ajouter l'empty array en dessous car sinon on dispatch en continue
    // et les données ne font qu'arriver en masse.
    []
  );
  // Get that data back, extraire du state.
  const { popular, newGames, upcoming } = useSelector((state) => state.games);

  return (
    <GameList>
      <h2>Upcoming Games</h2>
      <Games>
        {upcoming.map((game) => (
          <Game
            name={game.name}
            released={game.released}
            id={game.id}
            //Attention les image envoyées par notre API sont super lourdes en 4K..
            //normalement une api donne une option pour les tailles d'images
            image={game.background_image}
            key={game.id}
          />
        ))}
      </Games>
    </GameList>
  );
};

const GameList = styled(motion.div)`
  padding: 0rem 5rem;
  h2 {
    padding: 5rem 0rem;
  }
`;

const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
`;

export default Home;