import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../Contexts/auth-context"
import axios from "axios"
import {Header} from "../../Components/header"
import { useEffect } from "react"
import { useServices } from "../../Contexts/service-context"
import { Sidebar } from "../../Components/sidebar"
import "../Videolisting/videolisting.css"

const HistoryPage = () => {
    const { videoState , dispatchVideo} = useServices()
    const { 
        auth: { token  } ,
      }  = useAuth()

      const navigate = useNavigate()

      useEffect(() => {
        axios.get("/api/user/history", {headers : {authorization : token}}).then(res => {
          dispatchVideo({type : "GET_HISTORY_VIDEOS" , payload : res.data.history})
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
      
    return (<div>
        <Header />
        <div className = "main-wrapper">
          <Sidebar/>
      <div>
      
      <hr/>
      
      <main >
      <h2 className = "margin heading">History ({videoState.historyVideos.length}) |</h2>
      <div className = "clear-history-btn-container" >
    {videoState.historyVideos.length > 0 && <button className = "clear-history-btn" onClick = {() => deleteAllHistoryVideos()}>Clear all History videos</button>}     </div>
    {videoState.historyVideos.length > 0 ? <div className = "services margin-top-bottom">
      { videoState.historyVideos.map((video) => ( 
        <div key = {video._id}  className = "video-card">
          <div onClick = {() => getSingleVideo(video)}>
                <img src= {video.imgsrc} className = "video" alt=""/>
                <h4 className = "margin">{video.title}</h4>
                <div className = "flex">
                  <img className = "avatar" src={video.imgsrc} alt=""/>
                  <p className = "font-small margin" >{video.creator}</p>
                </div>
                </div>
                <span className = "material-icons delete-icon" onClick = {() => deleteFromHistory(video)}>delete</span></div> 
             ))}
     </div> : <div className = "explore-suggestion margin margin-top-bottom">Watch some videos . Your list will be shown right here.
    <div className = "explore-btn"><Link to = "/videos" className = "link highlighted">Explore</Link></div> </div> }
      </main>
      </div>
      </div>
      </div>)
}

export {HistoryPage}