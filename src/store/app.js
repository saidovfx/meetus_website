import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/auth.features/check.auth.js"
const store=configureStore({
    reducer:{
user:userSlice
    }
})

export default store