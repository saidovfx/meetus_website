import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Stuck_image from '../../images/image3.png'
import { signup } from '../../features/auth.features/signup.user'
import router from '../../config/router.app'
import { Eye, EyeOff } from 'lucide-react'
import { usernameRegex,emailRegex } from '../../config/testRegex'
export default function SignUp() {
  const selectedType = useSelector(state => state.auth)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [warning, setWarning] = useState('')
  const [errorField, setErrorField] = useState('') 
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const loading = selectedType?.pending
  const navigate = useNavigate()
  const { t } = useTranslation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!selectedType.userType) {
      toast.error(t('serverError.selectError'))
      return navigate(router.selectType)
    }

     if(selectedType?.success!==true){
    setWarning(selectedType.reportError)
     }else if(selectedType?.success==true){

      console.log(selectedType);
      navigate(router.verfiycode)
      return
      }

    
  }, [selectedType, t, navigate])

  const handleEmailChange = (email) => {
   if(emailRegex.test(email) || email===''){
  setEmail(email)
   }
  }

  const handleChange = (username) => {
    if (username === '' || usernameRegex.test(username)) {
      setUsername(username)
    }
  }
  const handleSignUp = () => {
    if (!validateEmail(email)) {
      setWarning(t('serverError.worseEmail'))
      setErrorField('email')
      return
    }
    if (username.length < 3) {
      setWarning(t('serverError.usernameLength'))
      setErrorField('username')
      return
    }
    if (password.length < 6) {
      setWarning(t('serverError.passwordlength'))
      setErrorField('password')
      return
    }
    if (password !== confirmPassword) {
      setWarning(t('serverError.worseConfirmPassword'))
      setErrorField('confirmPassword')
      return
    }
    setWarning('')
    setErrorField('')
    dispatch(signup({ email, password, username }))
  }
const getInputClass = (field) => {
  return `input input-bordered w-full bg-white text-gray-700 ${
    errorField === field ? 'border-red-500 focus:border-red-500' : ''
  }`
}



  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e6f0fa] px-4 py-10">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-10 transition-transform duration-300 hover:scale-[1.01]">

        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-5">
          <h1 className="text-3xl md:text-5xl font-bold text-[#1a1f36]">{t('signup.intro')}</h1>
          <h2 className="text-xl md:text-2xl font-medium text-[#1a1f36]">{t('nav.signup')}</h2>

       

          <div className="flex flex-col gap-4 w-full max-w-md mt-4">

            <label className="text-gray-700">{t('auth.email')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder={t('signup.emailplace')}
              className={getInputClass('email')}
            />

            <label className="text-gray-700">{t('signup.username')}</label>
            <input
              type="text"
              value={username}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={t('signup.usernameplace')}
              className={getInputClass('username')}
            />

            <label className="text-gray-700">{t('auth.password')}</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('signup.passwordplace')}
                className={getInputClass('password')}
              />
              <span
                className="absolute right-3 top-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            <label className="text-gray-700">{t('auth.confirmPassword')}</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t('signup.confirmPasswordplace')}
                className={getInputClass('confirmPassword')}
              />
              <span
                className="absolute right-3 top-2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          {warning && (
            <p className="text-red-500 text-sm bg-red-100 p-2 rounded w-full max-w-md">
              {warning}
            </p>
          )}
            <p className="text-gray-500 text-sm mt-2">
              {t('signup.agreeTerms')}: <span className="text-blue-500 underline">Terms of Service</span> & <span className="text-blue-500 underline">Privacy Policy</span>
            </p>

            <button
              onClick={handleSignUp}
              className="btn bg-gradient-to-r from-[#4fc3f7] to-[#0288d1] text-white w-full mt-4 border-none hover:shadow-md hover:scale-[1.02] transition-transform duration-300"
              disabled={loading}
            >
              {loading ? 'Loading...' : t('nav.signup')}
            </button>

            <p className="text-gray-600 text-sm mt-2">
              {t('auth.hasAccount')} <span onClick={()=>navigate(router.login)} className="text-blue-500 underline cursor-pointer">{t('nav.login')}</span>
            </p>
          </div>
        </div>

        <div className="flex-1 hidden md:flex justify-center items-center">
          <img
            src={Stuck_image}
            alt="Sign up illustration"
            className="w-[90%] max-w-sm object-contain drop-shadow-md"
          />
        </div>
      </div>
    </div>
  )
}
