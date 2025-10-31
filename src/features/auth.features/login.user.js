import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axios.api";
import toast from "react-hot-toast";
import { t } from "i18next";

export  const login_user=createAsyncThunk(
    'login/login_user',
    async({username,password},{rejectWithValue})=>{
        try {
            const response=await api.post('/login',{username,password})
            toast.success(t('login.loggedIn'))
            return response
        } catch (error) {
            console.log("Error ocured while login user "+error.status,error.message);
            const status=error.status
             if(status===401){
                return rejectWithValue(t('login.passwordMatch'))
             }
             if(status===404){
                return rejectWithValue(t('login.userNotFound'))
             }
             if(status===400|| status===500){
                return rejectWithValue(t('serverError.error'))
             }

            return rejectWithValue(t('serverError.error'))
        }

    }
)


export const forgot_password=createAsyncThunk(
    'forgot/forgot_password',
    async({username,email},{rejectWithValue,getState})=>{
        try {
            const response=await api.post('/forgot',{username,email})

            if (response.status===200 || response.status===201) {
                toast.success(t('success.codeSent'))
                return {data:response.data,email,username}
            }


        } catch (error) {
           console.log("Error ocured while sending verify code to forgot_password"+error.status,error?.message);
        const status=error.status
        if(status===400 ||  status===500){
            return rejectWithValue(t('serverError.error'))
        }
        if(status===404){
            return rejectWithValue(t('login.userNotFound'))
        }
        if(status===401){
            return rejectWithValue(t('login.emailNoExists'))
        }

        }

    }
)




const initialState={
    user:{},
    loading:false,
    error:false,
    reportError:'',
    success:false,
    forgot_success:false,
    forgot_loading:false,
    forgot_error:false,
    email:'',
    username:'',
    forgot_reportError:''
}



const loginSlice=createSlice({
    name:'login',
    initialState,
    reducers:{
        removeAllState:(state,_)=>{
            state.reportError='';
            state.success=false;
            state.loading=false;
            state.forgot_reportError='';
            state.forgot_error=false;
            state.forgot_loading=false;
            state.forgot_success=false;
            state.error=false
        }
    },
    extraReducers:(builder)=>{
        builder
         .addCase(login_user.pending,(state,_)=>{
            state.loading=true;
            state.reportError='';
            state.error=false;
            state.success=false;
         })          
           .addCase(login_user.rejected,(state,action)=>{
            state.loading=false;
            state.reportError=action.payload;
            state.error=true;
            state.success=false;

         })  
         .addCase(login_user.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=false;
            state.reportError='';
            state.user=action.payload;
            state.success=true;

         })
         .addCase(forgot_password.pending,(state,_)=>{
            state.forgot_loading=true;
            state.forgot_reportError='';
            state.forgot_error=false;
            state.forgot_success=false
         })
         .addCase(forgot_password.fulfilled,(state,action)=>{
            state.forgot_loading=false;
            state.forgot_reportError='';
            state.forgot_error=false;
            state.forgot_success=true;
            state.email=action.payload.email
            state.username=action.payload.username

         })
          .addCase(forgot_password.rejected,(state,action)=>{
            state.forgot_loading=false;
            state.forgot_reportError=action.payload;
            state.forgot_error=true;
            state.forgot_success=false;
            state.email='';
            state.username='';
         })
         
    }
})
export const {removeAllState}=loginSlice.actions
export default loginSlice.reducer

