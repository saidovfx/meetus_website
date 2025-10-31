    import { configureStore } from "@reduxjs/toolkit";
    import userSlice from "../features/auth.features/check.auth.js"
    import userSignupSlice from '../features/auth.features/signup.user.js'
    import loginSlice from '../features/auth.features/login.user.js'
    const persistedState=sessionStorage.getItem('reduxState') ? JSON.parse(sessionStorage.getItem('reduxState')):{}


    export const store=configureStore({
        reducer:{
          user:userSlice,
          auth:userSignupSlice,
          login:loginSlice
        },
        preloadedState:persistedState
    })

    
    store.subscribe(()=>{
        sessionStorage.setItem('reduxState',JSON.stringify(store.getState()))
    })

