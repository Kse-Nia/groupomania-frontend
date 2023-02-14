import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:8080/api/";

// Likes & Dislikes
const likePost = async (likeData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `http://localhost:8080/api/like/${likeData?.PostId}`,
      likeData,
      config
    );
    const commentAlert = toast.success("Liké !");
    return [response.data, commentAlert, likeData?.PostId];
  } catch (error) {
    console.log("error", error);
    console.log("error", error.response);
  }
};

const unlikePost = async (dislikeData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `http://localhost:8080/api/dislike/${dislikeData?.PostId}`,
      dislikeData,
      config
    );
    const commentAlert = toast.success("Like retiré !");
    return [response.data, dislikeData?.PostId, commentAlert];
  } catch (error) {
    console.log("error", error);
  }
};

const getAllLikes = async (id) => {
  try {
    const response = await axios.get(API_URL + "alllikes/" + id);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

const likeService = {
  likePost,
  unlikePost,
  getAllLikes,
};
export default likeService;
