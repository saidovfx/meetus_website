import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { t } from 'i18next'
import { ArrowLeft, Loader2, Eye, EyeOff } from 'lucide-react'
import { login_user } from '../../features/auth.features/login.user'
import Stuck_image from '../../images/login_image.png'
import router from '../../config/router.app'
import { usernameRegex } from '../../config/testRegex'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loginData = useSelector((state) => state.login)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [warning, setWarning] = useState('')
  const [errorField, setErrorField] = useState('')

  const loading = loginData.loading

  useEffect(() => {
    if (loginData?.reportError || loginData?.error === true) {
      setWarning(loginData?.reportError)
    } else if (loginData?.success === true) {
      console.log('Logged successfully', loginData)
    }
  }, [loginData, navigate])



const handleChange = (username) => {
  if (username === '' || usernameRegex.test(username)) {
    setUsername(username)
  }
}




  
  const handleLogin = () => {
    if (!usernameRegex.test(username)) {
      setWarning(t('serverError.usernameInvalid'))
      setErrorField('username')
      return
    }

    if (password.trim().length < 6) {
      setWarning(t('serverError.passwordlength'))
      setErrorField('password')
      return
    }

    setWarning('')
    setErrorField('')
    dispatch(login_user({ username, password }))
  }

  const getInputClass = (field) =>
    `input input-bordered w-full bg-white text-gray-700 ${
      errorField === field
        ? 'border-red-500 focus:border-red-500'
        : 'border-gray-300 focus:border-[#00bfff]'
    }`

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e6f0fa] p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
        <div className="w-full md:w-1/2 p-8 relative flex flex-col justify-center">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 text-gray-500 hover:text-[#00bfff]"
          >
            <ArrowLeft size={22} />
          </button>

          <h1 className="text-3xl font-bold text-[#1a1f36] mb-2 text-center">
            Meet<span className="text-[#00bfff]">Us</span>
          </h1>

          <p className="text-gray-500 text-center mb-6">
            {t('login.pleaseDetails')}
          </p>

          <div className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={t('signup.usernameplace')}
              className={getInputClass('username')}
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('signup.passwordplace')}
                className={getInputClass('password')}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500 hover:text-[#00bfff]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {warning && (
              <p className="text-red-500 text-sm mt-1 text-center">{warning}</p>
            )}

            <p className="text-right text-sm text-[#00bfff] hover:underline cursor-pointer">
              {t('auth.forgotPassword')}
            </p>

            <button
              disabled={loading}
              onClick={handleLogin}
              className="btn w-full bg-[#00bfff] hover:bg-[#1ec9f4] text-white font-semibold mt-3 border-none"
            >
              {loading ? (
                <Loader2 className="animate-spin mx-auto text-white" />
              ) : (
                t('auth.loginNow')
              )}
            </button>

            <p className="text-center mt-4 text-sm text-gray-600">
              {t('auth.noAccount')}{' '}
              <span
                onClick={() => navigate(router.selectType)}
                className="text-[#00bfff] hover:underline cursor-pointer"
              >
                {t('nav.signup')}
              </span>
            </p>
          </div>
        </div>
        <div className="hidden md:flex w-1/2 bg-[#f8fbff] justify-center items-center">
          <img
            src={Stuck_image}
            alt="login"
            className="w-4/5 max-w-md object-contain"
          />
        </div>
      </div>
    </div>
  )
}
