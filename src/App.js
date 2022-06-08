import "./App.css";
import { Signin } from "./Pages/Authentication/Login/login";
import {  Routes , Route } from "react-router-dom"
import { Signup } from "./Pages/Authentication/Signup/signup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/login" element = {<Signin />} />
        <Route path = "/signup" element = {<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
