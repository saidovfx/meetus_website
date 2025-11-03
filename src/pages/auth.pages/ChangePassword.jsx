import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { t } from 'i18next'
import { Eye, EyeOff, KeyRound, LogIn } from 'lucide-react'
import toast from 'react-hot-toast'
import router from '../../config/router.app'
import ChangeImage from '../../images/image2.png'
import { login_without,change_password } from '../../features/auth.features/login.user'
export default function ChangePassword() {
  const authData = useSelector((state) => state.login)

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [warning, setWarning] = useState(authData?.change_reportError)
  const [loginwWarning,setLoginwWarning]=useState(authData?.loginw_reportError)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!authData?.verify_success && authData?.verify_error==false) {
      toast.error(t('serverError.error'))
      navigate(router.forgot_password)
    }
  }, [authData, navigate, t])

  const handleSubmit = () => {
    if (!password || !confirmPassword) {
      return setWarning(t('changePassword.fillAll'))
    }
    if (password.length < 6) {
      return setWarning(t('changePassword.shortPassword'))
    }
    if (password !== confirmPassword) {
      return setWarning(t('changePassword.mismatch'))
    }
     dispatch(change_password({newPassword:password}))
    toast.success(t('changePassword.success'))
    navigate(router.login)
  }

  const handleLoginWithoutChange = () => {
    dispatch(login_without())
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-[#e6f0fa] to-[#cde9ff] p-5">
      
   

      <div className="w-full md:w-1/2 bg-white p-8 md:p-10 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-[#1a1f36] mb-2">
          {t('changePassword.title')}
        </h1>
        <p className="text-gray-600 mb-6">{t('changePassword.description')}</p>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">{t('changePassword.newPassword')}</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input input-bordered w-full pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">{t('changePassword.confirmPassword')}</span>
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="input input-bordered w-full"
          />
        </div>

        {warning && <p className="text-red-500 text-sm mb-3">{warning}</p>}

        <button
          onClick={handleSubmit}
          className="btn btn-primary w-full bg-gradient-to-r from-[#4fc3f7] to-[#0288d1] border-none text-white mb-3"
        >
          <KeyRound size={18} className="mr-2" />
          {t('changePassword.save')}
        </button>

        <button
          onClick={handleLoginWithoutChange}
          className="btn btn-outline w-full border-[#0288d1] text-[#0288d1] hover:bg-[#0288d1] hover:text-white"
        >
          <LogIn size={18} className="mr-2" />
          {t('changePassword.loginWithoutChanges')}
        </button>
        {loginwWarning && <p className="text-red-500 text-sm mb-3">{loginwWarning}</p>}

        <p
          onClick={() => navigate(router.login)}
          className="text-sm text-[#0288d1] text-center mt-4 cursor-pointer hover:underline"
        >
          {t('changePassword.backToLogin')}
        </p>
      </div>
         <div className="hidden md:flex md:w-1/2 justify-center items-center">
        <img
          src={ChangeImage}
          alt="Change Password"
          className="w-4/5 max-w-md rounded-2xl shadow-lg"
        />
      </div>
    </div>
  )
}
