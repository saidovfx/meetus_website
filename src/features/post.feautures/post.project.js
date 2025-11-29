import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../config/axios.api.js";
import { t } from "i18next";
import toast from "react-hot-toast";
import { s } from "framer-motion/client";

export const get_myproject = createAsyncThunk(
  "get_my_project/project",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await api.get("posts/get_myprojects");
      return { data: response.data };
    } catch (error) {
      const status = error.response?.status;
      const message = error.message;
      if (status == 400 || status == 500) {
        return rejectWithValue(t("serverError.error"));
      }
      if (status === 401) {
        return rejectWithValue(t("serverError.notAuthorized"));
      }
      return rejectWithValue(t("serverError.error"));
    }
  }
);

export const createProject_images = createAsyncThunk(
  "create_project_images/project",
  async (
    { file, title, desc, link, githubLink, location, tags },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const formData = new FormData();
      file.forEach((image) => {
        formData.append("images", image);
      });
      console.log("file", file);
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("location", location);
      formData.append("githubLink", githubLink);
      formData.append("link", link);
      formData.append("tags", tags);

      const response = await api.post("/posts/post_project_image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          const progress = Math.round((event.loaded * 100) / event.total);
          dispatch(setprogress({ progress }));
        },
      });

      toast.success("Post created succesfully");
      return response.data;
    } catch (error) {
      const status = error.response?.status;

      const messsage = error.messsage;

      if (status === 400 || status === 500) {
        return rejectWithValue(t("serverError.error"));
      }
      return rejectWithValue(t("serverError.error"));
    }
  }
);
export const createProject_video = createAsyncThunk(
  "create_project_video/project",
  async (
    { file, title, desc, link, githubLink, location, tags },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const formData = new FormData();
      formData.append("video", file);
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("location", location);
      formData.append("githubLink", githubLink);
      formData.append("link", link);
      formData.append("tags", tags);

      const response = await api.post("/posts/post_project_video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          const progress = Math.round((event.loaded * 100) / event.total);
          dispatch(setprogress({ progress }));
        },
      });

      toast.success("Project /post uploaded successfully");
      return response.data;
    } catch (error) {
      const status = error.response?.status;
      const message = error.message;
      if (status === 400 || status === 500) {
        return rejectWithValue(t("serverError.error"));
      }
      return rejectWithValue(t("serverError.error"));
    }
  }
);

const initialState = {
  progress: 0,

  project_loading: false,
  project_error: false,
  project_reportError: "",
  project_success: false,

  getproject_loading: false,
  getproject_error: false,
  getproject_success: false,
  getproject_reportError: "",
  myprojects: [],
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setprogress: (state, action) => {
      state.progress = action.payload.progress;
    },
    setController: (state, action) => {
      state.abortController = action.payload.controller;
    },
    cancelUpload: (state, action) => {
      if (state.abortController) {
        state.abortController;
      }
      state.progress = 0;
      state.project_loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_myproject.pending, (state, action) => {
        (state.getproject_loading = true),
          (state.getproject_error = false),
          (state.getproject_reportError = ""),
          (state.getproject_success = false);
      })

      .addCase(get_myproject.fulfilled, (state, action) => {
        state.getproject_loading = false;
        state.myprojects = action.payload.data;
      })
      .addCase(get_myproject.rejected, (state, action) => {
        (state.getproject_error = true),
          (state.getproject_reportError = action.payload);
        state.getproject_success = false;
        state.getproject_loading = false;
      })

      .addCase(createProject_images.pending, (state, action) => {
        state.project_loading = true;
        state.project_error = false;
        state.project_reportError = "";
        state.project_success = false;
      })

      .addCase(createProject_images.fulfilled, (state, action) => {
        state.project_loading = false;
        state.project_error = false;
        state.project_reportError = "";
        state.project_success = true;
        state.progress = 0;
      })
      .addCase(createProject_images.rejected, (state, action) => {
        state.project_loading = false;
        state.project_error = true;
        state.project_reportError = action.payload;
        state.project_success = false;
      })
      .addCase(createProject_video.pending, (state, action) => {
        state.project_loading = true;
        state.project_error = false;
        state.project_reportError = "";
        state.project_success = false;
      })

      .addCase(createProject_video.fulfilled, (state, action) => {
        state.project_loading = false;
        state.project_error = false;
        state.project_reportError = "";
        state.project_success = true;
        state.progress = 0;
      })
      .addCase(createProject_video.rejected, (state, action) => {
        state.project_loading = false;
        state.project_error = true;
        state.project_reportError = action.payload;
        state.project_success = false;
      });
  },
});
export const { setprogress, setController, cancelUpload } =
  projectSlice.actions;
export default projectSlice.reducer;
