import React from "react";

import Routes from "./routes/index";

import "./styles/global.css";
import "leaflet/dist/leaflet.css";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
