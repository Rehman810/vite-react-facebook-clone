import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserDataProvider } from "./Context/Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserDataProvider>
      <App />
    </UserDataProvider>
  </React.StrictMode>
);
