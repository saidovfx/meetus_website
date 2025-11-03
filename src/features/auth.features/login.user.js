import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axios.api";
import toast from "react-hot-toast";
import { t } from "i18next";
import router from "../../config/router.app";
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
    async({username,email,navigate},{rejectWithValue,getState})=>{
        try {
            const response=await api.post('/forgot',{username,email})

            if (response.status===200 || response.status===201) {
                toast.success(t('success.codeSent'))
                navigate(router.verify_forgot)
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

export const verify_forgot=createAsyncThunk(
    'verify_code/verify_forgot_password',
    async({code,navigate},{rejectWithValue,getState})=>{
        try {
            const {email,username}=getState().login
            const response=await api.post('/forgot_password',{email,username,code})
            toast.success(t('login.successfullyVerified'))
            navigate(router.change_password)
            return response.data
        } catch (error) {
            console.log("Error ocured while sending verify code to sever"+error.status,error.message);
            const status=error.status
            if(status===400 || status===500){
                return rejectWithValue(t('noCode.error'))

            }
            if(status===401){
                return rejectWithValue(t('serverError.noCode'))
            }
            if(status===410) {
                return rejectWithValue(t('serverError.codeExpired'))
            }   
            if(status===404){
                return rejectWithValue(t('login.userNotFound'))
            }
            
        }
    }
)

export  const change_password=createAsyncThunk(
    'change_forgot/change_forgot_password',
    async({newPassword},{rejectWithValue,getState})=>{
    try {
    const {username}=getState().login
    const response=await api.post('/reset_password',{username,newPassword})

   toast.success('Password Changed successfully')
   return response.data
      } catch (error) {
    console.log("Error ocureed while changing password",+error.status,error.message);
    const status=error.status
             if(status===400 || status===500){
                return rejectWithValue(t('serverError.error'))

            }
            if(status===401){
                return rejectWithValue(t('serverError.noCode'))
            }
            if(status===410) {
                return rejectWithValue(t('serverError.codeExpired'))
            }   
            if(status===404){
                return rejectWithValue(t('login.userNotFound'))
            }
    
    }
    }
)

export const login_without=createAsyncThunk(
    'login_without/login_without_passwowrd',
    async(_,{rejectWithValue,getState})=>{
        try {
            const {username,verify_id}=getState().login            
            const response=await api.post(`/no_password/${verify_id}`,{username})
            toast.success(t('login.loggedIn'))
            return response.data
        } catch (error) {
              console.log("Error ocureed while login without password",+error.status,error.message);
              console.log(error);
              
          const status=error.status
             if(status===400 || status===500){
                return rejectWithValue(t('serverError.error'))

            }
            if(status===401){
                return rejectWithValue(t('serverError.noCode'))
            }
            if(status===410) {
                return rejectWithValue(t('serverError.codeExpired'))
            }   
            if(status===404){
                return rejectWithValue(t('login.userNotFound'))
            }
        }

    }
)




const initialState={
    //login initialStates
    user:{},
    loading:false,
    error:false,
    reportError:'',
    success:false,
    // forgot_password  initialStates
    forgot_success:false,
    forgot_loading:false,
    forgot_error:false,
    email:'',
    username:'',
    forgot_reportError:'',
    // verify_forgot initialStates
    verify_reportError:'',
    verify_success:false,
    verify_error:false,
    verify_loading:false,
    verify_id:'',
    // change password  
    change_reportError:'',
    change_loading:false,
    change_success:false,
    change_error:false,


    // login withour password initialStates
    loginw_error:false,
    loginw_reportError:'',
    loginw_success:false,
    loginw_loading:false
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
            state.error=false;
            //verify
            state.verify_error=false;
            state.verify_loading=false,
            state.verify_reportError='',
            // state.verify_success=false,
            //changes 
            state.change_error=false,
            state.change_loading=false,
            state.change_reportError='',
            state.change_success=false,
            // loginw
            state.loginw_error=false,
            state.loginw_loading=false,
            state.loginw_reportError='',
            state.loginw_success=false        
        },

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
        // login_user addCase's

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
        // verify_forgot addCase's

         .addCase(verify_forgot.pending,(state,_)=>{
            state.verify_loading=true,
            state.verify_error=false,
            state.verify_success=false,
            state.verify_reportError='';
            state.verify_id=''
         })
         .addCase(verify_forgot.rejected,(state,action)=>{
            state.verify_loading=false,
            state.verify_error=true,
            state.verify_success=false,
            state.verify_reportError=action.payload;
            state.verify_id=''
         })
           .addCase(verify_forgot.fulfilled,(state,action)=>{
            state.verify_loading=false,
            state.verify_error=false,
            state.verify_success=true,
            state.verify_reportError='';
            state.verify_id=action.payload.id
         })

         // change_password

           .addCase(change_password.pending,(state,_)=>{
            state.change_loading=true,
            state.change_error=false,
            state.change_success=false,
            state.change_reportError='';
         })
         .addCase(change_password.rejected,(state,action)=>{
            state.change_loading=false,
            state.change_error=true
            state.change_success=false,
            state.change_reportError=action.payload;
         })
           .addCase(change_password.fulfilled,(state,action)=>{
            state.change_loading=false,
            state.change_error=false
            state.change_success=true,
            state.change_reportError='';
         })

         // login wihtout password addCases

         .addCase(login_without.pending,(state,_)=>{
            state.loginw_error=false;
            state.loginw_loading=true;
            state.loginw_reportError='';
            state.loginw_success=false;

         })
             .addCase(login_without.rejected,(state,action)=>{
            state.loginw_error=true;
            state.loginw_loading=false;
            state.loginw_reportError=action.payload;
            state.loginw_success=false;
            
         }) 
            .addCase(login_without.fulfilled,(state,_)=>{
            state.loginw_error=false;
            state.loginw_loading=false;
            state.loginw_reportError='';
            state.loginw_success=true;
            
         })

    }
})
export const {removeAllState}=loginSlice.actions
export default loginSlice.reducer

