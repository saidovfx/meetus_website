import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../config/axios.api";
import { t } from "i18next";

export const get_post = createAsyncThunk(
  "get_post/get",
  async ({ postId }, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await api.get(`get_post/:${postId}`);
      return response.data;
    } catch (error) {
      const status = error?.status;

      if ((status = 404)) {
        return rejectWithValue("Post not found please try again later");
      }
      return rejectWithValue(t("serverError.error"));
    }
  }
);

const initialState = {
  post: [],
  error: false,
  success: false,
  loading: false,
  reportError: "",
};

const getPostSlice = createSlice({
  name: "getPost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_post.pending, (state, action) => {
        state.loading = true;
        state.reportError = "";
        (state.success = false), (state.post = []);
      })
      .addCase(get_post.fulfilled, (state, action) => {
        state.loading = false;
        state.reportError = "";
        (state.success = true), (state.post = action.payload.post);
      })
      .addCase(get_post.rejected, (state, action) => {
        state.loading = false;
        state.reportError = action.payload;
        (state.success = false), (state.post = []);
      });
  },
});

export default getPostSlice.reducer;
