import { Header } from "../../Components/header"
import axios from "axios"
import { useEffect } from "react"
import "../Videolisting/videolisting.css"
import {Sidebar} from "../../Components/sidebar"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../Contexts/auth-context"
import { useServices } from "../../Contexts/service-context"
import { useFilters } from "../../Contexts/filter-context"

const VideoListing = () => {
    const {auth : {token}} = useAuth()
    const {videoState , dispatchVideo} = useServices(); 
    const {filterState,dispatchFilter} = useFilters();
    const navigate = useNavigate();
  
    useEffect(() => {
      axios.get("/api/videos").then((res) => {
        dispatchVideo({type : "GET_VIDEOS" , payload : res.data.videos})
      })
      axios.get("/api/categories").then((res) => {
        dispatchVideo({type : "GET_CATEGORIES" , payload : res.data.categories})
      })
    },[])

    const addToHistoryService = async (video) => {
      try {
        await axios.post(
          "/api/user/history" ,
            {video : video}  , { headers : {authorization : token}})
      } catch(e){
        console.log(e)
      }
    }

    const filteredVideos = filterState.filteredCategory === "All" ? videoState.videos: videoState.videos.filter((video) => video.category === filterState.filteredCategory)
    const searchedVideos = filterState.searchQuery === "" ? filteredVideos : filteredVideos.filter((video) => video.title.toLowerCase().includes(filterState.searchQuery.toLowerCase()))


    const getSingleVideo = async (video,token) => {
      navigate(`/video/${video._id}`)    
      videoState.historyVideos.find((historyVideo) => historyVideo._id === video._id) ? "" : await addToHistoryService(video , token) &&
      dispatchVideo({type : "SET_HISTORY_VIDEOS" , payload : video})
    }

    const filterVideos = (category) => {
      dispatchFilter({type : "FILTER_VIDEOS" , payload : category.categoryName});
    }

    return(<div>
        <Header />
        <div className = "main-wrapper">
          <Sidebar />
            <div>
            <div className = "chip-container">
                {videoState.categories.map((category) => <button key={category._id} className = {filterState.filteredCategory === category.categoryName ? "active-link chip-button chip" : "chip-button chip"} onClick={() => filterVideos(category)} >{category.categoryName}</button> )}
            </div>
              <hr/>
                
            <main className = "home-main">
            {searchedVideos.map(video => (<div key = {video._id} className = "video-card" onClick = {() => getSingleVideo(video)} >
                        <img src= {video.imgsrc} className = "video" alt=""/>
                        <h2 className = "margin title">{video.title}</h2>
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

export {VideoListing}