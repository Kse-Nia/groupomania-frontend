import axios from "axios";

// Get All Comments
const getAllComments = async (PostId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.get(
      `http://localhost:8080/api/comments/${PostId}`,
      config
    );
    return response.data;
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

const createComment = async (commentData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `http://localhost:8080/api/comments`,
      commentData,
      config
    );
    return [response.data, commentData?.PostId];
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

const deleteComment = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(
      `http://localhost:8080/api/comments/${id}`,
      config
    );
    return response.data;
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

const commentsService = {
  createComment,
  getAllComments,
  deleteComment,
};
export default commentsService;
