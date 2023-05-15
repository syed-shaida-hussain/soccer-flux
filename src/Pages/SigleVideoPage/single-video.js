import { useParams , useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import "../SigleVideoPage/single-video.css"
import "../Videolisting/videolisting.css"
import { useAuth } from "../../Contexts/auth-context"
import { addToLikedService } from "../../Services/addtoliked-service"
import {addToWatchLaterService} from "../../Services/addtowatchlater-service"
import { useServices } from "../../Contexts/service-context"
import { Suggestions } from "../../Components/suggestions"
import { Loader } from "../../Components/loader"

const SingleVideoPage = () => {
    const { videoId  } = useParams();
    const [currVideo, setCurrVideo ] = useState({});
    const { 
        auth: { status , token } ,
      }  = useAuth();
  
    const navigate = useNavigate();
    
    const [isModalActive , setIsModalActive] = useState(false);
    const [playlistName , setPlaylistName] = useState("");
    const {videoState , dispatchVideo} = useServices();

    useEffect(() => {
      videoId == undefined ? navigate("/home") :
        axios.get(`/api/video/${videoId}`).then(res => {
          const singleVideo = res?.data?.video;
          setCurrVideo(singleVideo)
      })

      axios.get("/api/user/playlists" , {headers : {authorization : token}}).then(res =>  {
        dispatchVideo({type : "GET_PLAYLISTS" , payload : res?.data?.playlists})
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

  
  const addPlaylistService = async () => {
    try  {
    
        await axios.post(
          "/api/user/playlists",
          {
            playlist: { title: playlistName }
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
      setIsModalActive(false)
    }

    const addPlaylist = async (playlist, token) => {
      await addPlaylistService(playlist, token);
      dispatchVideo({type: "SET_PLAYLISTS" , payload : playlistName})
      setPlaylistName("")
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

    return (<div >
    <div className = "flex-page">
    <div key = {currVideo._id} className = "single-video-card" >
    <iframe className = "single-video" allowFullScreen = "1" allow = "accelerometer" controls = "0"  src= {currVideo.src+"?autoplay=1&loop=1&controls=0"} ></iframe>
    <div className = "flex">
                        <img className = "avatar" src={currVideo.imgsrc} alt=""/>
                        <div className = "margin">
                        <p className = " title">{currVideo.title}</p>
                        <p className = "font-small " >{currVideo.creator}</p>
                        </div>
                        </div>
    { isModalActive && <div className = "modal-card">
      <form onSubmit={(e) => {
        e.preventDefault();
        addPlaylist();
      }}>
      <input value={playlistName} className="input" required type = "text" placeholder = "Enter New Playlist name" onChange = {(e) => setPlaylistName(e.target.value)} />
      <div ><button className="add-playlist-btn" type="submit">Add new playlist</button></div>
      </form>

        {videoState.playlists.map(playlist => <div key={playlist._id}>
          <button className="add-playlist-btn"  onClick = {() => addVideoToPlaylist( playlist , currVideo )}>Add to {playlist.title}</button>
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

<button className = "like-button">{videoState.playlists?.find(item => item?.videos?.find((video) => video._id=== currVideo._id)) ? <span onClick={() =>
        status
          ? setIsModalActive(!isModalActive)
          : navigate("/login")
      }  className= "material-symbols-outlined red" >playlist_add_check</span> : <span onClick={() => setIsModalActive(!isModalActive)
      }  className= "material-symbols-outlined">playlist_add</span> }
</button>

</div>
<div className = "description font-small margin margin-top-bottom">{currVideo.description}</div>
</div>
<Suggestions/>
  </div>
</div>) 
       
}

export {SingleVideoPage}