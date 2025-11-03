import { useState } from 'react'
import './App.css'
import { Routes ,Route} from 'react-router-dom'
import Introduction from './pages/auth.pages/Introduction.jsx'
import router from './config/router.app.js'
import './config/i18n.js'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { checkUserAuth } from './features/auth.features/check.auth.js'
import { useDispatch, useSelector } from 'react-redux'
import SelectUserType from './pages/auth.pages/SelectUserType.jsx'
import SignUp from './pages/auth.pages/SignUp.jsx'
import Verify_Code from './pages/auth.pages/Verify_Code.jsx'
import Login from './pages/auth.pages/Login.jsx'
import ForgotPassword from './pages/auth.pages/ForgotPassword.jsx'
import Verify_Forgot from './pages/auth.pages/Verify_Forgot.jsx'
import ChangePassword from './pages/auth.pages/ChangePassword.jsx'
import CompleteProfile from './pages/auth.pages/CompleteProfile.jsx'
function App() {
  const userData=useSelector(state=>state.user)
  const dispatch=useDispatch()
    useEffect(()=>{
     dispatch(checkUserAuth())
   },[checkUserAuth])
   console.log(userData.user);
   


  return (  
    <>
    <Toaster position='top-rigth' reverseOrder={false} />
      <Routes>
        <Route path={router.intro} element={<Introduction/>}/>
        <Route path={router.selectType} element={<SelectUserType/>} />
        <Route path={router.signup} element={<SignUp/>} />
        <Route path={router.verfiycode} element={<Verify_Code/>} />
        <Route path={router.login} element={<Login/>}/>
        <Route path={router.verify_forgot} element={<Verify_Forgot/>}/>
        <Route path={router.change_password} element={<ChangePassword/>}/>
        <Route path={router.forgot_password} element={<ForgotPassword/>}/>
        <Route path={router.complete_profile} element={<CompleteProfile/>}/>
      </Routes>
    </>
  )
}

export default App
