import { useEffect } from "react"
import axios from "axios"
import { useAuth } from "../../Contexts/auth-context";
import {Header} from "../../Components/header"
import { Sidebar } from "../../Components/sidebar"
import { useNavigate, Link  } from "react-router-dom";
import "../Videolisting/videolisting.css"
import { useServices } from "../../Contexts/service-context";

const Library = () => {

  const { videoState , dispatchVideo } = useServices()

  const { 
    auth: { token , status } ,
  }  = useAuth()
  const navigate = useNavigate()
  
  useEffect(() => {
    axios.get("/api/user/likes" , { headers : {authorization : token}}).then((res) => {
      dispatchVideo({type : "GET_LIKED_VIDEOS" , payload : res.data.likes})
    })
    axios.get("/api/user/watchlater" , {headers : {authorization : token}}).then(res => {
      dispatchVideo({type : "GET_WATCHLATER_VIDEOS" , payload : res.data.watchlater})
    })
  },[])

  const getSingleVideo = async  (video) => {
    navigate(`/video/${video._id}`)
}

return (<div>
  <Header />
  <div className = "main-wrapper">
    <Sidebar />
<div>

<hr/>

<main className="library-container" >
<h2 className = "margin heading">Liked videos ({videoState.likedVideos.length}) |</h2>
{videoState.likedVideos.length > 0 ? <div className = "services margin-top-bottom">
{videoState.likedVideos.map(video => (<div key = {video._id} className = "video-card" onClick = {() => getSingleVideo(video)} >
            <img src= {video.imgsrc} className = "video" alt=""/>
            <h4 className = "margin">{video.title}</h4>
            <div className = "flex">
              <img className = "avatar" src={video.imgsrc} alt="avatar-img"/>
              <p className = "font-small margin" >{video.creator}</p>
            </div>
        </div>))}
  </div> : <div className = "explore-suggestion margin margin-top-bottom">Like some videos . Your list will be shown right here.
 <div className = "explore-btn"><Link to = "/videos" className = "link highlighted">Explore</Link></div> </div> }
  
  <h2 className = "margin-top-bottom">Watch later videos ({videoState.watchLater.length}) |</h2>

  {videoState.watchLater.length > 0 ? <div className = "services margin-top-bottom ">
  {videoState.watchLater.map(video => (<div key = {video._id} className = "video-card" onClick = {() => status ? getSingleVideo(video , token) : navigate("/login")} >
            <img src= {video.imgsrc} className = "video" alt=""/>
            <h4 className = "margin">{video.title}</h4>
            <div className = "flex">
              <img className = "avatar" src={video.imgsrc} alt=""/>
              <p className = "font-small margin" >{video.creator}</p>
            </div>
        </div>))}
</div> : <div className = "explore-suggestion margin margin-top-bottom">save some videos to watch later . Your list will be shown right here.
 <div className = "explore-btn"><Link to = "/videos" className = "link highlighted">Explore</Link></div> </div> }


</main>
</div>
</div>
</div>)

}
export {Library}