import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/react-lab.css";

const rootEl = document.getElementById("react-lab-root");

if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  // Fails quietly rather than throwing — the surrounding static portfolio
  // must keep working even if this mount point is ever removed or renamed.
  console.warn('React Lab: no element with id "react-lab-root" found.');
}
