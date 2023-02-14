import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Register from "./Register";
import Login from "./Login";

const theme = createTheme();

const LogModal = () => {
  // Hooks
  const [registerModal, setRegisterModal] = useState(true); // lui passer en prop une info
  const [loginModal, setLoginModal] = useState(false); // lui passer en prop une info

  const handleModal = (e) => {
    if (e.target.id === "register") {
      setRegisterModal(true);
      setLoginModal(false);
    } else if (e.target.id === "login") {
      setLoginModal(true);
      setRegisterModal(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{ height: "100vh", textDecoration: "none", listStyle: "none" }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://img.freepik.com/vecteurs-libre/illustration-du-concept-authentification_114360-1640.jpg?w=1480&t=st=1672177282~exp=1672177882~hmac=b8113581012d3c12d8073bb0006923b6dd8764d57b574d318fb7320b2d1537af)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            [theme.breakpoints.down("sm")]: {
              display: "none",
            },
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <ul>
            <Button
              sx={{
                width: "50%",
                backgroundColor: "#435A78",
                color: "#fff",
                borderRadius: "0",
                listStyle: "none",
              }}
              variant="contained"
            >
              <li
                id="register"
                onClick={handleModal}
                className={registerModal ? "active-btn" : null}
              >
                S'inscrire
              </li>
            </Button>
            <Button
              sx={{
                width: "50%",
                backgroundColor: "#435A78",
                color: "#fff",
                borderRadius: "0",
                listStyle: "none",
              }}
              variant="contained"
            >
              <li
                id="login"
                onClick={handleModal}
                className={loginModal ? "active-btn" : null}
              >
                Se connecter
              </li>
            </Button>
          </ul>
          {registerModal && <Register />}
          {loginModal && <Login />}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LogModal;
