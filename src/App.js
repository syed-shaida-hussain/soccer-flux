import "./App.css";
import { Signin } from "./Pages/Authentication/Login/login";
import { Routes , Route } from "react-router-dom"
import { Signup } from "./Pages/Authentication/Signup/signup";
import { VideoListing } from "./Pages/Videolisting/videolisting";
import { SingleVideoPage } from "./Pages/SigleVideoPage/single-video";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "login" element = {<Signin />} />
        <Route path = "signup" element = {<Signup />} />
        <Route path = "videos" element = { <VideoListing />} />
        <Route path = {`/video/:videoId`} element = {<SingleVideoPage />} />
      </Routes>
    </div>
  );
}

export default App;
