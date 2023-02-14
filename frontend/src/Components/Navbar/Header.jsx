import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import "./Header.css";
import Logo2 from "../../Assets/Logo2.svg";

const Header = () => {
  const navigate = useNavigate;

  function clearStorage() {
    window.localStorage.clear();
    window.location.reload();
    navigate("/home");
  }

  return (
    <header className="header">
      <nav className="nav" aria-label="navbar">
        <input type="checkbox" id="nav-check" aria-label="menu checkbox" />
        <div className="nav-btn">
          <label
            label="burger menu"
            htmlFor="nav-check"
            aria-label="ouvrir menu"
          >
            <span className="visually-hidden">Menu</span>
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <div className="nav-links">
          <img src={Logo2} alt="Groupomania" className="logo" />
          <a href="/dashboard">
            <HomeOutlinedIcon fontSize="small" className="nav-icon" />
            Home
          </a>
          <a href="api/users">
            <PeopleAltOutlinedIcon
              sx={{}}
              fontSize="small"
              className="nav-icon"
            />
            Membres
          </a>
          <a href="/profile">
            <AccountCircleOutlinedIcon fontSize="small" className="nav-icon" />
            Profil
          </a>
          <a href="/newpost">
            <DriveFileRenameOutlineOutlinedIcon
              fontSize="small"
              className="nav-icon"
            />
            Poster
          </a>
          <Button
            onClick={clearStorage}
            size="small"
            variant="contained"
            sx={{ backgroundColor: "#4a4aa3" }}
            startIcon={<LogoutOutlinedIcon />}
            aria-label="se déconnecter"
          >
            Déconnexion
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
