import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentsService from "./commentService";

const initialState = {
  comments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createComment = createAsyncThunk(
  "api/newcomment",
  async (commentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentsService.createComment(commentData, token);
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllComments = createAsyncThunk(
  "api/comments",
  async (PostId, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    return await commentsService.getAllComments(PostId, token);
  }
);

// Delete One Comment
export const deleteComment = createAsyncThunk(
  "api/:id",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentsService.deleteComment(id, token);
    } catch (error) {
      console.log(error);
    }
  }
);

export const commentsSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = [...state.comments, action.payload];
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const comments = (state.comments = [
          ...state.comments.filter(
            (comment) => comment.PostId === action.payload.PostId
          ),
        ]);
        if (comments.length === 0) {
          state.comments.push(action.payload);
        }
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = [
          ...state.comments.filter(
            (comment) => comment.id !== action.payload.id
          ),
        ];
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = commentsSlice.actions;
export default commentsSlice.reducer;
