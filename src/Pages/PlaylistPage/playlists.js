import {Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../Contexts/auth-context"
import axios from "axios"
import { useEffect } from "react"
import { useServices } from "../../Contexts/service-context"
import EmptyImg from "../../Images/empty-img.png"
import { Loader } from "../../Components/loader"

const PlaylistsPage = () => {
    const { videoState , dispatchVideo , setIsLoading , isLoading } = useServices();

    const { 
        auth: { token  } ,
      }  = useAuth()

      const navigate = useNavigate()

      useEffect(() => {
        setIsLoading(true)
        axios.get("/api/user/playlists" , {headers : {authorization : token}}).then(res =>  {
            dispatchVideo({type : "GET_PLAYLISTS" , payload : res.data.playlists})
            setIsLoading(false)
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
      
    return isLoading ? <Loader/> : ( <main className="library-container" >
      <h3 className = "heading">My Playlists ({videoState.playlists.length}) |</h3>
  
  {videoState.playlists.length > 0 ? <div className = " playlists">
  {videoState.playlists.map(playlist => (<div key = {playlist._id}  className = "margin video-wrapper"  >
    <div onClick = {() => getSinglePlaylist(playlist)}>
    <img className="thumbnail" src = {playlist?.videos.length === 0 ? EmptyImg : playlist?.videos[0]?.imgsrc} />
    <div className = "flex content-info">
                  <img className = "avatar" src={playlist?.videos[0]?.imgsrc} alt=""/>
                          <div className = "margin flex playlist-services">
                            <div>
                              <h4 className = "title font-small">{playlist.title}</h4>
                              <p className = "font-smaller" >{playlist?.videos[0]?.creator}</p>
                            </div>
                            <span className = "material-icons playlist-delete-icon" onClick = {() => deleteFromHistory(video)}>delete</span>
                          </div>
                          </div>

    </div>
        </div>))}
       
  </div> : <div className = "explore-suggestion">Create new playlists. Your list will be shown right here.
  <div className = "explore-btn"><Link to = "/home" className = "link highlighted">Explore</Link></div> </div> }
      </main>)
}

export {PlaylistsPage}