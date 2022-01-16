const initialState = {
  game: { platforms: [] },
  screen: { results: [] },
  isLoading: true,
};

// On rajoute la platform et résultst pour que le .map ne bug pas en se disant qu'il y a pas de
// data parce que ça prend du temps à arriver.
//Quand on a une erreur de Map il faut pas hésiter à mettre des données parce qu'il met du temps a récupérer
//les données du server.

const detailReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DETAIL":
      return {
        ...state,
        game: action.payload.game,
        screen: action.payload.screen,
        isLoading: false,
      };
    case "LOADING_DETAIL":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return { ...state };
  }
};

export default detailReducer;
