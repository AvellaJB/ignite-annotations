//On refactor toute cette logique qui était dans l'App à la base pour garder l'App clean
import React, { useEffect } from "react";
import GameDetail from "../components/GameDetail";
//redux
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";
// Components :
import Game from "../components/Game";
// Styling and Animation
import styled from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { useLocation } from "react-router-dom";

//POur pouvoir faire des transitions entre des components ils faut que les composants
//soient présents sur une même page et chaque composant doit avoir framer-motion dedans.
//On ajoute en suite animatePresence a motion.
//En suite on wrap un éléments qui contient un toggle (ici c'est pathid )
//En suite on ajoute AnimateSharedLayout avec motion, on wrap en suite notre page avec les deux
//components.
//Une fois que c'est fait il faut mettre en id dans les deux components.LayoutId

const Home = () => {
  //Current Location
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  //Le split permet de découper dans console log les différentes partie du liens ou il y a un slash.
  //dans notre game il va ressortir un array avec game, id game
  //sur la home page on aura undefined.

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
      <AnimateSharedLayout type="crossfade">
        <AnimatePresence exitBeforeEnter>
          {/* Logique : Si il y a un pathId qui existe alors tu render GameDetail 
      attention si on clique sur un jeu, on a une erreur car les détails n'ont pas eu le temps
      de charger avant d'afficher game detail*/}
          {pathId && <GameDetail pathId={pathId} />}
        </AnimatePresence>
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
        <h2>Popular Games</h2>
        <Games>
          {popular.map((game) => (
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
        <h2>New Games</h2>
        <Games>
          {newGames.map((game) => (
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
      </AnimateSharedLayout>
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
