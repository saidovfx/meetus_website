import api from "../../config/axios.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { t } from "i18next";
import toast from "react-hot-toast";

export const add_contact = createAsyncThunk(
  "add_contact/add_user_contact",
  async (
    { telegram, whatsApp, instagram, phone, email },
    { rejectWithValue, getState }
  ) => {
    try {
      console.log("ishladi");
      const response = await api.post("/user/contact", {
        telegram,
        whatsApp,
        instagram,
        phone,
        email,
      });
      toast.success("Contact added succesfully");
      return response.data;
    } catch (error) {
      console.log(
        "Error ocured while posting contact",
        error.status,
        error.message
      );
      const status = error.status;
      if (status === 400 || status === 404 || status === 500)
        return rejectWithValue(t("serverError.error"));

      if (status === 304) return rejectWithValue("Nothing to update");
    }
  }
);

const initialState = {
  loading: false,
  success: false,
  error: false,
  reportError: "",
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(add_contact.pending, (state, action) => {
        (state.loading = true),
          (state.error = false),
          (state.success = false),
          (state.reportError = "");
      })
      .addCase(add_contact.rejected, (state, action) => {
        (state.loading = false),
          (state.error = true),
          (state.success = false),
          (state.reportError = action.payload);
      })
      .addCase(add_contact.fulfilled, (state, action) => {
        (state.loading = false),
          (state.error = false),
          (state.success = true),
          (state.reportError = "");
      });
  },
});

export default contactSlice.reducer;
