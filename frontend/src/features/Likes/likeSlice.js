import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import likeService from "./likesService";

const initialState = {
  likes: [],
  isError: false,
  isSuccess: false,
  message: "",
};

export const likePost = createAsyncThunk(
  "api/like",
  async (likeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await likeService.likePost(likeData, token);
    } catch (error) {
      console.log(error);
    }
  }
);

export const unlikePost = createAsyncThunk(
  "api/unlike",
  async (likeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await likeService.unlikePost(likeData, token);
    } catch (error) {
      console.log(error);
    }
  }
);

export const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    likePost: (state, action) => {
      const { PostId, likeData } = action.payload;
      state.likes[PostId] = likeData;
      state.loading = false;
    },
    unlikePost: (state, action) => {
      const { UserId, PostId } = action.payload;
      state.likes = state.likes.filter(
        (like) => like.UserId !== UserId || like.PostId !== PostId
      );
    },
  },
  extraReducers: (builder) => {},
});

export const { reset } = likeSlice.actions;
export default likeSlice.reducer;
