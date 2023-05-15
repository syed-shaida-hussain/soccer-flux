import { useParams , useNavigate , Link } from "react-router-dom"
import { useEffect, useState  } from "react"
import axios from "axios"
import "../SigleVideoPage/single-video.css"
import { useAuth } from "../../Contexts/auth-context"
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

  return (<main className = "home-main">
  
{ singlePlaylistVideos?.length > 0 ? singlePlaylistVideos?.map(video => 
  (
    <div key = {video._id}  className = "video-wrapper">
    <img className="thumbnail" src= {video.imgsrc} onClick={() => getSingleVideo(video)} />
    <div className = "flex content-info" onClick={() => getSingleVideo(video)}>
                      <img className = "avatar" src={video.imgsrc} alt=""/>
                      <div className = "margin flex playlist-services">
                        <div>
                          <h4 className = "title font-small">{video.title}</h4>
                          <p className = "font-smaller" >{video?.creator}</p>
                          <p  className="font-small views"> {video.views} views</p>
                        </div>
                        <span className="material-icons delete-icon" onClick = {() => deleteVideoFromPlaylist(video)}>delete</span></div> 
                      </div>
                      </div>
        )) 
        :  <div className = "explore-suggestion">Playlist Empty . Add some videos to playlist
 <div className = "explore-btn"><Link to = "/videos" className = "link highlighted">Explore</Link></div> </div>}
</main>)
}

export {SinglePlaylistPage}