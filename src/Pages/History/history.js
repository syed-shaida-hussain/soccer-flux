import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../Contexts/auth-context"
import axios from "axios"
import { useEffect } from "react"
import { useServices } from "../../Contexts/service-context"
import "../Videolisting/videolisting.css"
import { Loader } from "../../Components/loader"

const HistoryPage = () => {
    const { videoState , dispatchVideo , isLoading ,setIsLoading} = useServices();
    const { 
        auth: { token  } ,
      }  = useAuth()

      const navigate = useNavigate()

      useEffect(() => {
        setIsLoading(true)
        axios.get("/api/user/history", {headers : {authorization : token}}).then(res => {
          dispatchVideo({type : "GET_HISTORY_VIDEOS" , payload : res.data.history})
          setIsLoading(false)
        })
      },[])

      const getSingleVideo = async  (video) => {
        navigate(`/video/${video._id}`)
    }
    

    const deleteFromHistoryService = async (video) => {
        try {
          await axios.delete(`/api/user/history/${video._id}` , {headers :{authorization : token} , });
        } catch(e) {
          console.log(e)
        }
      }
      
      const deleteAllFromHistoryService = async () => {
        try {
          await axios.delete("/api/user/history/all", {headers : {authorization : token}})
        } catch(e){
          console.log(e)
        }
      }

    const deleteAllHistoryVideos = async (token) => {
        await deleteAllFromHistoryService(token);
        dispatchVideo({type : "DELETE_ALL_HISTORY_VIDEOS"})
      }
      
      const deleteFromHistory = async (video , token) => {
        await deleteFromHistoryService(video , token);
        dispatchVideo({type : "DELETE_HISTORY_VIDEO" , payload : video})
      }
      
    return isLoading ? <Loader />  : (<main >
      <div className="services">
      <h3 className = "heading">History ({videoState.historyVideos.length}) |</h3>
      <div className = "clear-history-btn-container" >
    {videoState.historyVideos.length > 0 && <button className = "clear-history-btn" onClick = {() => deleteAllHistoryVideos()}>Clear all History videos</button>}</div>
      </div>
    {videoState.historyVideos.length > 0 ? <div className = "services margin-top-bottom">
      { videoState.historyVideos.map((video) => ( 
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
                            <span className = "material-icons delete-icon" onClick = {() => deleteFromHistory(video)}>delete</span></div> 
                          </div>
                          </div>
             ))}
     </div> : <div className = "explore-suggestion">Watch some videos . Your list will be shown right here.
    <div className = "explore-btn"><Link to = "/home" className = "link highlighted">Explore</Link></div> </div> }
      </main>)
}

export {HistoryPage}