import "./homepage.css"
import LandindImg from "../../Assets/Images/video-library-landing-pic.svg"
import { Header } from "../../Components/header"
import {Sidebar} from "../../Components/sidebar"
import { Link } from "react-router-dom"

const Home = () => {
    return (<div>
    <Header />
    <div className = "main-wrapper">
        <Sidebar />
        <div>
        <main className = "home-main">
         <section className = "info">Hey there user! Welcome to <span className = "highlighted">Soccer Flux</span> , a goto place for all the Football fans. Here you can explore a wide range of football specific videos. So, bring your snacks and enjoy watching your favourite football videos here at <span className = "highlighted">Soccer Flux</span> , the ultimate destination for all the football admirers and lovers. <span className = "highlighted">Let's Watch!</span>
         <div>
             <button className = "explore-btn"><Link className = "link highlighted" to ="/videos">Explore</Link></button>
         </div>

        </section>
        <div >
             <img className= "landing-img" src= {LandindImg} alt=""/>
        </div>  
        </main>
        </div>
    </div>
</div>)
    
}

export {Home}