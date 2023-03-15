import "./App.css";

import { Signin , Signup , VideoListing , SingleVideoPage , CategoryClub , CategoryCountry , Home, CategoryGeneral , HistoryPage , Library, PlaylistsPage, SinglePlaylistPage} from "./Pages";

import { Routes , Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path = "/" element = { <Home />} />
        <Route path = "/home" element = { <Home />} />
        <Route path = "/login" element = {<Signin />} />
        <Route path = "/signup" element = {<Signup />} />
        <Route path = "/videos" element = { <VideoListing />} />
        <Route path = "/library" element = {<Library />}/>
        <Route path = "/history" element = { <HistoryPage />} />
        <Route path = {`/video/:videoId`} element = {<SingleVideoPage />} />
        <Route path = "/playlists" element = {<PlaylistsPage />}/>
        <Route path = {`/playlists/:playlistId`} element = {<SinglePlaylistPage />} />
      </Routes>
    </div>
  );
}

export default App;
