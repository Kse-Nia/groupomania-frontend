import { configureStore } from "@reduxjs/toolkit";

// Reducers
import authReducer from "../features/auth/authSlice";
import usersReducer from "../features/users/usersSlice";
import postsReducer from "../features/posts/postsSlice";
import commentsReducer from "../features/comments/commentSlice";
import likeReducer from "../features/Likes/likeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
    likes: likeReducer,
  },
});
