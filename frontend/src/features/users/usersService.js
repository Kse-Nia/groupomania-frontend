import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const API_URL = "http://localhost:8080/home/";

const getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "/users", config);

  return response.data;
};

// Delete One User
const deleteOneUser = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const notify = () => toast("Utilisateur supprimé !");
    const response = await axios.delete(API_URL + id, config);
    return [response.data, notify()];
  } catch (error) {
    if (error.response) {
      console.log(error.response);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
  }
};

// Exportation services
const usersService = {
  getAllUsers,
  deleteOneUser,
};

export default usersService;
