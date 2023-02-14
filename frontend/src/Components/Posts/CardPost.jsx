import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { deleteOnePost } from "../../features/posts/postsSlice"; // Posts Store
import { getAllComments } from "../../features/comments/commentSlice"; // Comments Store

// Components
import CardComment from "../Comments/CardComment";
import FormComment from "../Comments/FormComment";
import Likes from "../Likes/Likes";

// CSS
import Moment from "react-moment"; // Date format
import "moment-timezone";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { pink } from "@mui/material/colors";
import {
  Container,
  Button,
  Card,
  Typography,
  Box,
  Stack,
  CardMedia,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

const CardPost = ({ post }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const PostId = post.id;
  const { comments, isError, message } = useSelector((state) => state.comments);

  function handleEdit(e) {
    e.preventDefault();
    navigate(`/updatepost/${post.id}`);
  }

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getAllComments(PostId));
  }, [dispatch, PostId, isError, message]);

  return (
    <Container>
      <Box
        m={2}
        p={2}
        display="flex"
        direction="column"
        justifyContent="center"
      >
        <Card
          sx={{
            maxWidth: "90%",
            minWidth: "90vw",
            margin: "0",
            padding: "0",
          }}
        >
          <div>
            <header className="cardheader">
              <Stack
                sx={{ alignItems: "center" }}
                direction="row"
                className="userInfo"
              >
                {post.UserId === user.userId || user.isAdmin === true ? (
                  <>
                    <Button
                      size="small"
                      type="button"
                      m={0}
                      onClick={() => dispatch(deleteOnePost(post.id))}
                      title="supprimer le post"
                      aria-label="Supprimer le post"
                    >
                      <DeleteForeverRoundedIcon
                        sx={{
                          color: pink[500],
                          "&:hover": { color: pink[800] },
                          m: 0,
                          p: 0,
                        }}
                        fontSize="small"
                      />
                    </Button>
                    <Button
                      size="small"
                      onClick={handleEdit}
                      type="button"
                      title="Edit le post"
                      m={0}
                      p={0}
                    >
                      <BorderColorOutlinedIcon fontSize="small" />
                    </Button>
                  </>
                ) : null}
                <CardMedia
                  sx={{
                    objectFit: "cover",
                    width: "5vh",
                    height: "5vh",
                    marginRight: 1,
                    padding: 1,
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                  component="img"
                  loading="lazy"
                  image={post.avatar}
                  crossOrigin="anonymous"
                  alt="card-pic"
                  className="user_picture"
                />
                <Typography
                  label={'margin="normal"'}
                  sx={{ fontSize: 16 }}
                  fontWeight="bold"
                  color="text.secondary"
                >
                  {post.firstName} {post.lastName}
                </Typography>
                <Box justifyContent="flex-end">
                  <Typography
                    label={'margin="normal"'}
                    sx={{ fontSize: 14, ml: 1 }}
                    color="text.secondary"
                    align="right"
                  >
                    Posté le:
                    <Moment format="DD/MM/YYYY">{post.createdAt}</Moment>
                  </Typography>
                </Box>
              </Stack>
            </header>
            <Box
              sx={{
                textAlign: "center",
                m: 1,
                fontWeight: "medium",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {post.imageUrl ? (
                <>
                  <CardMedia
                    sx={{
                      padding: 0,
                      margin: 0,
                      objectFit: "contain",
                    }}
                    component="img"
                    loading="lazy"
                    image={post.imageUrl}
                    crossOrigin="anonymous"
                    alt="shared picture"
                    className="post_picture"
                  />
                </>
              ) : null}
              <Box
                sx={{
                  m: 1,
                  fontWeight: "medium",
                  fontSize: 18,
                  flexDirection: "row",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box sx={{ maxWidth: "10%", margin: 0 }}>
                  <Likes post={post} />
                </Box>
                <Box sx={{ justifyContent: "center", width: "80%" }}>
                  <Typography fontSize={18} label={'margin="normal"'}>
                    {post.content}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </div>
          <Typography textAlign="center" variant="h7" component="div">
            <Button
              aria-label="show comment section"
              onClick={() => setShow((prev) => !prev)}
            >
              <MarkChatUnreadIcon fontSize="small" />
            </Button>
            Afficher commentaires
          </Typography>

          {show && (
            <div>
              <div>
                <FormComment PostId={PostId} />
              </div>
              <div>
                {comments.length > 0 ? (
                  <div className="comments">
                    {comments.map((id) => (
                      <div key={id}>
                        <CardComment post={post} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <Typography>Aucun commentaire pour le moment..</Typography>
                )}
              </div>
            </div>
          )}
        </Card>
      </Box>
    </Container>
  );
};

export default CardPost;
