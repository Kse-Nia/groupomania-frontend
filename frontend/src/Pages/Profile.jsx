import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteAccount } from "../features/auth/authSlice";

// CSS
import Swal from "sweetalert2";
import {
  Container,
  Button,
  Card,
  Box,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const id = user.userId;

  const updatePage = () => {
    navigate("/updateprofile");
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Valider la suppression du compte ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Valider",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteAccount(id));
        navigate("/");
      }
    });
  };

  return (
    <Container>
      <Grid
        container
        spacing={0}
        display="flex"
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "1em",
            minWidth: "90%",
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            {user.isAdmin ? (
              <Typography
                textAlign="center"
                variant="h1"
                fontSize={{
                  xs: "h5.fontSize",
                  sm: "h4.fontSize",
                  md: "h3.fontSize",
                }}
                width="80%"
              >
                Page Administrateur
              </Typography>
            ) : (
              <Typography variant="h1" sx={{ fontSize: "h3.fontSize" }}>
                Mon Profil
              </Typography>
            )}
            <Box textAlign="center">
              <CardMedia
                sx={{
                  objectFit: "cover",
                  width: "25vh",
                  height: "25vh",
                  //marginRight: 1,
                  margin: "auto",
                  padding: 1,
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
                component="img"
                loading="lazy"
                image={user.avatar}
                crossOrigin="anonymous"
                alt="card-pic"
                className="user_picture"
              />
              <Typography>Prénom: {user.firstName}</Typography>
              <Typography>Nom: {user.lastName}</Typography>
              <Typography>Email: {user.email}</Typography>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                sx={{ m: 2 }}
                onClick={updatePage}
              >
                Modifier le compte
              </Button>
              <Button
                variant="contained"
                color="error"
                size="medium"
                sx={{ m: 2 }}
                onClick={handleDelete}
              >
                Supprimer le compte
              </Button>
            </Box>
          </Grid>
        </Card>
      </Grid>
    </Container>
  );
};

export default Profile;
