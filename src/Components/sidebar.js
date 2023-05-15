import {NavLink} from "react-router-dom"
import { useAuth } from "../Contexts/auth-context"

const Sidebar = () => {
    const {auth} = useAuth()
    return (
    <aside className = "sidebar-container">
        <ul className = "sidebar-nav">
           <NavLink to = "/home" className={({ isActive }) => 
                      (isActive ? "sidebar-link-active  " : " link ")}> <li className = "sidebar-link hover" ><span className="material-icons">home</span> Home </li>
           </NavLink>
           <NavLink to = "/library" className={({ isActive }) => 
                      (isActive ? "sidebar-link-active " : " link")}> <li className = "sidebar-link hover" ><span className="material-icons">video_library</span> Library </li>
           </NavLink>
           <NavLink to = "/playlists" className={({ isActive }) => 
                      (isActive ? "sidebar-link-active " : " link")}> <li className = "sidebar-link hover" ><span className="material-icons">playlist_play</span> Playlists</li>
           </NavLink>
           <NavLink to = "/history" className={({ isActive }) => 
                      (isActive ? "sidebar-link-active " : " link")}> <li className = "sidebar-link hover" ><span className="material-icons">history</span> History </li>
           </NavLink>
           { !auth.status && <NavLink to = "/login" className={({ isActive }) => 
                      (isActive ? "sidebar-link-active " : " link")}> <li className = "sidebar-link hover" ><span className="material-symbols-outlined">account_circle</span> Account </li>
           </NavLink>}
        </ul>
    </aside>
    )
}

export {Sidebar}