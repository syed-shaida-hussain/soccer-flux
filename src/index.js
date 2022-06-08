import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { AuthProvider } from "./Contexts/auth-context";
import { BrowserRouter as Router  } from "react-router-dom"
import { ServiceProvider } from "./Contexts/service-context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <ServiceProvider>
    <AuthProvider>
     <App />
    </AuthProvider>
    </ServiceProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
