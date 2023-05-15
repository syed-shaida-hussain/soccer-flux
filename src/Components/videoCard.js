import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/auth-context";
import { useServices } from "../Contexts/service-context";
import axios from "axios";

const VideoCard = ({video}) => {
    const {videoState , dispatchVideo} = useServices();
    const {auth : {token}} = useAuth()
    const navigate = useNavigate();

    const addToHistoryService = async (video) => {
        try {
          await axios.post(
            "/api/user/history" ,
              {video : video}  , { headers : {authorization : token}})
              localStorage.removeItem("USERNAME")
        } catch(e){
          console.log(e.response)
        }
      }

    const getSingleVideo = async (video) => {
        videoState.historyVideos.find((historyVideo) => historyVideo._id === video._id) ? navigate(`/video/${video._id}`)  : await addToHistoryService(video)
        dispatchVideo({type : "SET_HISTORY_VIDEOS" , payload : video})
        navigate(`/video/${video._id}`) ;   
      }
    return <section className="video-wrapper">
      <img className="thumbnail" src= {video.imgsrc} onClick={() => getSingleVideo(video)} />
      <div className = "flex content-info">
                          <img className = "avatar" src={video.imgsrc} alt=""/>
                          <div className = "margin">
                          <p className = " title font-small">{video.title}</p>
                          <p className = "font-smaller " >{video.creator}</p>
                          <p  className="font-small views"> {video.views} views</p>
                          </div>
                          </div>
    </section>
  }
  
  export {VideoCard}