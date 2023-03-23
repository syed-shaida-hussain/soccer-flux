import { useParams , useNavigate , Link } from "react-router-dom"
import { useEffect, useState  } from "react"
import axios from "axios"
import "../SigleVideoPage/single-video.css"
import { useAuth } from "../../Contexts/auth-context"
import { Sidebar } from "../../Components/sidebar"
import {Header} from "../../Components/header"
import { useServices } from "../../Contexts/service-context"

const SinglePlaylistPage = () => {
    const  {playlistId} = useParams();
    const { 
        auth: { token } ,
      }  = useAuth()
  
    const navigate = useNavigate();

    const { videoState } = useServices();
    const [singlePlaylistVideos , setSinglePlaylistVideos] = useState([])
    const currentPlaylist = videoState.playlists.find((playlist) => playlist._id === playlistId)

    useEffect(() => {
          setSinglePlaylistVideos(currentPlaylist?.videos)
    },[])

    const getSingleVideo = async (video) => {
      navigate(`/video/${video._id}`)
  }

  const deleteVideoFromPlaylistService = async (video) => {
    try {
      await axios.delete(`/api/user/playlists/${playlistId}/${video._id}` , {headers : {authorization : token}})
    } catch(e) {
      console.log(e)
    }
  }

  const deleteVideoFromPlaylist = async (video) => {
    await deleteVideoFromPlaylistService(video)
    setSinglePlaylistVideos(singlePlaylistVideos.filter((playlistVideo)=> playlistVideo._id !== video._id))
  }

  return (<div>
        <Header />
        <div className = "main-wrapper">
        <Sidebar />
<div>
    
<main className = "home-main">
  
{ singlePlaylistVideos?.length > 0 ? singlePlaylistVideos?.map(video => (<div key = {video._id} className = "video-card" >
            <div onClick = {() => getSingleVideo(video)}>
            <img src= {video.imgsrc} className = "video" alt=""/>
            <h4 className = "margin">{video.title}</h4>
            <div className = "flex">
              <img className = "avatar" src={video.imgsrc} alt=""/>
              <p className = "font-small margin" >{video.creator}</p>
            </div>
            </div>
            <span className="material-icons delete-icon" onClick = {() => deleteVideoFromPlaylist(video)}>delete</span> 
        </div>)) :  <div className = "explore-suggestion margin margin-top-bottom">Playlist Empty . Add some videos to playlist
 <div className = "explore-btn"><Link to = "/videos" className = "link highlighted">Explore</Link></div> </div>}
</main>
</div>
</div>
</div>)   
}

export {SinglePlaylistPage}