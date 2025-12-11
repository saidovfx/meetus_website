import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../config/axios.api";
import { t } from "i18next";

export const search = createAsyncThunk(
  "search_users/search",
  async ({ text }, { rejectWithValue }) => {
    try {
      let cleanText = text.trim();

      if (!cleanText.startsWith("@")) {
        return rejectWithValue("For searching users you have to start with @");
      }

      cleanText = cleanText.slice(1);

      if (!cleanText) {
        return rejectWithValue("Please type at least one letter after @");
      }

      console.log("Searching:", cleanText);

      const response = await api.get(`/search/users?q=${cleanText}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(t("serverError.error"));
    }
  }
);

const initialState = {
  searchedUser: [],
  selectedUsers: [],

  loading: false,
  reportError: "",
  error: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSelectedUsers: (state, action) => {
      const existUser = state.selectedUsers?.find(
        (user) => user.userId == action.payload.userId
      );
      if (!existUser) {
        state.selectedUsers = [...state.selectedUsers, action.payload];
      }
    },
    removeSelectedUser: (state, action) => {
      state.selectedUsers = state.selectedUsers.filter(
        (user) => user.userId !== action.payload.userId
      );
      undefined;
    },
    removeAll: (state, _) => {
      state.selectedUsers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(search.pending, (state, action) => {
        state.loading = true;
        state.error = false;
        state.searchedUser = [];
        state.reportError = "";
      })
      .addCase(search.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.searchedUser = [];
        state.reportError = action.payload;
      })
      .addCase(search.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.searchedUser = action.payload;
        state.reportError = "";
      });
  },
});
export const { setSelectedUsers, removeSelectedUser, removeAll } =
  searchSlice.actions;
export default searchSlice.reducer;
