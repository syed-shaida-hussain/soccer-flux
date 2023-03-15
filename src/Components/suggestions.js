import "../Pages/Videolisting/videolisting.css"
import { useNavigate } from "react-router-dom"
import { useServices } from "../Contexts/service-context";
import { useFilters } from "../Contexts/filter-context";
import { useAuth } from "../Contexts/auth-context";
import axios from "axios"

const Suggestions = () => {
    const navigate = useNavigate();
    const { videoState , dispatchVideo } = useServices();
    const { filterState  } = useFilters();
    const { auth: { token } ,}  = useAuth();


    const addToHistoryService = async (video) => {
      try {
        await axios.post(
          "/api/user/history" ,
            {video}  , { headers : {authorization : token}})
      } catch(e){
        console.log(e)
      }
    }

    const getSingleVideo = async (video,token) => {
      navigate(`/video/${video._id}`)    
      videoState.historyVideos.find((historyVideo) => historyVideo._id === video._id) ? "" : await addToHistoryService(video , token) &&
      dispatchVideo({type : "SET_HISTORY_VIDEOS" , payload : video})
    }

    const suggestedVideos = filterState.filteredCategory === "" ? videoState.videos.filter((video) => video.category === filterState.filteredCategory) : videoState.videos.filter((video) => video.category === "General")

    return(
            <main className = "suggestions">
            <h2 className="m1">Suggestions</h2>
            {suggestedVideos.map(video => (<div key = {video._id} className = "video-card" onClick = {() => getSingleVideo(video)} >
                        <img src= {video.imgsrc} className = "video" alt=""/>
                        <h2 className = "margin title">{video.title}</h2>
                        <div className = "flex">
                        <img className = "avatar" src={video.imgsrc} alt=""/>
                        <p className = "font-small margin" >{video.creator}</p>
                        </div>
                    </div>))}
            </main>
)
}

export {Suggestions}