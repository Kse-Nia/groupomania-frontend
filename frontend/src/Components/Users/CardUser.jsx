import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteOneUser } from "../../features/users/usersSlice";
import {
  Box,
  Card,
  CardMedia,
  Container,
  Typography,
  Button,
} from "@mui/material";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { pink } from "@mui/material/colors";
import Moment from "react-moment"; // Date format
import "moment-timezone";

const CardUser = ({ users }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <Container sx={{ width: "100vw", margin: 2, padding: "0" }}>
      <Card
        sx={{
          minWidth: "100%",
          minHeight: "80px",
          margin: "0",
          padding: "0",
        }}
      >
        <Box
          aria-label="carte avec les informations de chaque utilisateur"
          sx={{
            margin: 3,
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
          }}
        >
          {user.isAdmin === true ? (
            <Button
              size="small"
              type="button"
              onClick={() => dispatch(deleteOneUser(users.id))}
              title="supprimer l'utilisateur"
              aria-label="Supprimer l'utilisateur"
            >
              <DeleteForeverRoundedIcon
                sx={{ color: pink[500] }}
                fontSize="small"
              />
            </Button>
          ) : null}
          <CardMedia
            sx={{
              objectFit: "contain",
              maxHeight: "10vh",
              width: "auto",
              marginRight: 4,
            }}
            component="img"
            loading="lazy"
            image={users.avatar}
            crossOrigin="anonymous"
            alt="card-pic"
            className="user_picture"
          />
          <Box sx={{ flexDirection: "column" }}>
            <Typography
              label={'margin="normal"'}
              sx={{ fontSize: 16 }}
              color="text.secondary"
              fontWeight="bold"
            >
              Prénom: {users.firstName}
            </Typography>
            <Typography
              label={'margin="normal"'}
              sx={{ fontSize: 16 }}
              color="text.secondary"
              fontWeight="bold"
            >
              Nom: {users.lastName}
            </Typography>
            {user.isAdmin === true ? (
              <>
                <Typography
                  label={'margin="normal"'}
                  sx={{ fontSize: 16 }}
                  color="text.secondary"
                  fontWeight="bold"
                >
                  Email: {users.email}
                </Typography>
                <Typography
                  label={'margin="normal"'}
                  sx={{ fontSize: 16 }}
                  color="text.secondary"
                  fontWeight="bold"
                >
                  Inscrit le :
                  <Moment format="DD/MM/YYYY">{users.createdAt}</Moment>
                </Typography>
              </>
            ) : null}
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default CardUser;
