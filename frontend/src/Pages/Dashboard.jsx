import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";

import CardPost from "../Components/Posts/CardPost"; // Compo. display one post

import { user, reset } from "../features/auth/authSlice";
import { getAllPosts } from "../features/posts/postsSlice";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";

const Dashboard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { posts, isError, message } = useSelector((state) => state.posts);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/");
    }
    dispatch(getAllPosts());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, isError, message]);

  // Reload Page, garder position
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      const savedPosition = localStorage.getItem("scrollPosition");
      if (savedPosition !== null) {
        ref.current.scrollTop = savedPosition;
      }
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      localStorage.setItem("scrollPosition", ref.current.scrollTop);
    }
  }, [ref.current]);

  return (
    <Container sx={{ width: "100%" }}>
      <Typography
        variant="h1"
        sx={{ fontSize: "h4.fontSize" }}
        textAlign="center"
        margin={2}
      >
        Bonjour {user.firstName}
      </Typography>
      <Grid
        container
        spacing={5}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        {posts.length > 0 ? (
          <>
            <div className="posts">
              {posts.map((post) => (
                <div key={post.id} ref={ref}>
                  <CardPost post={post} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <Typography marginTop={5} variant="h6">
            Rien à afficher pour le moment..
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard;
