import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios.api";

export const checkAuthDevice=createAsyncThunk(
    'auth/fetchDevice',
    async(_,{rejectWithValue})=>{


    }
)