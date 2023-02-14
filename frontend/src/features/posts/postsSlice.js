import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Nouveau Post
export const createPost = createAsyncThunk(
  "api/newpost",
  async (postData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    return await postsService.createPost(postData, token);
  }
);

// Get All Posts
export const getAllPosts = createAsyncThunk(
  "api/posts",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    return await postsService.getAllPosts(token);
  }
);

// Delete One Post
export const deleteOnePost = createAsyncThunk(
  "api/:id",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    return await postsService.deleteOnePost(id, token);
  }
);

// Update Post
export const updatePost = createAsyncThunk(
  "posts/update/:id",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postsService.updatePost(postData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteOnePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOnePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.filter(
          (post) => post.id !== action.payload.id
        );
      })
      .addCase(deleteOnePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.posts = action.payload;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = [...state.posts, action.payload];
      });
  },
});

export const { reset } = postsSlice.actions;
export default postsSlice.reducer;
