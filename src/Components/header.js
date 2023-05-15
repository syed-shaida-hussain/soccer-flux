import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../Contexts/auth-context"
import { useFilters } from "../Contexts/filter-context";
import { useServices } from "../Contexts/service-context";
const Header = () => {
    const {auth , setAuth , setLoggedInUser} = useAuth();
    const {dispatchVideo} = useServices();
    const {dispatchFilter } = useFilters();
    const navigate = useNavigate();

    const logout = () =>{
        setAuth({...auth , status : false})
        dispatchVideo({type : "RESET_USER_DATA"})
        localStorage.removeItem("AUTH_TOKEN")
        setLoggedInUser(null)
      }
      const location = useLocation();

      const searchbarChangeHandler = (e) => {
        dispatchFilter({type : "SEARCH_FILTER" , payload : e.target.value})
      }
    return (
    <header>
        <ul className = "nav-links"> 
            <li className = "nav-pill flex ctr-vert button" onClick={() => navigate("/home")}><span className="material-symbols-outlined hero-icon">play_circle</span>Soccer Flux</li>
            {location.pathname === "/home" && <input type="text" className = "search-bar" placeholder = "Search" onChange={searchbarChangeHandler}/>}
            {location.pathname === "/" && <input type="text" className = "search-bar" placeholder = "Search" onChange={searchbarChangeHandler}/>}
            <li className = "nav-pill login-btn" > {!auth.status ? <Link className = "nav-pill login-btn" to = "/login"><button className="logout-btn" onClick={() => navigate("/login")}>Sign in</button></Link> : <button className="logout-btn" onClick={() => logout()}>Logout</button>} 
            </li>
        </ul>
    </header>)
}

export {Header}