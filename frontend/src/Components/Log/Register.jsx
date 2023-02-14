import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../../features/auth/authSlice";

// CSS
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Container,
  Snackbar,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LOGO from "../../Assets/icon-above-font.svg";

const Register = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    imageUrl: "",
    password: "",
    controlPassword: "",
  });

  const { firstName, lastName, email, imageUrl, password, controlPassword } =
    formData;

  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(reset());
  }, [user, isError, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== controlPassword) {
      toast.error("Les mots de passe ne correspondent pas");
    } else {
      const userData = {
        firstName,
        lastName,
        email,
        imageUrl,
        password,
        controlPassword,
      };
      dispatch(register(userData));
    }
  };
  if (isLoading) {
    return "Loading...";
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
      <Box>
        <Typography component="h1" variant="h5" textAlign="center" margin={1}>
          Créer un compte
        </Typography>
        <Box component="form" noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                autoFocus
                autoComplete="given-name"
                name="firstName"
                size="small"
                id="firstName"
                label="Prénom"
                onChange={onChange}
                value={firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                size="small"
                id="lastName"
                label="Nom"
                name="lastName"
                autoComplete="family-name"
                onChange={onChange}
                value={lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                size="small"
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={onChange}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                size="small"
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={onChange}
                value={password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                size="small"
                type={"password"}
                id="controlPassword"
                label="Confirmer le mot de passe"
                name="controlPassword"
                autoComplete="controlPassword"
                onChange={onChange}
                value={controlPassword}
              />
            </Grid>
          </Grid>
          <Snackbar open={error !== ""} message={error} severity="error" />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#435A78",
              color: "#fff",
            }}
          >
            Valider l'inscription
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
