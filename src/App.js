import "./App.css";
import { Signin , Signup , VideoListing , SingleVideoPage, HistoryPage } from "./Pages";
import { Home } from "./Pages/Homepage/homepage";
import { Routes , Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/home" element = { <Home />} />
        <Route path = "login" element = {<Signin />} />
        <Route path = "signup" element = {<Signup />} />
        <Route path = "videos" element = { <VideoListing />} />
        <Route path = "history" element = { <HistoryPage />} />
        <Route path = {`/video/:videoId`} element = {<SingleVideoPage />} />
      </Routes>
    </div>
  );
}

export default App;
