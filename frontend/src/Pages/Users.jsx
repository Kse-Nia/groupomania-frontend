import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getAllUsers, reset } from "../features/users/usersSlice";
import CardUser from "../Components/Users/CardUser";

// CSS
import { Container, Typography } from "@mui/material";

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { users, message, isError } = useSelector((state) => state.users);

  const numberOfUsers = users.length; // Nombre d'inscrits

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getAllUsers());
  }, [user, navigate, dispatch, isError, message]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 2,
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "h3.fontSize" }}>
        Membres
      </Typography>
      <Typography variant="h2" sx={{ fontSize: "h5.fontSize" }}>
        Nombre d'utilisateurs inscrits: {numberOfUsers}
      </Typography>
      <div>
        {users.length > 0 ? (
          <div className="posts">
            {users.map((user) => (
              <div key={user.id}>
                <CardUser users={user} />
              </div>
            ))}
          </div>
        ) : (
          <Typography>Rien à afficher pour le moment..</Typography>
        )}
      </div>
    </Container>
  );
};

export default Users;
