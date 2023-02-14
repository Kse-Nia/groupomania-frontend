import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Style/style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./Routes/ProtectedRoutes";
import Header from "./Components/Navbar/Header";

import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import UpdateProfile from "./Pages/UpdateProfile";
import CreatePost from "./Pages/CreatePost";
import UpdatePost from "./Pages/UpdatePost";
import Users from "./Pages/Users";

import ErrorBoundary from "./Utils/ErrorBoundary";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Router>
        {user ? <Header /> : null}
        <ErrorBoundary>
          <div className="container">
            <Routes>
              <Route index path="/" element={<Home />} />
              <Route element={<ProtectedRoute user={user} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/updateprofile" element={<UpdateProfile />} />
                <Route path="/api/users" element={<Users />} />
                <Route path="/newpost" element={<CreatePost />} />
                <Route path="/updatepost/:id" element={<UpdatePost />} />
                <Route path="*" element={<Dashboard />} />
              </Route>
            </Routes>
          </div>
        </ErrorBoundary>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
