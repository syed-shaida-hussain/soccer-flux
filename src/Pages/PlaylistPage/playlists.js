import {Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../Contexts/auth-context"
import axios from "axios"
import { Header } from "../../Components/header"
import {Sidebar} from "../../Components/sidebar"
import { useEffect } from "react"
import { useServices } from "../../Contexts/service-context"


const PlaylistsPage = () => {
    const { videoState , dispatchVideo } = useServices()
    
    const { 
        auth: { token  } ,
      }  = useAuth()

      const navigate = useNavigate()

      useEffect(() => {
        axios.get("/api/user/playlists" , {headers : {authorization : token}}).then(res =>  {
            dispatchVideo({type : "GET_PLAYLISTS" , payload : res.data.playlists})
          })
      },[])

      const getSinglePlaylist = async  (playlist) => {
        navigate(`/playlists/${playlist._id}`)
    }

    const deletePlaylistService = async (playlist) => {
      try {
        await axios.delete(`/api/user/playlists/${playlist._id}` , {headers : {authorization : token}})
      } catch(e) {
        console.log(e)
      }
    }

    const deletePlaylist = async (playlist) => {
      await deletePlaylistService(playlist)
      dispatchVideo({type : "DELETE_PLAYLISTS" , payload : playlist})
    }
      
    return (<div>
        <Header />
        <div className = "main-wrapper">
        <Sidebar />
      <div>
      
      <hr/>
      
      <main className="library-container" >
      <h2 className = "margin-top-bottom heading">My Playlists ({videoState.playlists.length}) |</h2>
  
  {videoState.playlists.length > 0 ? <div className = "services margin-top-bottom ">
  {videoState.playlists.map(playlist => (<div key = {playlist._id} className = "video-card"  >
            <h4  onClick = {() => getSinglePlaylist(playlist)} className = "margin margin-more  playlist-name">{playlist.title}</h4>
            <span class="material-icons delete-icon" onClick = {() => deletePlaylist(playlist)}>delete</span> 
        </div>))}
       
  </div> : <div className = "explore-suggestion margin margin-top-bottom">Create new playlists. Your list will be shown right here.
  <div className = "explore-btn"><Link to = "/videos" className = "link highlighted">Explore</Link></div> </div> }
      </main>
      </div>
      </div>
      </div>)
}

export {PlaylistsPage}