import React from "react";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
// Redux
import { useDispatch } from "react-redux";
import { loadDetail } from "../actions/detailAction";
import { Link, useHistory } from "react-router-dom";
import { smallImage } from "../util";
import { popup } from "../animations";

const Game = ({ name, released, image, id }) => {
  const stringPathId = id.toString();
  //Scroll fix
  // En effet avec la solution de Deved je me retrouve quand je go back avec le scroll bloqué.
  const history = useHistory();

  if (history.location.pathname === "/") {
    document.body.style.overflow = "auto";
  } else {
    document.body.style.overflow = "hidden";
  }

  //load Details
  const dispatch = useDispatch();
  const loadDetailHandler = () => {
    dispatch(loadDetail(id));
  };

  return (
    <StyledGame
      variants={popup}
      initial="hidden"
      animate="show"
      layoutId={stringPathId}
      onClick={loadDetailHandler}
    >
      <Link to={`/game/${id}`}>
        <motion.h3 layoutId={`title ${stringPathId}`}>{name}</motion.h3>
        <p>{released} </p>
        <motion.img
          layoutId={`image ${stringPathId}`}
          src={smallImage(image, 640)}
          alt={name}
        />
      </Link>
    </StyledGame>
  );
};

const StyledGame = styled(motion.div)`
  min-height: 30vh;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  cursor: pointer;
  overflow: hidden;
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
`;

export default Game;
