import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../config/axios.api";
import toast from "react-hot-toast";

export const checkUserAuth = createAsyncThunk(
  'checkUser/checkUserAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/get-info');

      if (response.data.warning) {
        toast.error("You are not signed in or cookie is deleted");
        console.log(response.data)
        return rejectWithValue(response.data.warning);
      }

      return response.data; // response.data ni qaytarish kerak
    } catch (error) {
      toast.error("Server error");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(checkUserAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
