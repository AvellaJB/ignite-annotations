import { upcomingGamesURL } from "../api";

const initState = {
  popular: [],
  newGames: [],
  upcoming: [],
  searched: [],
};

const gamesReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_GAMES":
      return {
        ...state,
        popular: action.payload.popular,
        upcoming: action.payload.upcoming,
        newGames: action.payload.newgames,
      };
    case "FETCH_SEARCHED":
      return {
        ...state,
        searched: action.payload.searched,
      };
    case "CLEAR_SEARCHED":
      return {
        ...state,
        searched: [],
      };
    default:
      return { ...state };
  }
};

// Action : C'est un objet qui descrit ce qu'on veux faire.
// Action creation : Fonction qui va créer une action.
//DISPATCH  C'est nous qui envoyons les infos vers le reducer.
//Le reducer va donc voir quel genre d'action a été dispatch et le reducer fait en fonction de ce qui a été
//produit.

export default gamesReducer;
