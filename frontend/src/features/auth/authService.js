import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_URL = "http://localhost:8080/home/";

const register = async (userData) => {
  const response = await axios.post(API_URL + "/register", userData);
  const notify = () =>
    toast.success("Compte créé", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  return [response.data, notify()];
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Delete user account
const deleteUserAccount = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(
      `http://localhost:8080/home/delete/${id}`,
      config
    );
    const notify = () =>
      toast.warn("Compte supprimé !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    localStorage.removeItem("user");
    return [response.data, notify()];
  } catch (error) {
    console.log(error);
  }
};

// Update user account
const updateUserAccount = async (userData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.put(
      `${API_URL}/updateprofile/${userData?.id}`,
      userData,
      config
    );
    const updateLS = localStorage.setItem(
      "user",
      JSON.stringify(response.data)
    );
    const updateAlert = toast.success("Profil mis à jour");
    return [response.data, updateLS, updateAlert];
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

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
  deleteUserAccount,
  updateUserAccount,
};

export default authService;
