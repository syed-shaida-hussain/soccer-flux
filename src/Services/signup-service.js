import axios from "axios";

const signupService = async ({ email, password , firstName , lastName }) => {
  try {
    const {
      data
    } = await axios.post("/api/auth/signup", {
      email: email,
      password: password,
      firstName : firstName , 
      lastName : lastName
    });
    console.log(data)
    return data;
   
  } catch (e) {
    console.log(e);
  }
};
export { signupService };