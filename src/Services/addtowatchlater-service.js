import axios from "axios";

const addToWatchLaterService = async ( video ,token ) => {
    try {
        await axios.post(
          "/api/user/watchlater",
            {video},
          {
            headers: { authorization: token },
          } 
        );
      } catch (e) {
        console.log(e);
      }
}

export { addToWatchLaterService }