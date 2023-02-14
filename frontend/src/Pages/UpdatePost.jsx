import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatePost } from "../features/posts/postsSlice";

// CSS
import Button from "@mui/material/Button";
import Textarea from "@mui/joy/Textarea";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card } from "@mui/material";
import Input from "@mui/material/Input";

const UpdateCardPost = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const id = useParams().id;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const postData = { id, content, imageUrl };
      dispatch(updatePost(postData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Card sx={{ mt: 2 }}>
        <Box
          sx={{
            mx: "auto",
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4">Modifier le post</Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box
            textAlign="center"
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <div>
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
                label="Votre texte"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="fileUpload">Ajouter une image</label>
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
            >
              Modifier
            </Button>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default UpdateCardPost;
