import { useState, createContext , useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("AUTH_TOKEN"),
    status: localStorage.getItem("AUTH_TOKEN") ? true : false,
    username: localStorage.getItem("username") || "",
  });

  const [loggedInUser,setLoggedInUser] = useState({})

  return (
    <AuthContext.Provider value={{ auth, setAuth , loggedInUser , setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };