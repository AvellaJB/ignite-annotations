import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// REDUX SETUP
import { createStore, applyMiddleware, compose } from "redux";
//On installe MiddleWare et compose pour pouvoir passer dans le store plus d'un seul param
import rootReducer from "./reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

// Pour pouvoir passer plusieurs param on créée une fonction qui combine les deux
//(utilisation de l'extention ReduxDevTools)
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Middleware permet d'apply thunk (qui gère les requêtes async, ce que ne fait pas redux) sur notre store
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
