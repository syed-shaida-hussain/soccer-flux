import {Link, useLocation} from "react-router-dom"
import { useAuth } from "../Contexts/auth-context"
import { useFilters } from "../Contexts/filter-context";
import { useServices } from "../Contexts/service-context";
const Header = () => {
    const {auth , setAuth} = useAuth();
    const {dispatchVideo} = useServices();
    const {dispatchFilter } = useFilters();

    const logout = () =>{
        setAuth({...auth , status : false})
        dispatchVideo({type : "RESET_USER_DATA"})
        localStorage.removeItem("AUTH_TOKEN")
      }
      const location = useLocation();

      const searchbarChangeHandler = (e) => {
        dispatchFilter({type : "SEARCH_FILTER" , payload : e.target.value})
      }
    return (
    <header>
        <ul className = "nav-links"> 
            <li className = "nav-pill brand">Soccer Flux</li>
            {location.pathname === "/videos" && <input type="text" className = "search-bar" placeholder = "Search videos" onChange={searchbarChangeHandler}/>}
            <li className = "nav-pill login-btn" > {!auth.status ? <Link className = "nav-pill login-btn" to = "/login"><span className="material-symbols-outlined">
                account_circle</span></Link> : <button className="logout-btn" onClick={() => logout()}>Logout</button>} 
            </li>
        </ul>
        <hr/>
    </header>)
}

export {Header}