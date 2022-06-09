import { Header } from "../../Components/header"
import axios from "axios"
import { useEffect } from "react"
import "../Videolisting/videolisting.css"
import {Sidebar} from "../../Components/sidebar"
import {useNavigate, Link} from "react-router-dom"
import { useAuth } from "../../Contexts/auth-context"
import { useServices } from "../../Contexts/service-context"

const CategoryGeneral = () => {
    const {auth : {token}} = useAuth()
    const {videoState , dispatchVideo} = useServices()
 
    const navigate = useNavigate()
  
    useEffect(() => {
      axios.get("/api/videos").then((res) => {
        dispatchVideo({type : "GET_VIDEOS" , payload : res.data.videos})
      })
    },[])

    const addToHistoryService = async (video) => {
      try {
        await axios.post(
          "/api/user/history" ,
            {video}  , { headers : {authorization : token}})
      } catch(e){
        console.log(e)
      }
    }

      const getSingleVideo = async (video, token) => {
        await addToHistoryService(video , token)
        navigate(`/video/${video._id}`)
    }

    return(<div>
        <Header />
        <div className = "main-wrapper">
        <Sidebar />
<div>
<div className = "chip-container">
     <button ><Link to = "/videos" className="chip"> Explore</Link></button>
     <button ><Link to = "/club" className="chip">Club</Link></button>
     <button ><Link to = "/country" className="chip">Country</Link></button>
     <button ><Link to = "/general" className="chip active-link">General</Link></button>
   </div>

    <hr/>
    
<main className = "home-main">
{videoState.videos.map(video => video.category === "general" && (<div key = {video._id} className = "video-card" onClick = {() => getSingleVideo(video)} >
            <img src= {video.imgsrc} className = "video" alt=""/>
            <h4 className = "margin">{video.title}</h4>
            <div className = "flex">
              <img className = "avatar" src={video.imgsrc} alt=""/>
              <p className = "font-small margin" >{video.creator}</p>
            </div>
        </div>))}
</main>
</div>
</div>
    </div>)
}

export {CategoryGeneral}