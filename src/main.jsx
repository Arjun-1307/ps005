import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Signup from "./Signup";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

function renderRoute() {
  const path = window.location.pathname;
  if (path === "/signup") {
    root.render(
      <React.StrictMode>
        <Signup />
      </React.StrictMode>
    );
  } else {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}

window.addEventListener("popstate", renderRoute);
renderRoute();
