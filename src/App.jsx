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
function App() {
  const dispatch=useDispatch()
useEffect(()=>{
dispatch(checkUserAuth())
},[checkUserAuth])
  return (  
    <>
    <Toaster position='top-rigth' reverseOrder={false} />
      <Routes>
        <Route path={router.intro} element={<Introduction/>}/>
      </Routes>
    </>
  )
}

export default App
