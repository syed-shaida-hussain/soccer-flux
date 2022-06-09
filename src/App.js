import "./App.css";
import { Signin , Signup , VideoListing , SingleVideoPage , CategoryClub , CategoryCountry , Home, CategoryGeneral , HistoryPage } from "./Pages";
import { Routes , Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path = "/" element = { <Home />} />
        <Route path = "/home" element = { <Home />} />
        <Route path = "login" element = {<Signin />} />
        <Route path = "signup" element = {<Signup />} />
        <Route path = "videos" element = { <VideoListing />} />
        <Route path = "history" element = { <HistoryPage />} />
        <Route path = {`/video/:videoId`} element = {<SingleVideoPage />} />
        <Route path = "club" element = {<CategoryClub />} />
        <Route path = "country" element = {<CategoryCountry />} />
        <Route path = "general" element = {<CategoryGeneral />} />
      </Routes>
    </div>
  );
}

export default App;
