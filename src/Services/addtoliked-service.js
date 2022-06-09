import axios from "axios";

    const addToLikedService = async ( video , token  ) => {
        try {
            await axios.post(
              "/api/user/likes",
                {video},
              {
                headers: { authorization: token },
              } 
            );
          } catch (e) {
            console.log(e);
          }
        }

   

export { addToLikedService }