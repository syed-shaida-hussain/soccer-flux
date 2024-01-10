import "./App.css";
import { Header } from "./Components/header";
import { Sidebar } from "./Components/sidebar";

import { Signin , Signup , VideoListing , SingleVideoPage  , Home , HistoryPage , Library, PlaylistsPage, SinglePlaylistPage} from "./Pages";

import { Routes , Route , Navigate } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="hl"></div>
      <main className="main-wrapper">
        <Sidebar/>
      <Routes>
      <Route path = "/" element = { <Navigate to = "/home" />} />
        <Route path = "/home" element = { <VideoListing />} />
        <Route path = "/login" element = {<Signin />} />
        <Route path = "/signup" element = {<Signup />} />
        <Route path = "/library" element = {<Library />}/>
        <Route path = "/history" element = { <HistoryPage />} />
        <Route path = {`/video/:videoId`} element = {<SingleVideoPage />} />
        <Route path = "/playlists" element = {<PlaylistsPage />}/>
        <Route path = {`/playlists/:playlistId`} element = {<SinglePlaylistPage />} />
      </Routes>
      </main>

    </div>
  );
}

export default App;
