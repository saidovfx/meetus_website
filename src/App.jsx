import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes ,Route} from 'react-router-dom'
import Introduction from './pages/auth.pages/Introduction.jsx'
import router from './config/router.app.js'
function App() {

  return (
    <>
      <Routes>
        <Route path={router.intro} element={<Introduction/>}/>
      </Routes>
    </>
  )
}

export default App
