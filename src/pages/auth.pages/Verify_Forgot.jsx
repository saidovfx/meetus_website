import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { t } from 'i18next'
import { useNavigate } from 'react-router-dom'
import { Loader2, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import { verify_forgot } from '../../features/auth.features/login.user'
import router from '../../config/router.app'
import Stuck_image from '../../images/image3.png'

export default function Verify_Forgot() {
  const verifyData = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [code, setCode] = useState('')
  const [warning, setWarning] = useState('')
  const loading = verifyData?.verify_loading

  useEffect(() => {
    if (verifyData?.forgot_success !== true || verifyData?.forgot_error === true) {
      toast.error(t('serverError.error'))
      navigate(router.forgot_password)
    }
  }, [verifyData, navigate, t])

  const handleChange = (value) => {
    if (value.length <= 6) setCode(value)
  }

  const handleVerify = () => {
    if (code.trim().length !== 6) {
      setWarning(t('serverError.codeWorse'))
      return
    }
    setWarning('')
    dispatch(verify_forgot({ code,navigate }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e6f0fa] px-4 py-10">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-10 transition-transform duration-300 hover:scale-[1.01]">
        
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-5 relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute  left-2 text-gray-500 hover:text-[#00bfff]"
          >
            <ArrowLeft size={22} />
          </button>

          <h1 className="text-3xl md:text-5xl font-bold text-[#1a1f36]">
            {t('verifyCode.verifyCode')}
          </h1>

          <p className="text-gray-600 text-base md:text-lg max-w-md">
            {t('login.codeVerifyDesc')}
          </p>

          <div className="w-full max-w-sm space-y-4">
            <input
              type="number"
              value={code}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Enter 6-digit code"
              className="input input-bordered w-full bg-white border-gray-300 focus:border-[#00bfff] text-gray-700"
            />

            {warning && <p className="text-red-500 text-sm text-center">{warning}</p>}

            <button
              onClick={handleVerify}
              disabled={loading}
              className="btn w-full bg-[#00bfff] hover:bg-[#1ec9f4] text-white font-semibold border-none mt-3"
            >
              {loading ? (
                <Loader2 className="animate-spin mx-auto text-white" />
              ) : (
                t('login.submitSendCode')
              )}
            </button>

        
          </div>
        </div>

        <div className="flex-1 hidden md:flex justify-center items-center">
          <img
            src={Stuck_image}
            alt="Verification"
            className="w-[90%] max-w-sm object-contain drop-shadow-md"
          />
        </div>
      </div>
    </div>
  )
}
