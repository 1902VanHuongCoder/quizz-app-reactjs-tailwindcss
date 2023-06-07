import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "./component/quizContext";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
