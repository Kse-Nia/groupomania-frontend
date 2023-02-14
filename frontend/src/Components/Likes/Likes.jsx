import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../features/Likes/likeSlice";

//CSS
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import { Container, Typography, Button } from "@mui/material";

const Likes = ({ post }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  let likeNumber = post.Likes.length;
  const UserId = user.userId;
  const PostId = post.id;

  function handleLike(e) {
    const likeData = {
      PostId,
      UserId,
    };
    dispatch(likePost(likeData));
  }

  function handleDislike(e) {
    const dislikeData = {
      PostId,
      UserId,
    };
    dispatch(unlikePost(dislikeData));
  }

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Button aria-label="like" onClick={handleLike}>
        <ThumbUpAltRoundedIcon />
      </Button>
      <Typography>{likeNumber}</Typography>
      <Button aria-label="dislike" onClick={handleDislike}>
        <ThumbDownAltRoundedIcon />
      </Button>
    </Container>
  );
};

export default Likes;
