import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MLModelProvider } from "./components/MLModelContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MLModelProvider>
      <App />
    </MLModelProvider>
  </React.StrictMode>
);
