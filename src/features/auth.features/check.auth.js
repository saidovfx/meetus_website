import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../config/axios.api";
import toast from "react-hot-toast";

export const checkUserAuth = createAsyncThunk(
  'checkUser/checkUserAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/get-info');

      if (response.data.warning) {
        console.log(response.data)
        return rejectWithValue(response.data.warning);
      }

      return response.data; 
        } catch (error) {
          console.log(error.message);
          
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  user: {},
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
