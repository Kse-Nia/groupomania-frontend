import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../features/posts/postsSlice";

// CSS
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Textarea from "@mui/joy/Textarea";
import {
  Box,
  Button,
  Typography,
  FormLabel,
  Container,
  Card,
  Input,
} from "@mui/material";

const CreatePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); //User data from Store

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const UserId = user.userId;
  const firstName = user.firstName;
  const lastName = user.lastName;
  const avatar = user.avatar;
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const postData = {
      UserId,
      firstName,
      lastName,
      content,
      avatar,
      imageUrl,
    };
    dispatch(createPost(postData));
  }

  const { post, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || post) {
      toast.success("Posté");
    }
  }, [post, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return "Chargement...";
  }

  return (
    <Container>
      <Card
        sx={{
          mt: 2,
        }}
      >
        <Box
          sx={{
            mx: "auto",
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Créer un nouveau post</Typography>
          <Box
            textAlign="center"
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
            label="formulaire de création de post"
          >
            <div>
              <FormLabel>Votre texte</FormLabel>
              <Textarea
                sx={{ background: "#F3F3F3", minWidth: "60vw" }}
                variant="soft"
                placeholder="Ecrire quelques mots..."
                minRows={5}
                autoComplete="given-name"
                name="content"
                required
                autoFocus
                id="content"
                aria-label="Votre texte ici"
                label="Votre texte"
                onChange={(event) => setContent(event.target.value)}
                value={content}
              />
            </div>
            <div>
              <label
                aria-label="ajout image"
                label="ajour fichier image"
                htmlFor="fileUpload"
              >
                Ajouter une image
              </label>
              <Input
                id="fileUpload"
                name="imageUrl"
                type="file"
                label="Charger une image"
                accept=".jpg, .jpeg, .png, .gif"
                onChange={(e) => setImageUrl(e.target.files[0])}
              />
            </div>
            <Button
              sx={{ m: 1, backgroundColor: "#4a4aa3" }}
              variant="contained"
              type="submit"
              title="Poster"
              aria-label="Poster"
            >
              Poster
            </Button>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default CreatePost;
