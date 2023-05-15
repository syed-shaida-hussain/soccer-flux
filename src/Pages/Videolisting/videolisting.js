import axios from "axios"
import { useEffect } from "react"
import "../Videolisting/videolisting.css"
import { useServices } from "../../Contexts/service-context"
import { useFilters } from "../../Contexts/filter-context"
import { Loader } from "../../Components/loader"
import { VideoCard } from "../../Components/videoCard"

const VideoListing = () => {
    const {videoState , dispatchVideo , isLoading , setIsLoading} = useServices(); 
    const {filterState,dispatchFilter} = useFilters();
  
    useEffect(() => {
      setIsLoading(true)
      axios.get("/api/videos").then((res) => {
        dispatchVideo({type : "GET_VIDEOS" , payload : res.data.videos})
      })
      axios.get("/api/categories").then((res) => {
        dispatchVideo({type : "GET_CATEGORIES" , payload : res.data.categories})
        setIsLoading(false)
      })
    },[])

    const filteredVideos = filterState.filteredCategory === "All" ? videoState.videos: videoState.videos.filter((video) => video.category === filterState.filteredCategory)
    const searchedVideos = filterState.searchQuery === "" ? filteredVideos : filteredVideos.filter((video) => video.title.toLowerCase().includes(filterState.searchQuery.toLowerCase()))

    const filterVideos = (category) => {
      dispatchFilter({type : "FILTER_VIDEOS" , payload : category.categoryName});
    }

    return isLoading ? (<Loader/>) : ( <div>
            <div className = "chip-container">
                {videoState.categories.map((category) => <button key={category._id} className = {filterState.filteredCategory === category.categoryName ? "active-link chip-button chip" : "chip-button chip"} onClick={() => filterVideos(category)} >{category.categoryName}</button> )}
            </div>                
            <main className = "home-main videos-wrapper">
            {searchedVideos.map(video => (<VideoCard video = {video} key={video._id} />))}
            </main>
    </div>)
}

export {VideoListing}