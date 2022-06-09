import "./App.css";
import { Signin , Signup , VideoListing , SingleVideoPage, Library } from "./Pages";
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
        <Route path = "library" element = {<Library />}/>
        <Route path = {`/video/:videoId`} element = {<SingleVideoPage />} />
      </Routes>
    </div>
  );
}

export default App;
