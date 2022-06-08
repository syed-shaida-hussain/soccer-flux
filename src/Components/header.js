import {Link} from "react-router-dom"
const Header = () => {
    return (
    <header>
        <ul className = "nav-links"> 
            <li className = "nav-pill brand"><span className="material-symbols-outlined">sports_soccer</span> Soccer Flux</li>
            <input type="text" className = "search-bar" placeholder = "Search"/>
            <li className = "nav-pill login-btn" > <Link className = "nav-pill login-btn" to = "/login"><span className="material-symbols-outlined">
                account_circle</span></Link> 
            </li>
        </ul>
        <hr/>
    </header>)
}

export {Header}