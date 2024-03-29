import { useState } from "react";
import { useAuth } from "../../../Contexts/auth-context";
import { useNavigate, Link } from "react-router-dom"
import { signinService } from "../../../Services/signin-service";
import "./login.css";

const Signin = () => {
 
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const currUser = localStorage.getItem("USER")
  const currentUser = JSON.parse(currUser)
  const { setAuth, auth } = useAuth();
  const navigate = useNavigate()

  const signinSubmitHandler = async (user) => {
    const { encodedToken} = await signinService(user);
    if (encodedToken !== undefined) {
      localStorage.setItem("AUTH_TOKEN", JSON.stringify(encodedToken));
      setAuth(auth => ({
        ...auth,
        status: true,
        token: encodedToken,
      }));
    }
    navigate("/home")
  };


  return ( !auth.status ?
    <section className="flex login-page-wrapper" >
      <form className="form-wrapper flex-page"   onSubmit={e => {
          e.preventDefault();
          signinSubmitHandler(user);
        }}>
        <h1 className="page-heading centered">Login</h1>
  
        <div className="input-labels">Email Address</div>
        <input className="input-field" type="email" placeholder="example@gmail.com" value={user.email }
            onChange={e => setUser({ ...user, email: e.target.value })} required />
  
        <div className="input-labels">Password</div>
        <input className="input-field" type="password" placeholder="***********"  value={user.password}
              onChange={e => setUser({ ...user, password: e.target.value })} required/>
  
        <button className="login-button" type = "submit">Signin</button>
        <button className="signin-guest-btn login-button"
            type="button"
            onClick={() =>
              signinSubmitHandler({
                email: "adarshbalika@gmail.com",
                password: "adarshBalika123",
              })
            }
          >
            Signin as Guest
          </button>
  
        <button className="create-account-link"><Link to = "/signup">Create new account &gt; </Link></button>
    </form>
    </section> : <div className=" centered ">
      <h1>You are already Logged In</h1>
      <div><button className="login-button suggestion" onClick={() => navigate("/home")}>Explore Videos</button></div>
      </div>
  );
};
export { Signin };