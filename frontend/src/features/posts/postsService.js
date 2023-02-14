import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:8080/api/";

// New Post
const createPost = async (postData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.post(API_URL + "create", postData, config);
    const postAlert = toast.success("Posté");
    return [response.data, postAlert];
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
  }
};

// Get All Posts
const getAllPosts = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.get(API_URL + "posts", config);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

// Delete One Post
const deleteOnePost = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(API_URL + id, config);
    const windowAlert = toast.success("Post supprimé");
    return [response.data, windowAlert];
  } catch (error) {
    if (typeof error.response.data === "string") {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
  }
};

const updatePost = async (postData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.put(
      `http://localhost:8080/api/${postData?.id}`,
      postData,
      config
    );
    const updateAlert = toast.success("Post mis à jour");
    return [response.data, updateAlert];
  } catch (error) {
    console.log("error", error);
  }
};

// Exportation services
const postsService = {
  createPost,
  getAllPosts,
  deleteOnePost,
  updatePost,
};

export default postsService;
