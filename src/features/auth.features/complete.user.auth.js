import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

import api from "../../config/axios.api";
import { t } from "i18next";
import toast from "react-hot-toast";

export const complete_myprofile=createAsyncThunk(
    'complete_mypofile/complete_user_info',
    async({username,password},{rejectWithValue,getState})=>{
        try {
            const {userType}=getState().auth
            const response=await api.post('/auth/complete_user',{username,role:userType,password})
            toast.success(t('success.signedUp'))
            return response.data


        } catch (error) {
            console.log("Error ocured while completing user _auth ",+error.status,error.message)

            const status=error.status

            if(status==400 || status===500)  return rejectWithValue(t('severError.error'))

            if(status===404)  return rejectWithValue(t('severError.error'))


            if(status===409)  return rejectWithValue(t('serverError.usernameExist'))


              return rejectWithValue(t('severError.error'))

            
        }
    }
)


const initialState={
    success:false,
    loading:false,
    error:false,
    reportError:''
}


const complete_mypofileSlice=createSlice({
    name:'copletemyprofile',
    initialState,
    reducers:{
        removeCompleteMyProfileInitialStates:(state,action)=>{
state.error=false 
  state.loadin=false,
   state.error=false,
    state.reportError=''
}
    },
    extraReducers:(builder)=>{
        builder
        .addCase(complete_myprofile.pending,(state,_)=>{
            state.error=false,
            state.success=false,
            state.loading=true,
            state.reportError=''
        })
           .addCase(complete_myprofile.rejected,(state,action)=>{
            state.error=true,
            state.success=false,
            state.loading=false,
            state.reportError=action.payload
        })   .addCase(complete_myprofile.fulfilled,(state,_)=>{
            state.error=false,
            state.success=true,
            state.loading=false,
            state.reportError=''
        })
    }


})


export const {removeCompleteMyProfileInitialStates}= complete_mypofileSlice.actions

export default complete_mypofileSlice.reducer