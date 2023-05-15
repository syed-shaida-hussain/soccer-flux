import { useEffect } from "react"
import axios from "axios"
import { useAuth } from "../../Contexts/auth-context";
import { useNavigate, Link  } from "react-router-dom";
import "../Videolisting/videolisting.css"
import { useServices } from "../../Contexts/service-context";
import { VideoCard } from "../../Components/videoCard";
import { Loader } from "../../Components/loader";

const Library = () => {

  const { videoState , dispatchVideo , isLoading , setIsLoading } = useServices()

  const { 
    auth: { token  } ,
  }  = useAuth()
  
  useEffect(() => {
    setIsLoading(true)
    axios.get("/api/user/likes" , { headers : {authorization : token}}).then((res) => {
      dispatchVideo({type : "GET_LIKED_VIDEOS" , payload : res.data.likes})
    })
    axios.get("/api/user/watchlater" , {headers : {authorization : token}}).then(res => {
      dispatchVideo({type : "GET_WATCHLATER_VIDEOS" , payload : res.data.watchlater})
      setIsLoading(false)
    })
  },[])

return isLoading ? <Loader/> : (<div>
<h3 className = "heading">Liked videos ({videoState.likedVideos.length}) |</h3>
{videoState.likedVideos.length > 0 ? <div className = "services margin-top-bottom ">{videoState.likedVideos.map((video) => <VideoCard video={video} key={video._id}/>)}</div>  : <div className = "explore-suggestion ">Like some videos . Your list will be shown right here.
 <div className = "explore-btn"><Link to = "/home" className = "link highlighted">Explore</Link></div> </div> }
  
  <h3 className = "heading">Watch later videos ({videoState.watchLater.length}) |</h3>

  {videoState.watchLater.length > 0 ? <div className = "services margin-top-bottom ">
  {videoState.watchLater.map(video => (<VideoCard video={video} key={video._id} />))}
</div> : <div className = "explore-suggestion">save some videos to watch later . Your list will be shown right here.
 <div className = "explore-btn"><Link to = "/home" className = "link highlighted">Explore</Link></div> </div> }
</div>)

}
export {Library}