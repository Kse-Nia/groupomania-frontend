import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../../features/auth/authSlice";

// CSS
import {
  Button,
  Typography,
  TextField,
  Grid,
  Box,
  Container,
} from "@mui/material/";
import { toast } from "react-toastify";
import LOGO from "../../Assets/icon-above-font.svg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <Container component="main">
      <Container
        sx={{
          maxWidth: "10%",
          height: "auto",
          objectFit: "contain",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img src={LOGO} width="30%" alt="LogPicture" className="logPicture" />
      </Container>
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <img src={LOGO} alt="logo" />
          </div>
          <Typography component="h1" variant="h5">
            Se Connecter
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              autoFocus
              size="small"
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              onChange={onChange}
              value={email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              size="small"
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChange}
              value={password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#435A78", color: "#fff" }}
            >
              Se connecter
            </Button>
            <Grid container></Grid>
          </Box>
        </Box>
      </div>
    </Container>
  );
};

export default Login;
