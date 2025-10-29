import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axios.api";
import { t } from "i18next";
import toast from "react-hot-toast";
export const signup=createAsyncThunk(
    'signup/signupUser',
    async({email,password,username},{rejectWithValue})=>{
     try {
         const response=await api.post('/verify-request',{email,username})
      if(response.data.status===409){
        return  rejectWithValue(t('serverError.usernameExist'))
      }else if(response.data.status===500){
        console.log("Error ocured while signup "+ error.message);
        return rejectWithValue(t('serverError.error'))
      }
      toast.success(t('success.codeSent'))
        return {email,password,username}
     } catch (error) {
        console.log("Error ocured while signup "+ error.message);
     return rejectWithValue(t('serverError.error'))

    }
    }
)



export const verify_code =createAsyncThunk(
    'verify_code/check_code',
    async({code},{rejectWithValue,getState})=>{
        try {
           const {email,password,userType,username}=getState().auth
           const response=await api.post('/register',{email,password,role:userType,username,code}) 
        if(response.data.status===409){
          return rejectWithValue(t('serverError.usernameExist'))

       }
       if(response.data.status===401){
        return rejectWithValue(t('severError.noCode'))
       }
       if(response.data.status===410){
        return rejectWithValue(t('serverError.codeExpired'))
       }
       if(response.data.status==201 || response.data.ok){
        toast.success(t('success.signedUp'))
        return response.data
       }

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const code_repeat=createAsyncThunk(
    'code_send/code_repeat',
    async(__,{rejectWithValue,getState})=>{
        try {
            const state=getState()
            const {email,username}=state.auth
            const response=await api.post('/verify-request',{email,username})
            if(response.data.status===409){
                console.log("409:",response.data.warning);
                return rejectWithValue(t('serverError.error'))
            }
             if(response.data.status===500){
            console.log(response.data.warning);
          return rejectWithValue(t('serverError.error'))

            
             }
             if(response.data.status===400){
            console.log(response.data.warning);
            return rejectWithValue(t('serverError.error'))
             }
             toast.success(t('success.codeSent'))
             return response.data
        } catch (error) {
            return rejectWithValue(t('serverError.error'))

        }

    }
)





const initialState={
    userType:'',
    email:'',
    username:'',
    password:'',
    reportError:'',
    pending:false,
    success:false,
    success_verify:false,
    pending_verify:false,
    reportError_verify:'',
    repeat_pending:false,
    repeat_success:false,
    repeat_reportError:'',
    repeatedOnce:false
}


const userSignupSlice=createSlice({
    name:'signupUser',
    initialState,
    reducers:{
        selectType:(state,action)=>{
            state.userType=action.payload.type

        },
        removeAllSignUpExtraData:(state)=>{
            state.userType='';
            state.email='';
            state.username='';
            state.password='';
            state.pending=false;
            state.reportError=''
        }
    },
    extraReducers:(builder)=>{
        builder
       .addCase(signup.fulfilled,(state,action)=>{
          state.email = action.payload.email;
          state.username = action.payload.username;
          state.password = action.payload.password;
          state.pending = false;
          state.reportError = '';
         state.success=true
         })
        .addCase(signup.pending,(state,action)=>{
            state.pending=true
            state.reportError=''
            state.success=false
        })
        .addCase(signup.rejected,(state,action)=>{
         state.pending=false,
          state.reportError=action.payload
          state.success=false
        })
        .addCase(verify_code.pending,(state,action)=>{
            state.reportError_verify='';
            state.pending_verify=true
        })
        .addCase(verify_code.fulfilled,(state,action)=>{
            state.pending_verify=false
            state.success_verify=true
            state.reportError_verify=''

        })
        .addCase(verify_code.rejected,(state,action)=>{
            state.reportError_verify=action.payload
            state.pending_verify=false,
            state.success_verify=false
        })
        .addCase(code_repeat.pending,(state,action)=>{
            state.repeat_pending=true;
            state.repeat_reportError='';
            
        })
        .addCase(code_repeat.fulfilled,(state,action)=>{
            state.repeat_pending=false,
            state.repeat_reportError='',
            state.repeat_success=true
            state.repeatedOnce=true

        })
        .addCase(code_repeat.rejected,(state,action)=>{
            state.repeat_pending=false,
            state.repeat_success=false,
            state.repeat_reportError=action.payload
            state.repeatedOnce=true
        })
    }

})

export const {selectType,removeAllSignUpExtraData}=userSignupSlice.actions
export default userSignupSlice.reducer