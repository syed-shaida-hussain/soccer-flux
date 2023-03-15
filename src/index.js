import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { AuthProvider } from "./Contexts/auth-context";
import { BrowserRouter as Router  } from "react-router-dom"
import { ServiceProvider } from "./Contexts/service-context";
import { FilterProvider } from "./Contexts/filter-context";

makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ServiceProvider>
        <AuthProvider>
          <FilterProvider>
            <App />
          </FilterProvider>
        </AuthProvider>
      </ServiceProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
