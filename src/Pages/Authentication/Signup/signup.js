import { useState } from "react";
import { useAuth } from "../../../Contexts/auth-context";
import {useNavigate} from "react-router-dom"
import { signupService } from "../../../Services/signup-service";
import "../Login/login.css";

const Signup = () => {
 
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "" , 
    lastName : ""
  });
  const { setAuth } = useAuth();
  const navigate = useNavigate()

  const signupSubmitHandler = async (user) => {
    const {firstName, lastName , encodedToken} = await signupService(user);
    if (encodedToken !== undefined) {
      localStorage.setItem("AUTH_TOKEN", JSON.stringify(encodedToken));
      localStorage.setItem("USERNAME", JSON.stringify(user.firstName));
      setAuth(auth => ({
        ...auth,
        status: true,
        token: encodedToken,
        firstName: firstName,
        lastName : lastName
      }));
    }
  };

  return (
    <section >
      <form class="page-wrapper flex-page"   onSubmit={e => {
          e.preventDefault();
          signupSubmitHandler(user);
        }}>
        <h1 class="page-heading centered">Signup</h1>


     <div class="input-labels">First name</div>
        <input class="input-field"  value={user.firstName}
            onChange={e => setUser({ ...user, firstName : e.target.value })} required />

<div class="input-labels">Last name</div>
        <input class="input-field"  value={user.lastName}
            onChange={e => setUser({ ...user, lastName : e.target.value })} required />
            
        
        <div class="input-labels">Email Address</div>
        <input class="input-field" type="email" placeholder="example@gmail.com" value={user.email}
            onChange={e => setUser({ ...user, email: e.target.value })} required />
  
        <div class="input-labels">Password</div>
        <input class="input-field" type="password" placeholder="***********"  value={user.password}
              onChange={e => setUser({ ...user, password: e.target.value })} required />
  
        <button class="login-button" type = "submit">Signup</button>
    </form>
    </section>
  );
};
export { Signup };