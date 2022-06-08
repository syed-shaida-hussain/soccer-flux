import axios from "axios";

const signinService = async ({ email, password }) => {
  try {
    const { data } = await axios.post("/api/auth/login", {
      email: email,
      password: password,
    });
    return data;
   
  } catch (e) {
    console.log(e);
  }
}
export { signinService };