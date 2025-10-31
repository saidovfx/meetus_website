import React, { useState, useEffect } from 'react'
import { t } from 'i18next'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { forgot_password } from '../../features/auth.features/login.user.js'
import { usernameRegex, emailRegex } from '../../config/testRegex.js'
import router from '../../config/router.app.js'
import Stuck_image from '../../images/forgot_stuck.png'
import { ArrowLeft, Loader2 } from 'lucide-react'

export default function ForgotPassword() {
  const forgotData = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [warning, setWarning] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (forgotData?.forgot_reportError) {
      setWarning(forgotData.forgot_reportError)
      setLoading(false)
    } else if (forgotData?.forgot_success) {
      setWarning('')
      setLoading(false)
    }
  }, [forgotData])

  const handleEmailChange = (value) => {
    if (emailRegex.test(value) || value === '') {
      setEmail(value)
      setWarning('')
    }
  }

  const handleUsernameChange = (value) => {
    if (usernameRegex.test(value) || value === '') {
      setUsername(value)
      setWarning('')
    }
  }

  const handleSendCode = () => {
    if (!username.trim() || !usernameRegex.test(username)) {
      setWarning(t('serverError.usernameInvalid'))
      return
    }

    if (!email.trim() || !emailRegex.test(email)) {
      setWarning(t('serverError.emailInvalid'))
      return
    }

    setWarning('')
    setLoading(true)
    dispatch(forgot_password({ username, email }))
  }

  const inputClass =
    'input input-bordered w-full bg-white text-gray-700 transition-all duration-200 focus:border-[#00bfff]'

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e6f0fa] p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-xl overflow-hidden max-w-5xl w-full">
        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 text-gray-500 hover:text-[#00bfff]"
          >
            <ArrowLeft size={22} />
          </button>

          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1f36] mb-4 text-center md:text-left">
            {t('login.forgotPassword')}
          </h2>
          <p className="text-gray-500 mb-6 text-center md:text-left">
            {t('login.forgotDesc')}
          </p>

          <div className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="username" className="text-gray-600 mb-1">
                {t('signup.username')}
              </label>
              <input
                id="username"
                type="text"
                placeholder={t('signup.usernameplace')}
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-600 mb-1">
                {t('auth.email')}
              </label>
              <input
                id="email"
                type="email"
                placeholder={t('signup.emailplace')}
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                className={inputClass}
              />
            </div>

            {warning && (
              <p className="text-red-500 text-sm mt-1 text-center md:text-left">
                {warning}
              </p>
            )}

            <button
              onClick={handleSendCode}
              disabled={loading}
              className="btn w-full bg-[#00bfff] hover:bg-[#1ec9f4] text-white mt-4 border-none flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : t('login.submitSendCode')}
            </button>

            <p className="text-center mt-4 text-sm text-gray-600 md:text-left">
              {t('auth.noAccount')}{' '}
              <span
                onClick={() => navigate(router.signup)}
                className="text-[#00bfff] hover:underline cursor-pointer"
              >
                {t('auth.signup')}
              </span>
            </p>
          </div>
        </div>

        <div className="hidden md:flex flex-1 bg-[#f8fbff] justify-center items-center p-8">
          <img
            src={Stuck_image}
            alt="Forgot password illustration"
            className="w-[85%] max-w-sm object-contain drop-shadow-md"
          />
        </div>
      </div>
    </div>
  )
}
