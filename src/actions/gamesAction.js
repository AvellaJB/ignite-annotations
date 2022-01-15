import axios from "axios";
import { popularGamesURL } from "../api";

//Action creator

//On a besoin de la double fonction en dessous pour dispatch les infos en async (grâce à thunk)
export const loadGames = () => async (dispatch) => {
  // FETCH AXIOS
  const popularData = await axios.get(popularGamesURL());
  dispatch({
    type: "FETCH_GAMES",
    payload: {
      //Dans le payload on ajoute data.results pour avoir directement les résultats des jeux populaires
      //sans avoir le reste des données.
      popular: popularData.data.results,
    },
  });
};
