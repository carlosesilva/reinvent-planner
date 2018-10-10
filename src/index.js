import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import "./index.css";
import App from "./App";
import reducers from "./reducers";
import LocalStorageSyncer from "./middlewares/LocalStorageSyncer";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider
    store={createStore(
      reducers,
      composeWithDevTools(applyMiddleware(LocalStorageSyncer))
    )}
  >
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
