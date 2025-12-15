import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { t } from "i18next";
import api from "../../../config/axios.api";

export const getCollaborator = createAsyncThunk(
  "get_collaborator/notification",
  async (_, { rejectWithValue, getState }) => {
    try {
      console.log("s");

      const reponse = await api.get("/collaborators/get");
      return reponse.data;
    } catch (error) {
      rejectWithValue(t("serverError.error"));
    }
  }
);

const initialState = {
  loading: false,
  success: false,
  collaborators: [],
  reportError: "",
};

const collaboratorNotificationSlice = createSlice({
  name: "collaborator",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCollaborator.pending, (state, action) => {
        state.loading = true;
        state.success = false;
        state.reportError = "";
        state.collaborators = [];
      })
      .addCase(getCollaborator.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.reportError = "";
        state.collaborators = action.payload.collaborator;
      })
      .addCase(getCollaborator.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.reportError = action.payload;
        state.collaborators = [];
      });
  },
});

export default collaboratorNotificationSlice.reducer;
