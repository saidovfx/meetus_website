import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../config/axios.api";
import toast from "react-hot-toast";
import { t } from "i18next";

export const upload_images = createAsyncThunk(
  "rename_user_info/rename_user.profile",
  async ({ file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await api.post("/profile/add_profile_img", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(t("profile.profileImgUpload"));
      return response.data.user;
    } catch (error) {
      toast.error(t("serverError.error"));
      return rejectWithValue(t("serverError.error"));
    }
  }
);

export const delete_profile_image = createAsyncThunk(
  "delete_profile_image/delete",
  async (__, { rejectWithValue, getState }) => {
    try {
      const { user } = getState().user;

      const response = await api.post("/profile/delete/img", {
        profileImgPublicId: user.profileImgPublicId,
      });

      toast.success(t("profile.deletedProfileImg"));

      return response.data;
    } catch (error) {
      console.log(
        "Error ocured while deleting profile iimage",
        error.status,
        error.message
      );

      toast.error(t("serverError.error"));
      return rejectWithValue(t("serverError.error"));
    }
  }
);

export const upload_profile_cover_img = createAsyncThunk(
  "upload_cover_img/profile_cover_img",
  async ({ file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      console.log(file);

      const response = await api.post("/profile/cover_img", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(t("profile.profileImgUpload"));
      return response.data.user;
    } catch (error) {
      toast.error(t("serverError.error"));
      return rejectWithValue(t("serverError.error"));
    }
  }
);

export const delete_cover_image = createAsyncThunk(
  "delete_cover_image/delete",
  async (__, { rejectWithValue, getState }) => {
    try {
      const { user } = getState().user;

      const response = await api.post("/profile/delete/coverImg", {
        coverImgPublicId: user.coverImgPublicId,
      });
      toast.success(t("profile.deletedProfileImg"));

      return response.data;
    } catch (error) {
      console.log(
        "Error ocured while deleting profile iimage",
        error.status,
        error.message
      );

      toast.error(t("serverError.error"));
      return rejectWithValue(t("serverError.error"));
    }
  }
);

export const edit_info = createAsyncThunk(
  "rename/rename_user_info",
  async ({ key, value }, { rejectWithValue, getState }) => {
    try {
      const response = await api.put("/profile/edit", { [key]: value });
      toast.success(t("profile.profileUpdated"));
      return response.data;
    } catch (error) {
      console.log(
        "Error ocured while editing information",
        error.status,
        error.message
      );

      const status = error.status;

      if (status === 404 || status === 400 || status === 500) {
        return rejectWithValue(t("serverError.error"));
      }

      if (status === 409) {
        return rejectWithValue(t("serverError.usernameExist"));
      }
      return rejectWithValue(t("serverError.error"));
    }
  }
);

const initialState = {
  reportError: "",
  success: false,
  error: false,
  loading: false,
};

const profileRenameSlice = createSlice({
  name: "renameProfile",
  initialState,
  reducers: {
    removeEditStates: (state, action) => {
      state.reportError = "";
      state.loading = false;
      state.success = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(edit_info.pending, (state, _) => {
        state.reportError = "";
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(edit_info.rejected, (state, action) => {
        state.reportError = action.payload;
        state.loading = false;
        state.success = false;
        state.error = true;
      })
      .addCase(edit_info.fulfilled, (state, _) => {
        state.reportError = "";
        state.loading = false;
        state.success = true;
        state.error = false;
      });
  },
});

export const { removeEditStates } = profileRenameSlice.actions;
export default profileRenameSlice.reducer;
