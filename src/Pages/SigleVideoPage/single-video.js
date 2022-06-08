import { useParams , useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import "../SigleVideoPage/single-video.css"
import { useAuth } from "../../Contexts/auth-context"
import { addToLikedService } from "../../Services/addtoliked-service"
import {addToWatchLaterService} from "../../Services/addtowatchlater-service"
import { useServices } from "../../Contexts/service-context"

const SingleVideoPage = () => {
    const { videoId  } = useParams()
    const [currVideo, setCurrVideo ] = useState({})
    const { 
        auth: { status , token } ,
      }  = useAuth()
  
    const navigate = useNavigate()
    
    const [isModalActive , setIsModalActive] = useState(false)
    const [playlistName , setPlaylistName] = useState("")
    const {videoState , dispatchVideo} = useServices()

    useEffect(() => {
        axios.get(`/api/video/${videoId}`).then(res => {
            const singleVideo = res.data.video;
            setCurrVideo(singleVideo)
        })
        axios.get("/api/user/playlists" , {headers : {authorization : token}}).then(res =>  {
          dispatchVideo({type : "GET_PLAYLISTS" , payload : res.data.playlists})
        })
    },[videoState])

  const deteteFromLikedService = async (video) => {
    try {
      await axios.delete(`/api/user/likes/${currVideo._id}` , {headers : {authorization : token} , });
    } catch(e) {
      console.log(e)
    }
  }

  const deleteFromWatchLaterService = async () => {
    try {
      await axios.delete(`/api/user/watchlater/${currVideo._id}` , {headers : {authorization : token} , });
    } catch(e) {
      console.log(e)
    }
  }

  
  const addPlaylistService = async ( playlist ) => {
    try  {
    
        await axios.post(
          "/api/user/playlists",
          {
            playlist: { ...playlist , title: playlistName, description:"description"}
          },
          {
            headers: { authorization: token },
          } 
        );  
      } catch (e) {
        console.log(e);
      }
    }

    const addVideoToPlaylistService = async ( playlist  ) => {
      try {
        await axios.post(`/api/user/playlists/${playlist._id}`, {video : currVideo} , { headers : { authorization : token },
      })
      } catch (e){
        console.log(e)
      }
    }


    const addVideoToPlaylist = async (playlist) => {
      await addVideoToPlaylistService( playlist)
      dispatchVideo({type: "SET_PLAYLIST_VIDEOS" , payload : currVideo})
      setIsModalActive(false)
    }

    const addPlaylist = async (playlist, token) => {
      await addPlaylistService(playlist, token);
      dispatchVideo({type: "SET_PLAYLISTS" , payload : {playlist , title : playlistName , description : ""}})
      setIsModalActive(false)
    };
    

    const addToLiked = async (video, token ) => {
      await addToLikedService(video, token);
      dispatchVideo({type : "SET_LIKED_VIDEOS" , payload : currVideo})
    };
    
    const addToWatchLater = async (video , token) => {
      await addToWatchLaterService(video , token)
      dispatchVideo({type : "SET_WATCHLATER_VIDEOS" , payload : currVideo})
    }

    const deleteFromLikedVideos = async ( video , token) => {
        await deteteFromLikedService( video,token);
        dispatchVideo({type : "DELETE_LIKED_VIDEOS" , payload : currVideo})
      }

      const deleteFromWatchLater = async (video , token) => {
        await deleteFromWatchLaterService(video , token);
        dispatchVideo({type : "DELETE_WATCHLATER_VIDEOS" , payload : currVideo})
      }

    return (<div className = "flex">
    <div key = {currVideo._id} className = "single-video-card" >
    <iframe className = "single-video" allowFullScreen = "1" allow = "accelerometer"  src= {currVideo.src+"?autoplay=1&mute=1"} ></iframe>
    <h4 className = "margin">{currVideo.title}</h4>
    <div className = "flex">
        <img className = "avatar" src={currVideo.imgsrc} alt=""/>
      <p className = "font-small margin" >{currVideo.creator}</p>
    </div>
    { isModalActive && <div className = "modal-card">
        <input type = "text" placeholder = "enter new playlist name" onChange = {(e) => setPlaylistName(e.target.value)} />
        <div><button onClick = {() => addPlaylist()}>Add new playlist</button></div>
        {videoState.playlists.map(playlist => <div>
          <button  onClick = {() => addVideoToPlaylist( playlist , currVideo )}>Add to {playlist.title}</button>
      </div>)}
        
    </div> }
   
<div className = "flex margin-top-bottom">

<button className = "like-button">{videoState.likedVideos.find(item => item._id === currVideo._id) ? <span onClick={() =>
        status
          ? deleteFromLikedVideos(currVideo, token)
          : navigate("/login")
      }  className= "material-icons red" >thumb_up</span> : <span onClick={() =>
        status
          ? addToLiked(currVideo, token)
          : navigate("/login")
      }  className= "material-symbols-outlined">thumb_up</span>}</button>

<button className = "like-button">{videoState.watchLater.find(item => item._id === currVideo._id) ? <span onClick = {() => status ? deleteFromWatchLater(currVideo,token) : navigate("/login") }className="material-icons red">watch_later
</span> : <span onClick={() =>
        status
          ? addToWatchLater(currVideo, token)
          : navigate("/login")
      }  className= "material-symbols-outlined">schedule</span> }
</button>

<button className = "like-button">{videoState.playlists.find(item => item._id === currVideo._id) ? <span onClick={() =>
        status
          ? setIsModalActive(!isModalActive)
          : navigate("/login")
      }  className= "material-icons red" >playlist_add_check</span> : <span onClick={() => setIsModalActive(!isModalActive)
      }  className= "material-symbols-outlined">playlist_add</span> }
</button>
</div>
<div className = "font-small margin margin-top-bottom">{currVideo.description}</div>
</div></div>) 
       
}

export {SingleVideoPage}