import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../features/comments/commentSlice";

// CSS
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Textarea from "@mui/joy/Textarea";
import { Box, Button, Container, FormLabel } from "@mui/material";

const FormComment = ({ PostId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); //User data from Store

  const UserId = user.userId;
  const firstName = user.firstName;
  const lastName = user.lastName;
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const commentData = {
      PostId,
      UserId,
      firstName,
      lastName,
      text,
    };
    dispatch(createComment(commentData));
    window.location.reload();
  }

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Container sx={{ m: 1, p: 1 }}>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <FormLabel>Commentaire</FormLabel>
          <Textarea
            sx={{ background: "#F3F3F3" }}
            variant="soft"
            placeholder="Ecrivez votre texte ici..."
            minRows={2}
            autoComplete="given-name"
            name="text"
            id="text"
            label="text du commentaire"
            onChange={(event) => setText(event.target.value)}
            value={text}
          />

          <Button
            type="submit"
            variant="contained"
            title="Commenter"
            size="md"
            htmlFor="validate post form"
            sx={{ mt: 2, backgroundColor: "#4a4aa3" }}
            endIcon={<SendRoundedIcon />}
          >
            Poster
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FormComment;
