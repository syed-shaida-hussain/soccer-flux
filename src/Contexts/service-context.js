import { createContext, useContext, useReducer } from "react";
 const ServiceContext = createContext();

 const serviceReducer = (state , action ) => {
     switch (action.type) {
        case "GET_VIDEOS" : 
            return {...state , videos : (state.videos , action.payload)}
        case "SET_LIKED_VIDEOS" :
            return {...state , likedVideos : [state.likedVideos , action.payload] }
        case "DELETE_LIKED_VIDEOS" :
            return {...state , likedVideos : (state.likedVideos.filter(video => video._id !== action.payload._id))}
        case "SET_WATCHLATER_VIDEOS" :
            return {...state , watchLater : [state.watchLater , action.payload] }
        case  "DELETE_WATCHLATER_VIDEOS" :
            return {...state , watchLater : (state.watchLater.filter(video => video._id !== action.payload._id))}
        case "SET_HISTORY_VIDEOS" :
            return {...state , historyVideos : [state.historyVideos , action.payload] }
        case  "GET_HISTORY_VIDEOS" :
            return {...state , historyVideos : (state.historyVideos , action.payload)}
        case  "DELETE_HISTORY_VIDEO" :
            return {...state , historyVideos : (state.historyVideos.filter(video => video._id !== action.payload._id))}
        case  "DELETE_ALL_HISTORY_VIDEOS" :
            return {...state , historyVideos : []}
        case "SET_PLAYLISTS" :
            return {...state , playlists : [state.playlists , action.payload]}
        case "GET_PLAYLIST_VIDEOS" :
            return {...state , playlistVideos : (state.playlistVideos , action.payload)}
        case "SET_PLAYLIST_VIDEOS" :
            return {...state , playlistVideos : [state.playlistVideos , action.payload]}
        default :
            return {...state }
     }
 }


 const ServiceProvider = ({children}) => {
    const [videoState  , dispatchVideo] = useReducer(serviceReducer ,  {videos : [] , likedVideos : [] , watchLater : [] , playlists: [] , historyVideos : [] })

    return <ServiceContext.Provider value = {{ videoState , dispatchVideo }}>
        {children}
    </ServiceContext.Provider>
 }

 const useServices = () => useContext(ServiceContext)

 export {useServices , ServiceProvider}