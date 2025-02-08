import React from "react";
import ReactDOM from "react-dom/client";
import { MainPage } from "#pages/MainPage";
import "./styles.js";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<MainPage />);
