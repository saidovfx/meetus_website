import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes ,Route} from 'react-router-dom'
import Introduction from './pages/auth.pages/Introduction.jsx'
import router from './config/router.app.js'
import './config/i18n.js'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { checkUserAuth } from './features/auth.features/check.auth.js'
import { useDispatch } from 'react-redux'
import SelectUserType from './pages/auth.pages/SelectUserType.jsx'
import SignUp from './pages/auth.pages/SignUp.jsx'
import Verify_Code from './pages/auth.pages/Verify_Code.jsx'
function App() {
  const dispatch=useDispatch()
useEffect(()=>{
dispatch(checkUserAuth())
},[])
  return (  
    <>
    <Toaster position='top-rigth' reverseOrder={false} />
      <Routes>
        <Route path={router.intro} element={<Introduction/>}/>
        <Route path={router.selectType} element={<SelectUserType/>} />
        <Route path={router.signup} element={<SignUp/>} />
        <Route path={router.verfiycode} element={<Verify_Code/>} />

      </Routes>
    </>
  )
}

export default App
